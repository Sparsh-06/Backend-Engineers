"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchInputInner() {
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
    router.replace(next ? `/topics?${next}` : "/topics", { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="mt-10 max-w-xl">
      <label htmlFor="topic-search" className="sr-only">
        Search topics
      </label>
      <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white/50 px-5 py-3 transition focus-within:border-[#ff4d00]/40 focus-within:bg-white">
        <span className="text-black/35" aria-hidden="true">
          ⌕
        </span>
        <input
          id="topic-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search topics - caching, event loop, sharding…"
          className="w-full bg-transparent text-sm text-black placeholder:text-black/40 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default function TopicSearchInput() {
  return (
    <Suspense fallback={<div className="mt-10 h-11.5 max-w-xl animate-pulse rounded-full bg-white/40" />}>
      <SearchInputInner />
    </Suspense>
  );
}
