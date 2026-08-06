import fs from "fs";
import path from "path";
import React from "react";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const CONTENT_DIR = path.join(process.cwd(), "src/content/topics");

export type TopicFrontmatter = {
  title: string;
  description: string;
  keywords: string[];
  phase: string;
  group: string;
};

export type TocEntry = {
  id: string;
  label: string;
  depth: 2 | 3;
};

export type TopicContent = {
  frontmatter: TopicFrontmatter;
  content: React.ReactElement;
  toc: TocEntry[];
  slug: string;
  lastModified: string;
};

/**
 * Converts a heading text to a URL-safe anchor id.
 * e.g. "What is the event loop?" → "what-is-the-event-loop"
 */
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")         // strip any inline HTML tags
    .replace(/[^\w\s-]/g, "")        // remove punctuation
    .trim()
    .replace(/\s+/g, "-");           // spaces → hyphens
}

function collectHeadingToc(source: string): TocEntry[] {
  const toc: TocEntry[] = [];
  const lines = source.split(/\r?\n/);
  let inCodeFence = false;

  for (const line of lines) {
    const fenceMatch = line.match(/^(```|~~~)/);
    if (fenceMatch) {
      inCodeFence = !inCodeFence;
      continue;
    }

    if (inCodeFence) {
      continue;
    }

    const headingMatch = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!headingMatch) {
      continue;
    }

    const depth = headingMatch[1].length as 2 | 3;
    const label = headingMatch[2]
      .replace(/<[^>]+>/g, "")
      .replace(/\{[^}]*\}/g, "")
      .trim();

    if (label) {
      toc.push({ id: slugifyHeading(label), label, depth });
    }
  }

  return toc;
}

const mdxComponents = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement("img", {
      ...props,
      loading: props.loading ?? "lazy",
      decoding: props.decoding ?? "async",
      className: [
        "my-8 w-full rounded-3xl border border-black/10 bg-white/60 shadow-sm",
        props.className,
      ]
        .filter(Boolean)
        .join(" "),
    }),
  Callout: ({ children }: { children: React.ReactNode }) =>
    React.createElement(
      "aside",
      {
        className:
          "my-8 rounded-2xl border border-[#ff4d00]/20 bg-[#ff4d00]/5 px-5 py-4 text-sm leading-relaxed text-black/70",
      },
      children,
    ),
};

/**
 * Reads and parses a single topic markdown file by slug.
 * Returns null if the file does not exist.
 *
 * Extracts all h2/h3 headings and injects `id` attributes into
 * the rendered HTML so the right-sidebar ToC can link to them.
 */
export async function getTopicContent(slug: string): Promise<TopicContent | null> {
  const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const markdownPath = path.join(CONTENT_DIR, `${slug}.md`);
  const filePath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(markdownPath)
      ? markdownPath
      : null;

  if (!filePath) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const toc = collectHeadingToc(raw);
  const lastModified = fs.statSync(filePath).mtime.toISOString();
  const { content, frontmatter } = await compileMDX<TopicFrontmatter>({
    source: raw,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
    components: mdxComponents,
  });

  return {
    frontmatter,
    content,
    toc,
    slug,
    lastModified,
  };
}

/**
 * Returns the slugs of all available markdown topic files.
 * Used to supplement generateStaticParams.
 */
export function getAvailableTopicSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/, ""));
}
