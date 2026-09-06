import type { BuildProjectDraft } from "./types";

export function serializeBuildProject(project: BuildProjectDraft): string {
  const lines = [
    `slug: ${JSON.stringify(project.slug)},`,
    `title: ${JSON.stringify(project.title)},`,
    `tagline: ${JSON.stringify(project.tagline)},`,
    `description:\n${JSON.stringify(project.description)},`,
    `difficulty: ${JSON.stringify(project.difficulty)},`,
    `timeEstimate: ${JSON.stringify(project.timeEstimate)},`,
    `stack: ${JSON.stringify(project.stack)},`,
    `keywords: ${JSON.stringify(project.keywords)},`,
    `whatYoullBuild: ${JSON.stringify(project.whatYoullBuild)},`,
    `relatedTopicSlugs: ${JSON.stringify(project.relatedTopicSlugs)},`,
  ];
  return `{\n${lines.join("\n")}\n}`;
}

/** Build projects' MDX frontmatter is smaller than topics' - just
 * title/description/keywords/difficulty, no phase/group/image. Hand
 * -templated for the same reason as mdx-writer.ts: gray-matter's stringify
 * would break keywords onto multiple YAML lines, diverging from every real
 * .mdx file's single-line flow-style array. */
export function buildBuildProjectMdx(input: {
  title: string;
  description: string;
  keywords: string[];
  difficulty: string;
  body: string;
}): string {
  const frontmatterLines = [
    "---",
    `title: ${JSON.stringify(input.title)}`,
    `description: ${JSON.stringify(input.description)}`,
    `keywords: [${input.keywords.map((k) => JSON.stringify(k)).join(", ")}]`,
    `difficulty: ${JSON.stringify(input.difficulty)}`,
    "---",
    "",
  ];
  return frontmatterLines.join("\n") + input.body.trim() + "\n";
}
