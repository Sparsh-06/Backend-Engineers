import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import SiteFooter from "@/modules/components/common/site-footer";
import { buildProjects } from "@/data/build-projects";

export const metadata: Metadata = {
  title: "Build It - Backend Projects You Actually Build",
  description:
    "Guided, from-scratch backend projects - a rate limiter, a URL shortener, a real-time chat server - with real code, real trade-offs, and the exact problems that only show up once you build the thing yourself.",
  keywords: [
    "backend projects to build",
    "backend engineering practice projects",
    "how to build a rate limiter",
    "how to build a url shortener",
    "how to build a chat server",
    "system design practice projects",
    "learn backend by building",
    "backend project ideas",
    "node js practice projects",
    "backend engineering tutorials",
  ],
  alternates: { canonical: "/build" },
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
    title: "Build It - Backend Projects You Actually Build",
    description:
      "Guided, from-scratch backend projects with real code and real trade-offs - not just theory.",
    url: "/build",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build It - Backend Projects You Actually Build",
    description: "Guided, from-scratch backend projects with real code and real trade-offs.",
  },
};

const DIFFICULTY_STYLES: Record<string, string> = {
  Beginner: "border-black/15 text-black/60",
  Intermediate: "border-[#ff4d00]/40 text-[#ff4d00]",
  Advanced: "border-black text-black",
};

const buildHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Build It - Backend Projects You Actually Build",
  description:
    "Guided, from-scratch backend projects with real code and real trade-offs, not just theory.",
  url: "https://www.backendengineer.in/build",
  isPartOf: {
    "@type": "WebSite",
    name: "Backend Engineer",
    url: "https://www.backendengineer.in",
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: buildProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: project.title,
      url: `https://www.backendengineer.in/build/${project.slug}`,
    })),
  },
};

export default function BuildPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHubSchema) }}
      />
      <Navbar />
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
            Build it
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[.94] tracking-[-.065em] sm:text-7xl">
            Stop reading about it. Build the thing.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-black/60">
            Every project here is a real, working system you build from
            scratch - with the actual code, the decisions behind it, and the
            specific problems that only show up once you build it yourself
            instead of reading someone else&rsquo;s summary.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {buildProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/build/${project.slug}`}
              className="group flex min-h-64 flex-col rounded-[1.75rem] border border-black/15 bg-white/35 p-7 transition hover:-translate-y-1 hover:bg-white sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${DIFFICULTY_STYLES[project.difficulty]}`}
                >
                  {project.difficulty}
                </span>
                <span className="text-xs font-semibold text-black/40">{project.timeEstimate}</span>
              </div>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-[-.045em]">
                {project.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#ff4d00]">
                {project.tagline}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-black/60">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/10 bg-black/5 px-2.5 py-1 text-[11px] font-semibold text-black/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <br />
              <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-5 text-xs font-semibold uppercase tracking-wider">
                <span>Start building</span>
                <span className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter note="Backend engineering, cloud, and systems thinking in one place." />
    </main>
  );
}
