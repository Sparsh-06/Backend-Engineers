import type { GlossaryTerm } from "@/data/glossary";

/**
 * Minimal HAST node shapes. We only touch what we need rather than pulling in
 * `unist-util-visit` and `@types/hast` as dependencies for one small walk.
 */
type TextNode = { type: "text"; value: string };
type ElementNode = {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};
type RootNode = { type: "root"; children?: HastNode[] };
type HastNode = TextNode | ElementNode | RootNode | { type: string; children?: HastNode[] };

/** Never link inside these - code samples, headings, or existing links. */
const SKIP_TAGS = new Set(["code", "pre", "a", "h1", "h2", "h3", "h4", "h5", "h6"]);

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

type PreparedTerm = GlossaryTerm & { pattern: RegExp };

function buildTermNode(term: PreparedTerm, matchedText: string): ElementNode {
  return {
    type: "element",
    tagName: "a",
    properties: {
      className: ["glossary-term"],
      href: `/concepts#${term.slug}`,
    },
    children: [
      { type: "text", value: matchedText },
      {
        type: "element",
        tagName: "span",
        properties: { className: ["glossary-tooltip"] },
        children: [
          {
            type: "element",
            tagName: "strong",
            properties: { className: ["glossary-tooltip-term"] },
            children: [{ type: "text", value: term.term }],
          },
          { type: "text", value: term.definition },
        ],
      },
    ],
  };
}

/**
 * Wraps the first mention of each glossary term in a lesson with a link to the
 * glossary plus a hover/focus definition tooltip. Only the first occurrence of
 * any given term is linked, so a lesson that says "cache" thirty times still
 * reads normally.
 *
 * Terms whose own lesson is the current page are skipped - linking "idempotency"
 * back to itself on the idempotency lesson is just noise.
 */
export function rehypeGlossary(options: {
  terms: GlossaryTerm[];
  currentSlug?: string;
}) {
  const { terms, currentSlug } = options;

  const prepared: PreparedTerm[] = terms
    .filter((term) => term.slug !== currentSlug && term.relatedTopicSlug !== currentSlug)
    // Longest first so "P99 latency" wins over "latency" at the same position.
    .sort((a, b) => b.term.length - a.term.length)
    .map((term) => ({
      ...term,
      pattern: new RegExp(`\\b${escapeRegex(term.term)}s?\\b`, "i"),
    }));

  return function transformer(tree: HastNode) {
    if (prepared.length === 0) return;
    const used = new Set<string>();

    function findFirstMatch(value: string) {
      let best: { start: number; end: number; term: PreparedTerm } | null = null;

      for (const term of prepared) {
        if (used.has(term.slug)) continue;
        const match = term.pattern.exec(value);
        if (!match) continue;

        const start = match.index;
        const end = start + match[0].length;
        const isBetter =
          !best || start < best.start || (start === best.start && end - start > best.end - best.start);
        if (isBetter) best = { start, end, term };
      }

      return best;
    }

    function splitText(value: string): HastNode[] | null {
      const out: HastNode[] = [];
      let rest = value;

      for (;;) {
        const match = findFirstMatch(rest);
        if (!match) break;

        if (match.start > 0) out.push({ type: "text", value: rest.slice(0, match.start) });
        out.push(buildTermNode(match.term, rest.slice(match.start, match.end)));
        used.add(match.term.slug);
        rest = rest.slice(match.end);
      }

      if (out.length === 0) return null;
      if (rest) out.push({ type: "text", value: rest });
      return out;
    }

    function walk(node: HastNode) {
      const children = (node as ElementNode).children;
      if (!Array.isArray(children)) return;

      const next: HastNode[] = [];
      for (const child of children) {
        if (child.type === "text") {
          const replaced = splitText((child as TextNode).value);
          if (replaced) {
            next.push(...replaced);
            continue;
          }
          next.push(child);
          continue;
        }

        if (child.type === "element" && SKIP_TAGS.has((child as ElementNode).tagName)) {
          next.push(child);
          continue;
        }

        walk(child);
        next.push(child);
      }

      (node as ElementNode).children = next;
    }

    walk(tree);
  };
}
