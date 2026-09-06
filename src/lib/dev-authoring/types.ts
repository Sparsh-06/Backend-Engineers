export type VisualDraft =
  | {
      type: "memory-map";
      title: string;
      description: string;
      items: { label: string; location: "stack" | "heap"; detail: string }[];
    }
  | {
      type: "request-flow";
      title: string;
      description: string;
      sourceId: string;
      nodes: { id: string; label: string; x: number; y: number; emphasis?: boolean }[];
      defaultPath: string[];
      activePath: string[];
      hint: string;
      detail: string;
    }
  | {
      type: "comparison";
      title: string;
      description: string;
      left: { label: string; summary: string; points: string[] };
      right: { label: string; summary: string; points: string[] };
    }
  | {
      type: "timeline";
      title: string;
      description: string;
      steps: { label: string; detail: string }[];
    };

export type TopicDraftInput = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  phase: string;
  groupSlug: string;
  publish: boolean;
  bodyMarkdown: string;
  imageFilename?: string;
  heroVisual?: VisualDraft;
  poolVisuals: (VisualDraft & { id: string })[];
};

/** One entry per known curriculum group - slug/title/phase are load-bearing
 * (must match src/data/topics.ts exactly), used to populate the group
 * picker and auto-fill the phase field. */
export const TOPIC_GROUPS = [
  { slug: "backend-fundamentals", title: "Backend fundamentals, before the deep dives", phase: "Phase 0" },
  { slug: "language-runtimes", title: "Language runtimes and execution mechanics", phase: "Phase 1" },
  { slug: "protocols-and-apis", title: "Protocols, APIs, and networking", phase: "Phase 2" },
  { slug: "data-storage", title: "Data storage, persistence, and caching", phase: "Phase 3" },
  { slug: "distributed-architecture", title: "Backend scaling and system architecture", phase: "Phase 4" },
  { slug: "cloud-platform", title: "Cloud infrastructure, DevOps, and observability", phase: "Phase 5" },
  { slug: "production-scenarios", title: "Production engineering and real-world system design", phase: "Phase 6" },
] as const;

export type CreateTopicState = {
  status: "idle" | "ok" | "error";
  message?: string;
  slug?: string;
};

export type ArchitectureProfileDraft = {
  slug: string;
  company: string;
  logo: string;
  tagline: string;
  problem: string;
  scaleContext: string;
  seoKeywords: string[];
  techStack: { name: string; category: string; whatItsFor: string }[];
  approach: { heading: string; body: string }[];
  microservicesNote: string;
  takeaway: string;
  sources: string[];
};

export type DeepDiveDraft = {
  slug: string;
  companySlug: string;
  title: string;
  tagline: string;
  seoKeywords: string[];
  intro: string;
  keyTermsUsed: { term: string; definition: string }[];
  pipeline: { label: string; detail: string; stat?: string }[];
  sections: { heading: string; body: string[] }[];
  takeaway: string;
  sourceTitle: string;
  sourceAuthors: string[];
  sourceUrl: string;
  sourceNote: string;
};

export type BuildProjectDraft = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeEstimate: string;
  stack: string[];
  keywords: string[];
  whatYoullBuild: string[];
  relatedTopicSlugs: string[];
  bodyMarkdown: string;
};
