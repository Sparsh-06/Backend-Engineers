import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import SiteFooter from "@/modules/components/common/site-footer";
import type { BuildProject } from "@/data/build-projects";
import { getCanvasPreset } from "@/data/canvas-presets";
import type { TocEntry } from "@/lib/markdown";
import type { ReactNode } from "react";

type RelatedTopic = { slug: string; title: string; description: string };

type Props = {
  project: BuildProject;
  content: ReactNode;
  toc: TocEntry[];
  relatedTopics: RelatedTopic[];
  otherProjects: { slug: string; title: string; tagline: string; difficulty: string }[];
};

export default function BuildDetail({ project, content, toc, relatedTopics, otherProjects }: Props) {
  const canvasPreset = getCanvasPreset(project.slug);

  return (
    <main>
      <Navbar />
      <section className="px-5 pb-20 pt-28 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-10 xl:grid-cols-[minmax(0,680px)_190px] xl:justify-center xl:gap-14">
          <article className="min-w-0 pb-4">
            <header className="border-b border-black/15 pb-9">
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">
                <Link href="/build" className="text-[#ff4d00] hover:underline">
                  Build it
                </Link>
                <span>·</span>
                <span>{project.difficulty}</span>
                <span>·</span>
                <span>{project.timeEstimate}</span>
              </div>
              <h1 className="mt-4 text-balance text-4xl font-semibold leading-[.96] tracking-[-.06em] sm:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 text-lg text-[#ff4d00]">{project.tagline}</p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-black/60">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-black/15 bg-white/50 px-3 py-1 text-xs font-semibold text-black/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-7 rounded-2xl border border-black/15 bg-white/40 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">
                  What you&rsquo;ll actually build
                </p>
                <ul className="mt-3 grid gap-2">
                  {project.whatYoullBuild.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-black/65">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ff4d00]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {canvasPreset && (
                <Link
                  href={`/canvas?preset=${canvasPreset.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#ff4d00] hover:underline"
                >
                  See this as a system diagram <span>→</span>
                </Link>
              )}
            </header>

            <div className="article-copy">
              <section id="content" className="scroll-mt-28">
                <div className="prose-article">{content}</div>
              </section>

              <section id="related" className="scroll-mt-28 mt-16">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="article-kicker">Related lessons</p>
                    <h2>Worth reading before or after this.</h2>
                  </div>
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

              {otherProjects.length > 0 && (
                <section className="mt-16">
                  <p className="article-kicker">Build something else</p>
                  <h2>More projects.</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {otherProjects.map((other) => (
                      <Link
                        key={other.slug}
                        href={`/build/${other.slug}`}
                        className="group rounded-2xl border border-black/15 bg-white/40 p-5 transition hover:-translate-y-1 hover:bg-white"
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ff4d00]">
                          {other.difficulty}
                        </p>
                        <p className="mt-2 font-semibold tracking-tight text-black group-hover:underline">
                          {other.title}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-black/55">{other.tagline}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>

          {/* Right sidebar - table of contents */}
          <aside className="hidden xl:block">
            <div className="sidebar-scroll sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-black/10 pl-5 pb-6">
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
                <a
                  href="#related"
                  className="mt-3 border-t border-black/10 pt-3 py-1.5 text-[13px] font-medium text-black/55 transition hover:text-black"
                >
                  Related lessons
                </a>
              </nav>
            </div>
          </aside>
        </div>
      </section>
      <SiteFooter note="Backend engineering, cloud, and systems thinking in one place." />
    </main>
  );
}
