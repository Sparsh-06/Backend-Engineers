import path from "path";
import { SyntaxKind } from "ts-morph";
import type { ArrayLiteralExpression, ObjectLiteralExpression, SourceFile } from "ts-morph";
import { findObjectBySlug } from "./ts-array-utils";
import { serializeTopicItem } from "./serialize-topic-item";
import type { TopicDraftInput } from "./types";

const TOPICS_FILE = path.join(process.cwd(), "src/data/topics.ts");

async function loadSourceFile(): Promise<SourceFile> {
  const { Project } = await import("ts-morph");
  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });
  return project.addSourceFileAtPath(TOPICS_FILE);
}

function findAnySlugAcrossGroups(topicGroupsArray: ArrayLiteralExpression, slug: string) {
  return topicGroupsArray
    .getDescendantsOfKind(SyntaxKind.PropertyAssignment)
    .find(
      (p) =>
        p.getName() === "slug" &&
        p.getInitializerIfKind(SyntaxKind.StringLiteral)?.getLiteralValue() === slug,
    );
}

function assertNoParseErrors(sourceFile: SourceFile) {
  const errors = sourceFile.getPreEmitDiagnostics().filter((d) => d.getCategory() === 1);
  if (errors.length > 0) {
    throw new Error(
      `Generated topics.ts would be invalid: ${errors.map((e) => e.getMessageText()).join("; ")}`,
    );
  }
}

function updatePublishedSlugs(
  sourceFile: SourceFile,
  opts: { oldSlug?: string; newSlug: string; wasPublished: boolean; publish: boolean },
) {
  const publishedDecl = sourceFile.getVariableDeclarationOrThrow("publishedTopicSlugs");
  const setNewExpr = publishedDecl.getInitializerIfKindOrThrow(SyntaxKind.NewExpression);
  const setArrayArg = setNewExpr.getArguments()[0].asKindOrThrow(SyntaxKind.ArrayLiteralExpression);

  // Remove the old slug string if it was published under a slug that's
  // changing, or if publish is being turned off.
  if (opts.wasPublished && (opts.oldSlug !== opts.newSlug || !opts.publish)) {
    const oldEl = setArrayArg
      .getElements()
      .find((el) => el.asKind(SyntaxKind.StringLiteral)?.getLiteralValue() === (opts.oldSlug ?? opts.newSlug));
    if (oldEl) setArrayArg.removeElement(setArrayArg.getElements().indexOf(oldEl));
  }

  const alreadyThere = setArrayArg
    .getElements()
    .some((el) => el.asKind(SyntaxKind.StringLiteral)?.getLiteralValue() === opts.newSlug);
  if (opts.publish && !alreadyThere) {
    setArrayArg.addElement(JSON.stringify(opts.newSlug));
  }
}

function getGroupTopicsArray(groupObj: ObjectLiteralExpression): ArrayLiteralExpression {
  return groupObj
    .getPropertyOrThrow("topics")
    .asKindOrThrow(SyntaxKind.PropertyAssignment)
    .getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);
}

/** Create path (Phase 1) - appends a new topic into its group's `topics`
 * array. Unchanged behavior from Phase 1, refactored only to reuse the
 * shared `findObjectBySlug` helper. */
export async function buildUpdatedTopicsFileText(topic: TopicDraftInput): Promise<string> {
  const sourceFile = await loadSourceFile();
  const topicGroupsDecl = sourceFile.getVariableDeclarationOrThrow("topicGroups");
  const topicGroupsArray = topicGroupsDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

  if (findAnySlugAcrossGroups(topicGroupsArray, topic.slug)) {
    throw new Error(`A topic with slug "${topic.slug}" already exists in topics.ts.`);
  }

  const groupObj = findObjectBySlug(topicGroupsArray, "slug", topic.groupSlug);
  if (!groupObj) {
    throw new Error(`No group with slug "${topic.groupSlug}" found in topics.ts.`);
  }

  const topicsArray = getGroupTopicsArray(groupObj);
  const inserted = topicsArray.addElement(serializeTopicItem(topic));
  inserted.formatText();

  if (topic.publish) {
    updatePublishedSlugs(sourceFile, { newSlug: topic.slug, wasPublished: false, publish: true });
  }

  assertNoParseErrors(sourceFile);
  return sourceFile.getFullText();
}

/** Edit path (Phase 2) - finds the existing topic by its *original* slug
 * (which may differ from the possibly-renamed new slug) anywhere across all
 * groups, and replaces the whole object literal with a freshly serialized
 * one. Also moves the entry to a different group's `topics` array if the
 * group changed, and keeps `publishedTopicSlugs` in sync with any rename
 * and/or publish-state change. */
export async function buildUpdatedTopicsFileTextForEdit(
  originalSlug: string,
  wasPublished: boolean,
  topic: TopicDraftInput,
): Promise<string> {
  const sourceFile = await loadSourceFile();
  const topicGroupsDecl = sourceFile.getVariableDeclarationOrThrow("topicGroups");
  const topicGroupsArray = topicGroupsDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

  if (topic.slug !== originalSlug && findAnySlugAcrossGroups(topicGroupsArray, topic.slug)) {
    throw new Error(`A topic with slug "${topic.slug}" already exists in topics.ts.`);
  }

  const groupObjects = topicGroupsArray
    .getElements()
    .map((el) => el.asKindOrThrow(SyntaxKind.ObjectLiteralExpression));

  let existingObj: ObjectLiteralExpression | undefined;
  let existingGroupObj: ObjectLiteralExpression | undefined;
  for (const groupObj of groupObjects) {
    const found = findObjectBySlug(getGroupTopicsArray(groupObj), "slug", originalSlug);
    if (found) {
      existingObj = found;
      existingGroupObj = groupObj;
      break;
    }
  }

  if (!existingObj || !existingGroupObj) {
    throw new Error(`No topic with slug "${originalSlug}" found in topics.ts.`);
  }

  const targetGroupObj = findObjectBySlug(topicGroupsArray, "slug", topic.groupSlug);
  if (!targetGroupObj) {
    throw new Error(`No group with slug "${topic.groupSlug}" found in topics.ts.`);
  }

  if (existingGroupObj === targetGroupObj) {
    const replaced = existingObj.replaceWithText(serializeTopicItem(topic));
    replaced.asKindOrThrow(SyntaxKind.ObjectLiteralExpression).formatText();
  } else {
    const oldTopicsArray = getGroupTopicsArray(existingGroupObj);
    oldTopicsArray.removeElement(oldTopicsArray.getElements().indexOf(existingObj));

    const newTopicsArray = getGroupTopicsArray(targetGroupObj);
    const inserted = newTopicsArray.addElement(serializeTopicItem(topic));
    inserted.formatText();
  }

  updatePublishedSlugs(sourceFile, {
    oldSlug: originalSlug,
    newSlug: topic.slug,
    wasPublished,
    publish: topic.publish,
  });

  assertNoParseErrors(sourceFile);
  return sourceFile.getFullText();
}

export { TOPICS_FILE };
