import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import { topicGroups } from "@/data/topics";

export default function TopicsHub() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
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
          <div className="mt-10 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
            {[
              "Backend engineering",
              "System design",
              "Cloud and platform",
              "Database systems",
              "Observability",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-black/10 bg-white/50 px-4 py-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {topicGroups.map((group, index) => (
        <section
          key={group.slug}
          className={`border-t border-black/10 px-5 py-12 sm:px-8 lg:px-12 ${index % 2 === 0 ? "bg-white/20" : "bg-transparent"}`}
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
                  {group.keywords.join(" · ")}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                  {group.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-black/60">
                  {group.intro}
                </p>
              </div>
              <Link
                href={`#${group.slug}`}
                className="text-sm font-semibold text-black/65 underline decoration-black/25 underline-offset-4 hover:decoration-black"
              >
                Jump to lessons
              </Link>
            </div>

            <div
              id={group.slug}
              className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
            >
              {group.topics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="group flex min-h-56 flex-col rounded-[1.75rem] border border-black/10 bg-[#f7f3ee]/85 p-6 transition hover:-translate-y-1 hover:border-black/20 hover:bg-white"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                    {topic.phase}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-.04em]">
                    {topic.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {topic.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {topic.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/55"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
                    Open lesson
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="px-5 pb-20 pt-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 rounded-[2rem] border border-black/10 bg-white/35 p-6 backdrop-blur sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
              Built for growth
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
              A searchable index today, lesson pages tomorrow.
            </h2>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["SEO-friendly titles", "Every cluster uses precise, searchable language."],
              ["Clear hierarchy", "Topics are grouped by phase and learning intent."],
              ["Internal links", "Each page can point back to the larger map."],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-[1.5rem] border border-black/10 bg-[#eee9e3]/70 p-5"
              >
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-black/65">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/15 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-xs font-medium text-black/55 sm:flex-row">
          <span>© {new Date().getFullYear()} B.Engineers</span>
          <span>Backend engineering, cloud, and systems thinking in one place.</span>
        </div>
      </footer>
    </main>
  );
}
