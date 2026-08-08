import type { Metadata } from "next";
import Navbar from "@/modules/components/common/navbar";
import GlossaryList from "@/modules/layouts/concepts/glossary-list";
import { glossaryTerms } from "@/data/glossary";

export const metadata: Metadata = {
  title: "Backend Engineering Glossary",
  description:
    "A plain-English glossary of backend engineering terms - idempotency, backpressure, sharding, p99 latency, and more, each with a real definition and a link to the full lesson.",
  keywords: [
    "backend engineering glossary",
    "backend terms explained",
    "what does idempotency mean",
    "what is backpressure",
    "what is p99 latency",
    "backend dictionary",
    "system design terms",
    "software engineering glossary",
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
    title: "Backend Engineering Glossary",
    description:
      "A plain-English glossary of backend engineering terms, each with a real definition and a link to the full lesson.",
    url: "/concepts",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Engineering Glossary",
    description:
      "A plain-English glossary of backend engineering terms, each with a real definition and a link to the full lesson.",
  },
};

const glossarySchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Backend Engineering Glossary",
  url: "https://www.backendengineer.in/concepts",
  hasDefinedTerm: glossaryTerms.map((entry) => ({
    "@type": "DefinedTerm",
    name: entry.term,
    description: entry.definition,
    url: `https://www.backendengineer.in/concepts#${entry.slug}`,
  })),
};

export default function ConceptsPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
      />
      <Navbar />
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
            Glossary
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[.94] tracking-[-.065em] sm:text-7xl">
            Every term, in plain English.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/60">
            A quick-reference glossary for backend engineering - no jargon
            explaining jargon. Each term links to the full lesson when one
            exists.
          </p>
          <GlossaryList terms={glossaryTerms} />
        </div>
      </section>
      <footer className="border-t border-black/15 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-xs font-medium text-black/55 sm:flex-row">
          <span>© {new Date().getFullYear()} Backend Engineer</span>
          <span>Backend engineering, cloud, and systems thinking in one place.</span>
        </div>
      </footer>
    </main>
  );
}
