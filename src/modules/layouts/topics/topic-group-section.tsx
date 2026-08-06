import Link from "next/link";
import type { TopicGroup } from "@/data/topics";

function matchesQuery(topic: TopicGroup["topics"][number], query: string) {
  const haystack = [topic.title, topic.description, ...topic.keywords]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

export default function TopicGroupSection({
  group,
  index,
  query,
}: {
  group: TopicGroup;
  index: number;
  query: string;
}) {
  const normalizedQuery = query.trim().toLowerCase();
  const topics = normalizedQuery
    ? group.topics.filter((topic) => matchesQuery(topic, normalizedQuery))
    : group.topics;

  if (topics.length === 0) return null;

  return (
    <section
      id={group.slug}
      className={`border-t border-black/10 px-5 py-12 sm:px-8 lg:px-12 ${index % 2 === 0 ? "bg-white/20" : "bg-transparent"}`}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
              {group.keywords.join(" · ")}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tighter sm:text-4xl">
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

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {topics.map((topic) => (
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
                {topic.keywords.slice(0, 3).map((keyword) => (
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
  );
}
