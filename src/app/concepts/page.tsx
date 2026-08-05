import type { Metadata } from "next";
import Collection from "@/modules/layouts/collection";

export const metadata: Metadata = {
  title: "Backend Engineering Concepts",
  description:
    "Visual, practical guides to the core concepts behind reliable backend systems, from HTTP and databases to reliability and security.",
  keywords: [
    "backend engineering concepts",
    "http basics",
    "databases",
    "reliability",
    "security",
  ],
  alternates: { canonical: "/concepts" },
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
    title: "Backend Engineering Concepts",
    description:
      "Visual, practical guides to the core concepts behind reliable backend systems, from HTTP and databases to reliability and security.",
    url: "/concepts",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Engineering Concepts",
    description:
      "Visual, practical guides to the core concepts behind reliable backend systems, from HTTP and databases to reliability and security.",
  },
};
export default function ConceptsPage() {
  return (
    <Collection
      label="Concept library"
      title="The building blocks, made legible."
      intro="Go from the first HTTP request to production-ready systems with mental models that hold up when the details get complex."
      items={[
        {
          eyebrow: "Foundations · 18 lessons",
          title: "How the web carries a request",
          description:
            "DNS, TCP, TLS, HTTP, and the invisible handoffs that make a browser and service talk.",
          meta: "Begin here",
          accent: true,
          href: "/architecture",
        },
        {
          eyebrow: "Data · 14 lessons",
          title: "Databases beyond CRUD",
          description:
            "Indexes, transactions, replication, schemas, and choosing data stores with intention.",
          meta: "Explore data",
          href: "/architecture",
        },
        {
          eyebrow: "Reliability · 12 lessons",
          title: "Designing for things to break",
          description:
            "Timeouts, retries, idempotency, circuit breakers, and graceful degradation.",
          meta: "Build resilience",
          href: "/architecture",
        },
        {
          eyebrow: "Security · 10 lessons",
          title: "Trust is an engineering problem",
          description:
            "Identity, permissions, secrets, encryption, and safe boundaries between systems.",
          meta: "Protect systems",
          href: "/cloud",
        },
      ]}
    />
  );
}
