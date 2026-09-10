"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  LEVEL_LABELS,
  type InterviewLevel,
  type InterviewQuestion,
} from "@/data/interview-questions";

type TopicMeta = {
  slug: string;
  title: string;
  phase: string;
  groupTitle: string;
};

const LEVELS: InterviewLevel[] = ["SDE1", "SDE2", "SDE3+"];

function QuestionBankInner({
  questions,
  topics,
}: {
  questions: InterviewQuestion[];
  topics: TopicMeta[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [activeLevel, setActiveLevel] = useState<InterviewLevel | "all">("all");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    const next = params.toString();
    router.replace(next ? `/interview-prep?${next}` : "/interview-prep", {
      scroll: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const topicBySlug = useMemo(() => {
    const map = new Map<string, TopicMeta>();
    for (const t of topics) map.set(t.slug, t);
    return map;
  }, [topics]);

  const normalized = query.trim().toLowerCase();

  const filtered = questions.filter((q) => {
    if (activeLevel !== "all" && q.level !== activeLevel) return false;
    if (!normalized) return true;
    const topic = topicBySlug.get(q.topicSlug);
    const haystack = `${q.question} ${topic?.title ?? ""}`.toLowerCase();
    return haystack.includes(normalized);
  });

  const grouped = useMemo(() => {
    const map = new Map<string, InterviewQuestion[]>();
    for (const q of filtered) {
      if (!map.has(q.topicSlug)) map.set(q.topicSlug, []);
      map.get(q.topicSlug)!.push(q);
    }
    return [...map.entries()]
      .map(([slug, qs]) => ({ topic: topicBySlug.get(slug), questions: qs }))
      .filter((g): g is { topic: TopicMeta; questions: InterviewQuestion[] } => !!g.topic);
  }, [filtered, topicBySlug]);

  return (
    <>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl flex-1">
          <label htmlFor="interview-search" className="sr-only">
            Search interview questions
          </label>
          <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white/50 px-5 py-3 transition focus-within:border-[#ff4d00]/40 focus-within:bg-white">
            <span className="text-black/35" aria-hidden="true">
              ⌕
            </span>
            <input
              id="interview-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions - rate limiting, LRU cache…"
              className="w-full bg-transparent text-sm text-black placeholder:text-black/40 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", ...LEVELS] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setActiveLevel(level)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                activeLevel === level
                  ? "border-black bg-black text-[#EEE9E3]"
                  : "border-black/15 bg-white/40 text-black/60 hover:border-black/30 hover:text-black"
              }`}
            >
              {level === "all" ? "All levels" : LEVEL_LABELS[level]}
            </button>
          ))}
        </div>
      </div>

      {grouped.length === 0 ? (
        <p className="mt-16 text-sm text-black/45">
          No questions match &ldquo;{query}&rdquo; yet.
        </p>
      ) : (
        <div className="mt-14 grid gap-14">
          {grouped.map(({ topic, questions: qs }) => (
            <div key={topic.slug} id={topic.slug} className="scroll-mt-28">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
                {topic.phase} · {topic.groupTitle}
              </p>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-3 border-b border-black/15 pb-4">
                <h2 className="text-2xl font-semibold tracking-tight text-black">
                  {topic.title}
                </h2>
                <Link
                  href={`/topics/${topic.slug}`}
                  className="text-xs font-semibold text-black/55 underline decoration-black/25 underline-offset-4 hover:text-black hover:decoration-black"
                >
                  Read the full lesson →
                </Link>
              </div>
              <div className="mt-6 grid gap-4">
                {qs.map((q) => (
                  <details
                    key={q.id}
                    className="group rounded-3xl border border-black/12 bg-white/40 px-6 py-5 open:bg-white"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                      <span className="flex-1 text-sm font-semibold leading-relaxed text-black sm:text-base">
                        {q.question}
                      </span>
                      <span className="mt-0.5 shrink-0 rounded-full border border-black/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-black/55">
                        {LEVEL_LABELS[q.level]}
                      </span>
                    </summary>
                    <p className="mt-4 border-t border-black/10 pt-4 text-sm leading-relaxed text-black/65">
                      {q.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function QuestionBank({
  questions,
  topics,
}: {
  questions: InterviewQuestion[];
  topics: TopicMeta[];
}) {
  return (
    <Suspense
      fallback={
        <div className="mt-10 h-11.5 max-w-xl animate-pulse rounded-full bg-white/40" />
      }
    >
      <QuestionBankInner questions={questions} topics={topics} />
    </Suspense>
  );
}
