import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import { fieldNotes } from "@/data/field-notes";

const siteName = "Backend Engineer";
const description =
  "Short, curated takes on real engineering blog posts, postmortems, and incidents worth understanding - reactions, not summaries.";

export const metadata: Metadata = {
  title: "Field Notes",
  description,
  keywords: [
    "backend engineering field notes",
    "engineering postmortem analysis",
    "system design blog reactions",
    "backend engineering commentary",
    "engineering incident writeups",
    "backend engineering blog",
    "postmortem breakdown",
    "system design case studies",
  ],
  alternates: { canonical: "/blog" },
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
    title: "Field Notes",
    description:
      "Short, curated takes on real engineering blog posts, postmortems, and incidents worth understanding.",
    url: "/blog",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Notes",
    description: "Short, curated takes on real engineering blog posts, postmortems, and incidents.",
  },
};

// Only emitted once real notes exist - structured data claiming a Blog with
// items when the page is honestly empty would be inaccurate markup.
const fieldNotesSchema =
  fieldNotes.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Field Notes",
        description,
        url: "https://www.backendengineer.in/blog",
        publisher: { "@type": "Organization", name: siteName },
        blogPost: fieldNotes.map((note) => ({
          "@type": "BlogPosting",
          headline: note.title,
          url: note.sourceUrl,
          datePublished: note.date,
        })),
      }
    : null;

export default function BlogPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      {fieldNotesSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(fieldNotesSchema) }}
        />
      )}
      <Navbar />
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
            Field notes
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[.94] tracking-[-.065em] sm:text-7xl">
            Reactions, not summaries.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/60">
            Short takes on real engineering blog posts, postmortems, and
            incidents worth understanding - what they actually teach, not
            just what happened.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          {fieldNotes.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-black/20 bg-white/30 p-10 text-center sm:p-16">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
                Nothing here yet
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                No notes curated yet - this section is genuinely empty, not a placeholder.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-black/60">
                Field notes get added as real, worthwhile engineering writing
                comes up worth reacting to. Check back, or explore the
                published lessons in the meantime.
              </p>
              <Link
                href="/topics"
                className="mt-8 inline-block rounded-full bg-black px-6 py-3 text-sm font-semibold text-[#EEE9E3] transition hover:bg-[#ff4d00]"
              >
                Browse topics instead →
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {fieldNotes.map((note) => (
                <a
                  key={note.slug}
                  href={note.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[1.75rem] border border-black/15 bg-white/35 p-7 transition hover:-translate-y-1 hover:bg-white sm:p-9"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-black/45">
                    {note.date} · reacting to &ldquo;{note.sourceTitle}&rdquo;
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-tight">
                    {note.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {note.takeaway}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs font-semibold">
                    <span>Read the source</span>
                    <span className="transition-transform group-hover:translate-x-1">↗</span>
                  </div>
                </a>
              ))}
            </div>
          )}
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
