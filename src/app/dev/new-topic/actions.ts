"use server";

import fs from "fs";
import path from "path";
import {
  buildUpdatedTopicsFileText,
  buildUpdatedTopicsFileTextForEdit,
  TOPICS_FILE,
} from "@/lib/dev-authoring/topics-ts-writer";
import { buildTopicMdx, topicMdxPath, writeTopicMdx, deleteTopicMdx } from "@/lib/dev-authoring/mdx-writer";
import { saveTopicImage, topicImageDir } from "@/lib/dev-authoring/image-writer";
import { TOPIC_GROUPS, type CreateTopicState, type TopicDraftInput, type VisualDraft } from "@/lib/dev-authoring/types";
import { topicGroups } from "@/data/topics";

function parseVisualJson(raw: FormDataEntryValue | null): VisualDraft | undefined {
  if (!raw || typeof raw !== "string" || raw.trim() === "") return undefined;
  return JSON.parse(raw) as VisualDraft;
}

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type ParsedTopicForm =
  | { ok: true; draft: TopicDraftInput; imageFile: File | null }
  | { ok: false; message: string };

function parseTopicForm(formData: FormData): ParsedTopicForm {
  const slug = slugify(String(formData.get("slug") ?? ""));
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const phase = String(formData.get("phase") ?? "").trim();
  const groupSlug = String(formData.get("groupSlug") ?? "").trim();
  const bodyMarkdown = String(formData.get("bodyMarkdown") ?? "");
  const publish = formData.get("publish") === "on";
  const imageFilename = String(formData.get("imageFilename") ?? "").trim();
  const keywords: string[] = JSON.parse(String(formData.get("keywordsJson") ?? "[]"));
  const poolVisuals: (VisualDraft & { id: string })[] = JSON.parse(
    String(formData.get("poolVisualsJson") ?? "[]"),
  );
  const heroVisual = parseVisualJson(formData.get("heroVisualJson"));
  const imageFileEntry = formData.get("image");
  const imageFile = imageFileEntry instanceof File && imageFileEntry.size > 0 ? imageFileEntry : null;

  if (!slug || !title || !description || !phase || !groupSlug) {
    return { ok: false, message: "Slug, title, description, phase, and group are all required." };
  }
  if (!TOPIC_GROUPS.some((g) => g.slug === groupSlug)) {
    return { ok: false, message: `Unknown group "${groupSlug}".` };
  }
  if (imageFile && !imageFilename) {
    return { ok: false, message: "An image filename is required when uploading an image." };
  }

  return {
    ok: true,
    imageFile,
    draft: {
      slug,
      title,
      description,
      keywords,
      phase,
      groupSlug,
      publish,
      bodyMarkdown,
      imageFilename: imageFilename || undefined,
      heroVisual,
      poolVisuals,
    },
  };
}

export async function createTopic(
  _prevState: CreateTopicState,
  formData: FormData,
): Promise<CreateTopicState> {
  // The real security boundary - see the comment in dev/layout.tsx for why
  // the page-level notFound() alone isn't sufficient.
  if (process.env.NODE_ENV !== "development") {
    return { status: "error", message: "Not available outside development." };
  }

  const parsed = parseTopicForm(formData);
  if (!parsed.ok) return { status: "error", message: parsed.message };
  const { draft, imageFile } = parsed;

  // Step 1: compute the updated topics.ts text entirely in memory. This is
  // where a duplicate slug, unknown group, or malformed structure fails
  // loudly - before any file on disk is touched.
  let updatedTopicsText: string;
  try {
    updatedTopicsText = await buildUpdatedTopicsFileText(draft);
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : String(error) };
  }

  // From here on, track exactly what this invocation writes so a failure
  // can clean up after itself instead of leaving orphaned files.
  const writtenPaths: string[] = [];
  let imagePath: string | undefined;

  try {
    // Step 2: image (additive - a brand-new path, can't collide).
    if (imageFile) {
      imagePath = await saveTopicImage({ slug: draft.slug, file: imageFile, filename: draft.imageFilename! });
      writtenPaths.push(path.join(topicImageDir(draft.slug), path.basename(imagePath)));
    }

    // Step 3: the .mdx file (additive - a brand-new path, can't collide).
    const mdx = buildTopicMdx({
      title: draft.title,
      description: draft.description,
      keywords: draft.keywords,
      phase: draft.phase,
      group: draft.groupSlug,
      image: imagePath,
      body: draft.bodyMarkdown,
    });
    writeTopicMdx(draft.slug, mdx);
    writtenPaths.push(topicMdxPath(draft.slug));

    // Step 4: persist topics.ts LAST, as a single atomic swap. Everything
    // that could plausibly fail already has (step 1's validation, or the
    // additive writes above) - this is the one shared, hand-authored file,
    // and it should only ever go from fully-old to fully-new.
    const tmpPath = `${TOPICS_FILE}.tmp`;
    fs.writeFileSync(tmpPath, updatedTopicsText, "utf-8");
    fs.renameSync(tmpPath, TOPICS_FILE);
  } catch (error) {
    for (const p of writtenPaths) {
      try {
        fs.rmSync(p, { force: true });
      } catch {
        // best-effort cleanup only
      }
    }
    return { status: "error", message: error instanceof Error ? error.message : String(error) };
  }

  return { status: "ok", slug: draft.slug, message: `Created "${draft.title}" (${draft.publish ? "published" : "draft"}).` };
}

