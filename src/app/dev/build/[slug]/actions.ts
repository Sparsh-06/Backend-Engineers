"use server";

import fs from "fs";
import {
  buildUpdatedBuildProjectText,
  buildProjectMdxPath,
  writeBuildProjectMdx,
  BUILD_PROJECTS_FILE,
} from "@/lib/dev-authoring/build-project-writer";
import { buildBuildProjectMdx } from "@/lib/dev-authoring/serialize-build-project";
import type { BuildProjectDraft } from "@/lib/dev-authoring/types";

type State = { status: "idle" | "ok" | "error"; message?: string };

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function updateBuildProject(_prevState: State, formData: FormData): Promise<State> {
  if (process.env.NODE_ENV !== "development") {
    return { status: "error", message: "Not available outside development." };
  }

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? ""));
  const title = String(formData.get("title") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const difficulty = String(formData.get("difficulty") ?? "").trim() as BuildProjectDraft["difficulty"];
  const timeEstimate = String(formData.get("timeEstimate") ?? "").trim();
  const bodyMarkdown = String(formData.get("bodyMarkdown") ?? "");
  const stack: string[] = JSON.parse(String(formData.get("stackJson") ?? "[]"));
  const keywords: string[] = JSON.parse(String(formData.get("keywordsJson") ?? "[]"));
  const whatYoullBuild: string[] = JSON.parse(String(formData.get("whatYoullBuildJson") ?? "[]"));
  const relatedTopicSlugs: string[] = JSON.parse(String(formData.get("relatedTopicSlugsJson") ?? "[]"));

  if (!originalSlug || !slug || !title || !tagline || !description || !difficulty || !timeEstimate) {
    return { status: "error", message: "Slug, title, tagline, description, difficulty, and time estimate are all required." };
  }

  const draft: BuildProjectDraft = {
    slug,
    title,
    tagline,
    description,
    difficulty,
    timeEstimate,
    stack,
    keywords,
    whatYoullBuild,
    relatedTopicSlugs,
    bodyMarkdown,
  };

  let updatedText: string;
  try {
    updatedText = await buildUpdatedBuildProjectText(originalSlug, draft);
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : String(error) };
  }

  // Edit's .mdx write is destructive to an existing file (unlike Phase 1's
  // additive create) - keep the previous content so a mid-way failure can
  // be restored.
  const previousMdxPath = buildProjectMdxPath(originalSlug);
  const previousMdx = fs.existsSync(previousMdxPath) ? fs.readFileSync(previousMdxPath, "utf-8") : undefined;
  const slugChanged = slug !== originalSlug;

  try {
    const mdx = buildBuildProjectMdx({ title, description, keywords, difficulty, body: bodyMarkdown });
    writeBuildProjectMdx(slug, mdx);
    if (slugChanged && fs.existsSync(previousMdxPath)) fs.rmSync(previousMdxPath);

    const tmpPath = `${BUILD_PROJECTS_FILE}.tmp`;
    fs.writeFileSync(tmpPath, updatedText, "utf-8");
    fs.renameSync(tmpPath, BUILD_PROJECTS_FILE);
  } catch (error) {
    if (previousMdx !== undefined) {
      try {
        fs.writeFileSync(previousMdxPath, previousMdx, "utf-8");
      } catch {
        // best-effort only
      }
    }
    return { status: "error", message: error instanceof Error ? error.message : String(error) };
  }

  return { status: "ok", message: `Updated "${title}".` };
}
