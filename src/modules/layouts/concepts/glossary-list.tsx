"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import type { GlossaryTerm } from "@/data/glossary";

function groupByLetter(terms: GlossaryTerm[]) {
  const groups = new Map<string, GlossaryTerm[]>();
  for (const term of terms) {
    const letter = term.term[0].toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(term);
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function GlossaryInner({ terms }: { terms: GlossaryTerm[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    const next = params.toString();
    router.replace(next ? `/concepts?${next}` : "/concepts", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? terms.filter(
        (t) =>
          t.term.toLowerCase().includes(normalized) ||
          t.definition.toLowerCase().includes(normalized),
      )
    : terms;

  const groups = groupByLetter(filtered);

  return (
    <>
      <div className="mt-10 max-w-xl">
        <label htmlFor="glossary-search" className="sr-only">
          Search the glossary
        </label>
        <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white/50 px-5 py-3 transition focus-within:border-[#ff4d00]/40 focus-within:bg-white">
          <span className="text-black/35" aria-hidden="true">
            ⌕
          </span>
          <input
            id="glossary-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search terms - idempotency, sharding, p99…"
            className="w-full bg-transparent text-sm text-black placeholder:text-black/40 focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-sm text-black/45">
          No terms match &ldquo;{query}&rdquo; yet.
        </p>
      ) : (
        <div className="mt-14 grid gap-12">
          {groups.map(([letter, items]) => (
            <div key={letter}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
                {letter}
              </p>
              <div className="mt-5 grid gap-6 border-t border-black/15 pt-6 sm:grid-cols-2">
                {items.map((entry) => (
                  <div key={entry.slug} id={entry.slug} className="scroll-mt-28">
                    <h3 className="text-lg font-semibold tracking-tight text-black">
                      {entry.term}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-black/60">
                      {entry.definition}
                    </p>
                    {entry.relatedTopicSlug && (
                      <Link
                        href={`/topics/${entry.relatedTopicSlug}`}
                        className="mt-3 inline-block text-xs font-semibold text-[#ff4d00] underline decoration-[#ff4d00]/30 underline-offset-4 hover:decoration-[#ff4d00]"
                      >
                        Read the full lesson →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function GlossaryList({ terms }: { terms: GlossaryTerm[] }) {
  return (
    <Suspense fallback={<div className="mt-10 h-11.5 max-w-xl animate-pulse rounded-full bg-white/40" />}>
      <GlossaryInner terms={terms} />
    </Suspense>
  );
}
