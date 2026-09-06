import Navbar from "@/modules/components/common/navbar";
import SiteFooter from "@/modules/components/common/site-footer";
import { visibleTopicGroups } from "@/data/topics";
import TopicSearchInput from "@/modules/layouts/topics/topic-search";
import TopicResults from "@/modules/layouts/topics/topic-results";

// Short labels for the hero jump-nav - the real group titles ("Cloud
// infrastructure, DevOps, and observability") are too long for a single-line
// pill row, so this is a presentational-only shorthand, not a second source
// of truth for the group's actual title.
const shortGroupLabels: Record<string, string> = {
  "backend-fundamentals": "Fundamentals",
  "language-runtimes": "Runtimes",
  "protocols-and-apis": "Protocols & APIs",
  "algorithms-in-backend": "Algorithms",
  "data-storage": "Data storage",
  "distributed-architecture": "Distributed systems",
  "cloud-platform": "Cloud & DevOps",
  "production-scenarios": "Production design",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Backend Engineer",
      item: "https://www.backendengineer.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Topics",
      item: "https://www.backendengineer.in/topics",
    },
  ],
};

export default function TopicsHub() {
  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />
      <section id="topics-top" className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
            Learning paths
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[.94] tracking-[-.065em] sm:text-7xl">
            Every topic, organized for search and for study.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-black/60">
            A curriculum-style index of backend engineering, with each cluster
            broken into clear keywords, individual lessons, and internal links
            that make the site easier to explore and easier to rank.
          </p>
          <div className="mt-10 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/55">
            {visibleTopicGroups.map((group) => (
              // Plain <a>, not next/link - Link doesn't reliably perform the
              // native scroll-to-anchor behavior for same-page hash changes.
              <a
                key={group.slug}
                href={`#${group.slug}`}
                className="rounded-full border border-black/10 bg-white/50 px-4 py-2 transition hover:border-[#ff4d00]/40 hover:bg-white hover:text-black"
              >
                {shortGroupLabels[group.slug] ?? group.title}
              </a>
            ))}
          </div>

          <TopicSearchInput />
        </div>
      </section>

      <TopicResults groups={visibleTopicGroups} />

      <SiteFooter note="Backend engineering, cloud, and systems thinking in one place." />
    </main>
  );
}
