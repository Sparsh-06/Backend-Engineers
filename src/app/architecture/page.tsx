import type { Metadata } from "next";
import Collection from "@/modules/layouts/collection";
export const metadata: Metadata = {
  title: "System Architecture",
  description:
    "Interactive system design explanations and backend architecture patterns for scalable services.",
  keywords: [
    "system architecture",
    "backend architecture",
    "scalable services",
    "system design",
    "request flow",
  ],
  alternates: { canonical: "/architecture" },
  authors: [{ name: "Sparsh Sharma" }],
  creator: "Sparsh Sharma",
  publisher: "Backend Engineer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "System Architecture",
    description:
      "Interactive system design explanations and backend architecture patterns for scalable services.",
    url: "/architecture",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Architecture",
    description:
      "Interactive system design explanations and backend architecture patterns for scalable services.",
  },
};

export default function ArchitecturePage() {
  return (
    <Collection
      label="Systems architecture"
      title="See the system, not just the boxes."
      intro="Explore the tradeoffs behind scalable architectures, one flow, failure mode, and decision at a time."
      items={[
        {
          eyebrow: "Interactive map · 8 min",
          title: "An API request, end to end",
          description:
            "Trace a request through the edge, load balancer, services, cache, queue, and database.",
          meta: "Trace the flow",
          accent: true,
          href: "/concepts",
        },
        {
          eyebrow: "Pattern · 12 min",
          title: "When a monolith is the right answer",
          description:
            "A clear-eyed guide to modular monoliths, service boundaries, and avoiding premature complexity.",
          meta: "View pattern",
          href: "/cloud",
        },
        {
          eyebrow: "Systems · 15 min",
          title: "Queues are not just a buffer",
          description:
            "Learn what asynchronous work changes—and where it introduces new kinds of failure.",
          meta: "Explore queues",
          href: "/concepts",
        },
        {
          eyebrow: "Scale · 10 min",
          title: "The many shapes of caching",
          description:
            "From browser cache to Redis: decide what to cache, where, and for how long.",
          meta: "Open explainer",
          href: "/cloud",
        },
      ]}
    />
  );
}
