"use server";

import fs from "fs";
import { buildUpdatedArchitectureProfileText, PROFILES_FILE } from "@/lib/dev-authoring/architecture-profile-writer";
import type { ArchitectureProfileDraft } from "@/lib/dev-authoring/types";

type State = { status: "idle" | "ok" | "error"; message?: string };

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function updateArchitectureProfile(_prevState: State, formData: FormData): Promise<State> {
  if (process.env.NODE_ENV !== "development") {
    return { status: "error", message: "Not available outside development." };
  }

  const originalSlug = String(formData.get("originalSlug") ?? "").trim();
  const slug = slugify(String(formData.get("slug") ?? ""));
  const company = String(formData.get("company") ?? "").trim();
  const logo = String(formData.get("logo") ?? "").trim();
  const tagline = String(formData.get("tagline") ?? "").trim();
  const problem = String(formData.get("problem") ?? "").trim();
  const scaleContext = String(formData.get("scaleContext") ?? "").trim();
  const microservicesNote = String(formData.get("microservicesNote") ?? "").trim();
  const takeaway = String(formData.get("takeaway") ?? "").trim();
  const seoKeywords: string[] = JSON.parse(String(formData.get("seoKeywordsJson") ?? "[]"));
  const sources: string[] = JSON.parse(String(formData.get("sourcesJson") ?? "[]"));
  const techStack: ArchitectureProfileDraft["techStack"] = JSON.parse(String(formData.get("techStackJson") ?? "[]"));
  const approach: ArchitectureProfileDraft["approach"] = JSON.parse(String(formData.get("approachJson") ?? "[]"));

  if (!originalSlug || !slug || !company || !logo || !tagline || !problem || !scaleContext) {
    return { status: "error", message: "Slug, company, logo, tagline, problem, and scale context are all required." };
  }

  const draft: ArchitectureProfileDraft = {
    slug,
    company,
    logo,
    tagline,
    problem,
    scaleContext,
    seoKeywords,
    techStack,
    approach,
    microservicesNote,
    takeaway,
    sources,
  };

  let updatedText: string;
  try {
    updatedText = await buildUpdatedArchitectureProfileText(originalSlug, draft);
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : String(error) };
  }

  try {
    const tmpPath = `${PROFILES_FILE}.tmp`;
    fs.writeFileSync(tmpPath, updatedText, "utf-8");
    fs.renameSync(tmpPath, PROFILES_FILE);
  } catch (error) {
    return { status: "error", message: error instanceof Error ? error.message : String(error) };
  }

  return { status: "ok", message: `Updated "${company}".` };
}
