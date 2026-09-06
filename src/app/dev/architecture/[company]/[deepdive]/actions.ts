"use server";

import fs from "fs";
import { buildUpdatedDeepDiveText, DEEP_DIVES_FILE } from "@/lib/dev-authoring/deep-dive-writer";
import type { DeepDiveDraft } from "@/lib/dev-authoring/types";

type State = { status: "idle" | "ok" | "error"; message?: string };

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function updateDeepDive(_prevState: State, formData: FormData): Promise<State> {
  if (process.env.NODE_ENV !== "development") {
    return { status: "error", message: "Not available outside development." };
  }

  const originalCompanySlug = String(formData.get("originalCompanySlug") ?? "").trim();
  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const companySlug = String(formData.get("companySlug") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? ""));
  const title = String(formData.get("title") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const intro = String(formData.get("intro") ?? "").trim();
  const takeaway = String(formData.get("takeaway") ?? "").trim();
  const sourceTitle = String(formData.get("sourceTitle") ?? "").trim();
  const sourceUrl = String(formData.get("sourceUrl") ?? "").trim();
  const sourceNote = String(formData.get("sourceNote") ?? "").trim();
  const seoKeywords: string[] = JSON.parse(String(formData.get("seoKeywordsJson") ?? "[]"));
  const sourceAuthors: string[] = JSON.parse(String(formData.get("sourceAuthorsJson") ?? "[]"));
  const keyTermsUsed: DeepDiveDraft["keyTermsUsed"] = JSON.parse(String(formData.get("keyTermsUsedJson") ?? "[]"));
  const pipeline: DeepDiveDraft["pipeline"] = JSON.parse(String(formData.get("pipelineJson") ?? "[]"));
  const sections: DeepDiveDraft["sections"] = JSON.parse(String(formData.get("sectionsJson") ?? "[]"));

  if (!originalCompanySlug || !originalSlug || !companySlug || !slug || !title || !tagline || !intro) {
    return { status: "error", message: "Company, slug, title, tagline, and intro are all required." };
  }
  if (!sourceTitle || !sourceUrl || !sourceNote) {
    return { status: "error", message: "Source title, URL, and note are all required - this content type lives or dies on accurate sourcing." };
  }

  const draft: DeepDiveDraft = {
    slug,
    companySlug,
    title,
    tagline,
    seoKeywords,
    intro,
    keyTermsUsed,
    pipeline,
    sections,
    takeaway,
    sourceTitle,
    sourceAuthors,
    sourceUrl,
    sourceNote,
  };

  let updatedText: string;
  try {
    updatedText = await buildUpdatedDeepDiveText(originalCompanySlug, originalSlug, draft);
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : String(error) };
  }

  try {
    const tmpPath = `${DEEP_DIVES_FILE}.tmp`;
    fs.writeFileSync(tmpPath, updatedText, "utf-8");
    fs.renameSync(tmpPath, DEEP_DIVES_FILE);
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : String(error) };
  }

  return { status: "ok", message: `Updated "${title}".` };
}
