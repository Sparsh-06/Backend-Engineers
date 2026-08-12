import fs from "fs";
import path from "path";
import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { rehypeGlossary } from "@/lib/rehype-glossary";
import { glossaryTerms } from "@/data/glossary";
import InteractiveVisual from "@/modules/components/topics/interactive-visual";
import CodeWalkthrough from "@/modules/components/mdx/code-walkthrough";
import Simulator from "@/modules/components/mdx/simulator";
import type { TopicVisual } from "@/data/topics";

const CONTENT_DIR = path.join(process.cwd(), "src/content/topics");
const BUILD_CONTENT_DIR = path.join(process.cwd(), "src/content/build");

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

/**
 * Components every lesson and build project can use inside its MDX.
 * `visuals` supplies the pool that `<Visual id="..." />` draws from.
 */
function buildMdxComponents(visuals: TopicVisual[]) {
  return {
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
    /** Places one of the topic's `visuals` entries inline, by id. */
    Visual: ({ id }: { id: string }) => {
      const visual = visuals.find((item) => item.id === id);
      if (!visual) return null;
      return React.createElement(InteractiveVisual, { visual });
    },
    CodeWalkthrough,
    Simulator,
  };
}

async function readContent<TFrontmatter>(
  dir: string,
  slug: string,
  visuals: TopicVisual[] = [],
): Promise<{
  frontmatter: TFrontmatter;
  content: React.ReactElement;
  toc: TocEntry[];
  slug: string;
  lastModified: string;
} | null> {
  const mdxPath = path.join(dir, `${slug}.mdx`);
  const markdownPath = path.join(dir, `${slug}.md`);
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
  const { content, frontmatter } = await compileMDX<TFrontmatter>({
    source: raw,
    options: {
      parseFrontmatter: true,
      // next-mdx-remote defaults `blockJS` to true, which injects a remark
      // plugin that strips every `{...}` expression from the MDX. That silently
      // drops JSX expression attributes - `steps={[...]}` never reaches the
      // component while plain string attributes still do. Our lesson content is
      // first-party, so expressions are safe to allow; `blockDangerousJS` stays
      // on by default as a backstop.
      blockJS: false,
      mdxOptions: {
        format: "mdx",
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypeGlossary, { terms: glossaryTerms, currentSlug: slug }],
        ],
      },
    },
    components: buildMdxComponents(visuals),
  });

  return {
    frontmatter,
    content,
    toc,
    slug,
    lastModified,
  };
}

function getAvailableSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"))
    .map((file) => file.replace(/\.(md|mdx)$/, ""));
}

/**
 * Reads and parses a single topic markdown file by slug.
 * Returns null if the file does not exist.
 *
 * Extracts all h2/h3 headings and injects `id` attributes into
 * the rendered HTML so the right-sidebar ToC can link to them.
 */
export async function getTopicContent(
  slug: string,
  visuals: TopicVisual[] = [],
): Promise<TopicContent | null> {
  return readContent<TopicFrontmatter>(CONTENT_DIR, slug, visuals);
}

/**
 * Returns the slugs of all available markdown topic files.
 * Used to supplement generateStaticParams.
 */
export function getAvailableTopicSlugs(): string[] {
  return getAvailableSlugs(CONTENT_DIR);
}

export type BuildFrontmatter = {
  title: string;
  description: string;
  keywords: string[];
  difficulty: string;
};

export type BuildContent = {
  frontmatter: BuildFrontmatter;
  content: React.ReactElement;
  toc: TocEntry[];
  slug: string;
  lastModified: string;
};

/**
 * Reads and parses a single "build it" project markdown file by slug.
 * Mirrors getTopicContent but reads from src/content/build.
 */
export async function getBuildContent(slug: string): Promise<BuildContent | null> {
  return readContent<BuildFrontmatter>(BUILD_CONTENT_DIR, slug);
}

/**
 * Returns the slugs of all available "build it" project markdown files.
 */
export function getAvailableBuildSlugs(): string[] {
  return getAvailableSlugs(BUILD_CONTENT_DIR);
}
