import type { ArchitectureProfileDraft } from "./types";

/** Mirrors serialize-topic-item.ts: JSON.stringify per leaf for correct
 * escaping, single-line objects for techStack items (matches the real
 * file's style), multi-line for approach items (also matches). */
export function serializeArchitectureProfile(profile: ArchitectureProfileDraft): string {
  const techStack = profile.techStack
    .map(
      (item) =>
        `{ name: ${JSON.stringify(item.name)}, category: ${JSON.stringify(item.category)}, whatItsFor: ${JSON.stringify(item.whatItsFor)} }`,
    )
    .join(",\n");

  const approach = profile.approach
    .map(
      (item) =>
        `{\nheading: ${JSON.stringify(item.heading)},\nbody: ${JSON.stringify(item.body)},\n}`,
    )
    .join(",\n");

  const lines = [
    `slug: ${JSON.stringify(profile.slug)},`,
    `company: ${JSON.stringify(profile.company)},`,
    `logo: ${JSON.stringify(profile.logo)},`,
    `tagline: ${JSON.stringify(profile.tagline)},`,
    `problem:\n${JSON.stringify(profile.problem)},`,
    `scaleContext:\n${JSON.stringify(profile.scaleContext)},`,
    `seoKeywords: ${JSON.stringify(profile.seoKeywords)},`,
    `techStack: [\n${techStack},\n],`,
    `approach: [\n${approach},\n],`,
    `microservicesNote:\n${JSON.stringify(profile.microservicesNote)},`,
    `takeaway:\n${JSON.stringify(profile.takeaway)},`,
    `sources: ${JSON.stringify(profile.sources)},`,
  ];
  return `{\n${lines.join("\n")}\n}`;
}
