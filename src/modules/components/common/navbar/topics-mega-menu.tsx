"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { topicGroups } from "@/data/topics";

const groupSummaries = topicGroups.map((group) => ({
  slug: group.slug,
  title: group.title,
  count: group.topics.length,
  phase: group.topics[0]?.phase ?? "",
}));

export default function TopicsMegaMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function hide() {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide}>
      <Link
        href="/topics"
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-black/60 transition hover:text-black"
        onClick={() => setOpen(false)}
      >
        Topics
        <svg
          viewBox="0 0 12 12"
          width="9"
          height="9"
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <div
        className={`absolute left-1/2 top-full z-50 w-lg -translate-x-1/2 pt-3 transition-all duration-200 ease-out ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        }`}
      >
        <div className="rounded-2xl border border-black/10 bg-[#EEE9E3] p-2 shadow-xl">
          <div className="grid grid-cols-2 gap-1">
            {groupSummaries.map((group) => (
              <Link
                key={group.slug}
                href={`/topics#${group.slug}`}
                onClick={() => setOpen(false)}
                className="group rounded-xl px-3 py-2.5 transition hover:bg-black/5"
              >
                <p className="text-sm font-semibold leading-snug text-black">{group.title}</p>
                <p className="mt-0.5 text-[11px] font-medium text-black/40">
                  {group.phase} · {group.count} lessons
                </p>
              </Link>
            ))}
          </div>
          <Link
            href="/topics"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center justify-between rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-[#EEE9E3] transition hover:bg-[#ff4d00]"
          >
            See the full curriculum map
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
