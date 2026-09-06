import type { TopicDraftInput, VisualDraft } from "./types";

function serializeVisual(visual: VisualDraft & { id?: string }): string {
  const idLine = visual.id ? `id: ${JSON.stringify(visual.id)},\n` : "";
  const common = `type: ${JSON.stringify(visual.type)},\n${idLine}title: ${JSON.stringify(visual.title)},\ndescription: ${JSON.stringify(visual.description)},\n`;

  if (visual.type === "memory-map") {
    const items = visual.items
      .map(
        (item) =>
          `{ label: ${JSON.stringify(item.label)}, location: ${JSON.stringify(item.location)}, detail: ${JSON.stringify(item.detail)} }`,
      )
      .join(",\n");
    return `{\n${common}items: [\n${items},\n],\n}`;
  }

  if (visual.type === "request-flow") {
    const nodes = visual.nodes
      .map((node) => {
        const emphasis = node.emphasis ? ", emphasis: true" : "";
        return `{ id: ${JSON.stringify(node.id)}, label: ${JSON.stringify(node.label)}, x: ${node.x}, y: ${node.y}${emphasis} }`;
      })
      .join(",\n");
    return `{\n${common}sourceId: ${JSON.stringify(visual.sourceId)},\nnodes: [\n${nodes},\n],\ndefaultPath: ${JSON.stringify(visual.defaultPath)},\nactivePath: ${JSON.stringify(visual.activePath)},\nhint: ${JSON.stringify(visual.hint)},\ndetail: ${JSON.stringify(visual.detail)},\n}`;
  }

  if (visual.type === "comparison") {
    const side = (s: { label: string; summary: string; points: string[] }) =>
      `{ label: ${JSON.stringify(s.label)}, summary: ${JSON.stringify(s.summary)}, points: ${JSON.stringify(s.points)} }`;
    return `{\n${common}left: ${side(visual.left)},\nright: ${side(visual.right)},\n}`;
  }

  // timeline
  const steps = visual.steps
    .map((step) => `{ label: ${JSON.stringify(step.label)}, detail: ${JSON.stringify(step.detail)} }`)
    .join(",\n");
  return `{\n${common}steps: [\n${steps},\n],\n}`;
}

/** Builds the exact object-literal source text for a new `TopicItem`, ready
 * to be inserted as an array element by ts-morph. Every string/array leaf
 * goes through JSON.stringify, which produces valid, correctly-escaped
 * double-quoted TS literals for free - no hand-rolled escaping. `image` is
 * deliberately never included here: it lives only in the MDX frontmatter,
 * matching the convention every existing topic already follows. */
export function serializeTopicItem(topic: TopicDraftInput): string {
  const lines = [
    `slug: ${JSON.stringify(topic.slug)},`,
    `title: ${JSON.stringify(topic.title)},`,
    `description: ${JSON.stringify(topic.description)},`,
    `keywords: ${JSON.stringify(topic.keywords)},`,
    `phase: ${JSON.stringify(topic.phase)},`,
  ];
  if (topic.heroVisual) {
    lines.push(`visual: ${serializeVisual(topic.heroVisual)},`);
  }
  if (topic.poolVisuals.length > 0) {
    const visuals = topic.poolVisuals.map(serializeVisual).join(",\n");
    lines.push(`visuals: [\n${visuals},\n],`);
  }
  return `{\n${lines.join("\n")}\n}`;
}