export async function updateTopic(
  _prevState: CreateTopicState,
  formData: FormData,
): Promise<CreateTopicState> {
  if (process.env.NODE_ENV !== "development") {
    return { status: "error", message: "Not available outside development." };
  }

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const wasPublished = formData.get("wasPublished") === "on";
  if (!originalSlug) {
    return { status: "error", message: "Missing original slug - this form wasn't opened in edit mode correctly." };
  }

  const parsed = parseTopicForm(formData);
  if (!parsed.ok) return { status: "error", message: parsed.message };
  const { draft, imageFile } = parsed;

  // Step 1: compute the updated topics.ts text in memory - validates the
  // topic exists, the (possibly renamed) slug doesn't collide, the target
  // group exists, before any file is touched.
  let updatedTopicsText: string;
  try {
    updatedTopicsText = await buildUpdatedTopicsFileTextForEdit(originalSlug, wasPublished, draft);
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : String(error) };
  }

  // Unlike create, editing overwrites an *existing* .mdx file - keep the
  // previous content in memory so a mid-way failure can be restored, since
  // this write is destructive rather than additive.
  const previousMdxPath = topicMdxPath(originalSlug);
  const previousMdx = fs.existsSync(previousMdxPath) ? fs.readFileSync(previousMdxPath, "utf-8") : undefined;
  const slugChanged = draft.slug !== originalSlug;

  let imagePath: string | undefined;
  const newlyWrittenImage: string[] = [];

  try {
    if (imageFile) {
      imagePath = await saveTopicImage({ slug: draft.slug, file: imageFile, filename: draft.imageFilename! });
      newlyWrittenImage.push(path.join(topicImageDir(draft.slug), path.basename(imagePath)));
    }

    const mdx = buildTopicMdx({
      title: draft.title,
      description: draft.description,
      keywords: draft.keywords,
      phase: draft.phase,
      group: draft.groupSlug,
      image: imagePath,
      body: draft.bodyMarkdown,
    });
    writeTopicMdx(draft.slug, mdx);
    if (slugChanged) deleteTopicMdx(originalSlug);

    const tmpPath = `${TOPICS_FILE}.tmp`;
    fs.writeFileSync(tmpPath, updatedTopicsText, "utf-8");
    fs.renameSync(tmpPath, TOPICS_FILE);
  } catch (error) {
    // Best-effort restore: put the original .mdx content back, remove any
    // newly-written image from this failed attempt. topics.ts itself was
    // never touched if we got here (the rename is the last statement).
    if (previousMdx !== undefined) {
      try {
        fs.writeFileSync(previousMdxPath, previousMdx, "utf-8");
      } catch {
        // best-effort only
      }
    }
    for (const p of newlyWrittenImage) {
      try {
        fs.rmSync(p, { force: true });
      } catch {
        // best-effort only
      }
    }
    return { status: "error", message: error instanceof Error ? error.message : String(error) };
  }

  return {
    status: "ok",
    slug: draft.slug,
    message: `Updated "${draft.title}" (${draft.publish ? "published" : "draft"}).`,
  };
}

/** Used by the client to check a slug isn't already taken, without a round
 * trip through the full ts-morph pass. */
export async function slugExists(slug: string): Promise<boolean> {
  if (process.env.NODE_ENV !== "development") return false;
  return topicGroups.some((group) => group.topics.some((t) => t.slug === slug));
}
