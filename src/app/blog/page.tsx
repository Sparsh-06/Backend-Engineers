import type { Metadata } from "next";
import Collection from "@/modules/layouts/collection";
export const metadata: Metadata = {
  title: "Backend Engineering Blog",
  description:
    "Field notes and essays about backend engineering, cloud infrastructure, and system design.",
};

export default function BlogPage() {
  return (
    <Collection
      label="Field notes"
      title="Notes from under the hood."
      intro="Short, useful thinking for engineers who want to understand the systems they build, not just make them pass today."
      items={[
        {
          eyebrow: "Caching · 6 min read",
          title: "The question underneath “Should we use Redis?”",
          description:
            "Before picking a tool, name the latency, load, cost, or consistency problem you are actually solving.",
          meta: "Read note",
          accent: true,
          href: "/architecture",
        },
        {
          eyebrow: "Career · 5 min read",
          title: "Learning backend engineering in public",
          description:
            "Build a compounding practice around projects, writing, and the questions that keep you curious.",
          meta: "Read note",
          href: "/concepts",
        },
        {
          eyebrow: "Architecture · 8 min read",
          title: "The overlooked work of naming boundaries",
          description:
            "A system gets easier to change when its boundaries reflect the jobs it truly has to do.",
          meta: "Read note",
          href: "/architecture",
        },
        {
          eyebrow: "Operations · 7 min read",
          title: "What an incident teaches you about design",
          description:
            "Postmortems are not paperwork. They are one of the best inputs for the next system decision.",
          meta: "Read note",
          href: "/cloud",
        },
      ]}
    />
  );
}
