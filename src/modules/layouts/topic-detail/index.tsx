import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import InteractiveVisual from "@/modules/components/topics/interactive-visual";
import type { TopicVisual } from "@/data/topics";
import type { TocEntry } from "@/lib/markdown";
import type { ReactNode } from "react";

type RelatedTopic = { slug: string; title: string; description: string };
type TopicDetailProps = {
  slug: string;
  title: string;
  description: string;
  phase: string;
  keywords: string[];
  groupTitle: string;
  groupDescription: string;
  intro: string;
  groupSlug: string;
  groupTopics: RelatedTopic[];
  relatedTopics: RelatedTopic[];
  visual?: TopicVisual;
  /** Pre-rendered MDX/Markdown content. When present, replaces the auto-generated copy. */
  content?: ReactNode | null;
  /** Headings extracted from the markdown, used for the right sidebar ToC. */
  markdownToc?: TocEntry[];
};



function buildArticleCopy({
  title,
  description,
  groupTitle,
  groupDescription,
  intro,
  keywords,
}: Pick<
  TopicDetailProps,
  | "title"
  | "description"
  | "groupTitle"
  | "groupDescription"
  | "intro"
  | "keywords"
>) {
  const topicFocus = keywords[0] ?? title.toLowerCase();
  const keywordLine = keywords.slice(0, 3).join(", ");
  return {
    overview: [
      `${title} makes more sense when you see where it fits in ${groupTitle.toLowerCase()}. The goal is not to memorise a definition. It is to understand what is happening and why it matters.`,
      intro,
      description,
    ],
    mechanics: [
      `${title} affects ${topicFocus}. The system still does the main work, but this idea changes where that work happens and what you can notice about it.`,
      `In simple terms, pay attention to ${keywordLine}. These are the parts that shape speed, reliability, and the choices you make when something goes wrong.`,
      `It also connects to the bigger picture: ${groupDescription.toLowerCase()} Learning the surrounding topics makes this one easier to use in real work.`,
    ],
    pitfalls: [
      `Learning the name without understanding what it changes in a real system.`,
      "Skipping the question of what happens when traffic, delays, or failures increase.",
      `Thinking ${keywordLine} work separately when they usually affect one another.`,
    ],
    quickCheck: [
      `If a request is slow, where would you look first for ${topicFocus}?`,
      "What might change if twice as many people used the system?",
      "Which nearby topic would help you understand this one better?",
    ],
  };
}

