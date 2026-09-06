import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { SyntaxKind } from "ts-morph";
import type { SourceFile } from "ts-morph";
import { findObjectBySlug } from "./ts-array-utils";
import { serializeBuildProject } from "./serialize-build-project";
import type { BuildProjectDraft } from "./types";

const BUILD_PROJECTS_FILE = path.join(process.cwd(), "src/data/build-projects.ts");
const BUILD_CONTENT_DIR = path.join(process.cwd(), "src/content/build");

async function loadSourceFile(): Promise<SourceFile> {
  const { Project } = await import("ts-morph");
  const project = new Project({
    tsConfigFilePath: path.join(process.cwd(), "tsconfig.json"),
    skipAddingFilesFromTsConfig: true,
  });
  return project.addSourceFileAtPath(BUILD_PROJECTS_FILE);
}

/** Edit-existing-only, found by slug. */
export async function buildUpdatedBuildProjectText(
  originalSlug: string,
  project: BuildProjectDraft,
): Promise<string> {
  const sourceFile = await loadSourceFile();
  const arrayDecl = sourceFile.getVariableDeclarationOrThrow("buildProjects");
  const array = arrayDecl.getInitializerIfKindOrThrow(SyntaxKind.ArrayLiteralExpression);

  if (project.slug !== originalSlug && findObjectBySlug(array, "slug", project.slug)) {
    throw new Error(`A build project with slug "${project.slug}" already exists.`);
  }

  const existing = findObjectBySlug(array, "slug", originalSlug);
  if (!existing) {
    throw new Error(`No build project with slug "${originalSlug}" found.`);
  }

  const replaced = existing.replaceWithText(serializeBuildProject(project));
  replaced.asKindOrThrow(SyntaxKind.ObjectLiteralExpression).formatText();

  const errors = sourceFile.getPreEmitDiagnostics().filter((d) => d.getCategory() === 1);
  if (errors.length > 0) {
    throw new Error(
      `Generated build-projects.ts would be invalid: ${errors.map((e) => e.getMessageText()).join("; ")}`,
    );
  }

  return sourceFile.getFullText();
}

export function buildProjectMdxPath(slug: string): string {
  return path.join(BUILD_CONTENT_DIR, `${slug}.mdx`);
}

/** Reads an existing build project's raw body (frontmatter stripped), for
 * pre-filling the edit form. */
export function readBuildProjectMdxBody(slug: string): string | undefined {
  const filePath = buildProjectMdxPath(slug);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw).content.trim();
}

export function writeBuildProjectMdx(slug: string, content: string): void {
  fs.writeFileSync(buildProjectMdxPath(slug), content, "utf-8");
}

export { BUILD_PROJECTS_FILE };
