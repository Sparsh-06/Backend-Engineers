import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "src/content/topics");

type MdxInput = {
  title: string;
  description: string;
  keywords: string[];
  phase: string;
  group: string;
  image?: string;
  body: string;
};

/**
 * Hand-templates the YAML frontmatter block rather than using gray-matter's
 * `matter.stringify()` - its default js-yaml dump renders arrays as
 * multi-line `- item` lists, which would make new files visibly different
 * from every hand-authored one (all of which use single-line `["a", "b"]`
 * flow-style arrays). This mirrors that exact shape instead.
 */
export function buildTopicMdx(input: MdxInput): string {
  const frontmatterLines = [
    "---",
    `title: ${JSON.stringify(input.title)}`,
    `description: ${JSON.stringify(input.description)}`,
    `keywords: [${input.keywords.map((k) => JSON.stringify(k)).join(", ")}]`,
    `phase: ${JSON.stringify(input.phase)}`,
    `group: ${JSON.stringify(input.group)}`,
    ...(input.image ? [`image: ${JSON.stringify(input.image)}`] : []),
    "---",
    "",
  ];
  return frontmatterLines.join("\n") + input.body.trim() + "\n";
}

export function topicMdxPath(slug: string): string {
  return path.join(CONTENT_DIR, `${slug}.mdx`);
}

export function writeTopicMdx(slug: string, content: string): void {
  fs.writeFileSync(topicMdxPath(slug), content, "utf-8");
}

/** Reads an existing topic's raw body (frontmatter stripped) for pre-filling
 * the edit form. Returns undefined if the topic has no .mdx file yet. */
export function readTopicMdxBody(slug: string): string | undefined {
  const filePath = topicMdxPath(slug);
  if (!fs.existsSync(filePath)) return undefined;
  const raw = fs.readFileSync(filePath, "utf-8");
  return matter(raw).content.trim();
}

export function deleteTopicMdx(slug: string): void {
  const filePath = topicMdxPath(slug);
  if (fs.existsSync(filePath)) fs.rmSync(filePath);
}
