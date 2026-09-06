import type { DeepDiveDraft } from "./types";

export function serializeDeepDive(deepDive: DeepDiveDraft): string {
  const keyTermsUsed = deepDive.keyTermsUsed
    .map((t) => `{ term: ${JSON.stringify(t.term)}, definition: ${JSON.stringify(t.definition)} }`)
    .join(",\n");

  const pipeline = deepDive.pipeline
    .map((stage) => {
      const stat = stage.stat ? `, stat: ${JSON.stringify(stage.stat)}` : "";
      return `{ label: ${JSON.stringify(stage.label)}, detail: ${JSON.stringify(stage.detail)}${stat} }`;
    })
    .join(",\n");

  const sections = deepDive.sections
    .map(
      (section) =>
        `{\nheading: ${JSON.stringify(section.heading)},\nbody: [\n${section.body.map((p) => JSON.stringify(p)).join(",\n")},\n],\n}`,
    )
    .join(",\n");

  const lines = [
    `slug: ${JSON.stringify(deepDive.slug)},`,
    `companySlug: ${JSON.stringify(deepDive.companySlug)},`,
    `title: ${JSON.stringify(deepDive.title)},`,
    `tagline: ${JSON.stringify(deepDive.tagline)},`,
    `seoKeywords: ${JSON.stringify(deepDive.seoKeywords)},`,
    `intro:\n${JSON.stringify(deepDive.intro)},`,
    `keyTermsUsed: [\n${keyTermsUsed},\n],`,
    `pipeline: [\n${pipeline},\n],`,
    `sections: [\n${sections},\n],`,
    `takeaway:\n${JSON.stringify(deepDive.takeaway)},`,
    `sourceTitle: ${JSON.stringify(deepDive.sourceTitle)},`,
    `sourceAuthors: ${JSON.stringify(deepDive.sourceAuthors)},`,
    `sourceUrl: ${JSON.stringify(deepDive.sourceUrl)},`,
    `sourceNote:\n${JSON.stringify(deepDive.sourceNote)},`,
  ];
  return `{\n${lines.join("\n")}\n}`;
}