export default function TopicDetail(props: TopicDetailProps) {
  const {
    slug,
    title,
    description,
    phase,
    keywords,
    groupTitle,
    groupDescription,
    intro,
    groupSlug,
    groupTopics,
    relatedTopics,
    visual,
    content,
    markdownToc = [],
  } = props;

  const hasMarkdown = Boolean(content);

  const toc: TocEntry[] =
    hasMarkdown && markdownToc.length > 0
      ? markdownToc
      : [
          { id: "overview", label: "Overview", depth: 2 },
          { id: "mechanics", label: "How it works", depth: 2 },
          { id: "pitfalls", label: "Common pitfalls", depth: 2 },
          { id: "quick-check", label: "Quick check", depth: 2 },
          { id: "related", label: "Related lessons", depth: 2 },
        ];

  const copy = buildArticleCopy({
    title,
    description,
    groupTitle,
    groupDescription,
    intro,
    keywords,
  });

  return (
    <main>
      <Navbar />
      <section className="px-5 pb-20 pt-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[220px_minmax(0,680px)_190px] xl:justify-center xl:gap-14">
          {/* Left sidebar - group navigation */}
          <aside className="hidden xl:block">
            <div className="sticky top-28 border-r border-black/10 pr-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45">
                In this group
              </p>
              <nav className="mt-4 grid gap-1" aria-label="Topics in this group">
                {groupTopics.map((topic) => (
                  <Link
                    key={topic.slug}
                    href={`/topics/${topic.slug}`}
                    className={`rounded-lg px-2.5 py-2 text-[13px] leading-snug transition ${
                      topic.slug === slug
                        ? "bg-black text-[#EEE9E3]"
                        : "text-black/60 hover:bg-black/5 hover:text-black"
                    }`}
                  >
                    {topic.title}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main article content */}
          <article className="min-w-0 pb-4">
            <header className="border-b border-black/15 pb-9">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">
                <Link href="/topics" className="text-[#ff4d00] hover:underline">
                  Topics
                </Link>
                <span>·</span>
                <Link
                  href={`/topics#${groupSlug}`}
                  className="hover:text-black"
                >
                  {groupTitle}
                </Link>
              </div>
              <p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
                {phase}
              </p>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/60">
                {description}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                {keywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="text-[11px] font-semibold uppercase tracking-[0.14em] text-black/45"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </header>

            <div className="article-copy">
              {hasMarkdown ? (
                /* ─── Markdown-sourced content ──────────────────────────── */
                <>
                  {visual && (
                    <div className="mb-10">
                      <InteractiveVisual visual={visual} />
                    </div>
                  )}
                  <section id="content" className="scroll-mt-28">
                    <div className="prose-article">{content}</div>
                  </section>

                  {/* Related lessons */}
                  <section id="related" className="scroll-mt-28 mt-16">
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <p className="article-kicker">Related lessons</p>
                        <h2>Continue through the group.</h2>
                      </div>
                      <Link
                        href={`/topics#${groupSlug}`}
                        className="shrink-0 text-xs font-semibold underline decoration-black/25 underline-offset-4"
                      >
                        View all
                      </Link>
                    </div>
                    <div className="mt-5 border-t border-black/15">
                      {relatedTopics.map((topic, index) => (
                        <Link
                          key={topic.slug}
                          href={`/topics/${topic.slug}`}
                          className="group flex items-start gap-4 border-b border-black/15 py-5"
                        >
                          <span className="font-mono text-[11px] text-[#ff4d00]">
                            0{index + 1}
                          </span>
                          <div>
                            <p className="text-base font-semibold tracking-tight group-hover:underline">
                              {topic.title}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-black/55">
                              {topic.description}
                            </p>
                          </div>
                          <span className="ml-auto pt-1 text-sm transition group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                </>
              ) : (
                /* ─── Auto-generated fallback copy ─────────────────────── */
                <>
                  <section id="overview" className="scroll-mt-28">
                    <p className="article-kicker">Overview</p>
                    {copy.overview.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    <aside className="my-8 border-l-2 border-[#ff4d00] pl-5 text-[15px] leading-relaxed text-black/65">
                      <strong className="text-black">Keep in mind.</strong> You
                      do not need to know every detail at once. First, notice
                      what changes when the system has more work to do.
                    </aside>
                    {visual && <InteractiveVisual visual={visual} />}
                  </section>
                  <section id="mechanics" className="scroll-mt-28">
                    <p className="article-kicker">How it works</p>
                    <h2>Understand the moving parts.</h2>
                    {copy.mechanics.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </section>
                  <section id="pitfalls" className="scroll-mt-28">
                    <p className="article-kicker">Common pitfalls</p>
                    <h2>Watch for these assumptions.</h2>
                    <ul>
                      {copy.pitfalls.map((pitfall) => (
                        <li key={pitfall}>{pitfall}</li>
                      ))}
                    </ul>
                  </section>
                  <section
                    id="quick-check"
                    className="scroll-mt-28 border-y border-black/15 py-8"
                  >
                    <p className="article-kicker text-[#ff4d00]">Quick check</p>
                    <h2>Questions worth carrying forward.</h2>
                    <ol>
                      {copy.quickCheck.map((question) => (
                        <li key={question}>{question}</li>
                      ))}
                    </ol>
                  </section>
                  <section id="related" className="scroll-mt-28">
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <p className="article-kicker">Related lessons</p>
                        <h2>Continue through the group.</h2>
                      </div>
                      <Link
                        href={`/topics#${groupSlug}`}
                        className="shrink-0 text-xs font-semibold underline decoration-black/25 underline-offset-4"
                      >
                        View all
                      </Link>
                    </div>
                    <div className="mt-5 border-t border-black/15">
                      {relatedTopics.map((topic, index) => (
                        <Link
                          key={topic.slug}
                          href={`/topics/${topic.slug}`}
                          className="group flex items-start gap-4 border-b border-black/15 py-5"
                        >
                          <span className="font-mono text-[11px] text-[#ff4d00]">
                            0{index + 1}
                          </span>
                          <div>
                            <p className="text-base font-semibold tracking-tight group-hover:underline">
                              {topic.title}
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-black/55">
                              {topic.description}
                            </p>
                          </div>
                          <span className="ml-auto pt-1 text-sm transition group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </section>
                </>
              )}
            </div>
          </article>

          {/* Right sidebar - table of contents */}
          <aside className="hidden xl:block">
            <div className="sticky top-28 border-l border-black/10 pl-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/45">
                On this page
              </p>
              <nav className="mt-4 grid gap-0.5" aria-label="Table of contents">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`py-1.5 text-[13px] leading-snug text-black/55 transition hover:text-black ${
                      item.depth === 3 ? "pl-3 text-[12px]" : "font-medium"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                {/* Always link to related lessons at the bottom */}
                {hasMarkdown && (
                  <a
                    href="#related"
                    className="mt-3 border-t border-black/10 pt-3 py-1.5 text-[13px] font-medium text-black/55 transition hover:text-black"
                  >
                    Related lessons
                  </a>
                )}
              </nav>
            </div>
          </aside>

        </div>
      </section>
      <footer className="border-t border-black/15 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-xs font-medium text-black/55 sm:flex-row">
          <span>© {new Date().getFullYear()} Backend Engineer</span>
          <span>
            Backend engineering, cloud, and systems thinking in one place.
          </span>
        </div>
      </footer>
    </main>
  );
}
