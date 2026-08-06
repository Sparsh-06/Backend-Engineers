"use client";

import { useState } from "react";
import type { TimelineVisual } from "@/data/topics";

export default function Timeline({ visual }: { visual: TimelineVisual }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = visual.steps[activeIndex];
  const isFirst = activeIndex === 0;
  const isLast = activeIndex === visual.steps.length - 1;

  return (
    <div className="rounded-2xl border border-black/15 bg-white/40 p-6">
      <ol className="flex items-center gap-1" aria-label={visual.title}>
        {visual.steps.map((step, index) => (
          <li key={step.label} className="flex flex-1 items-center gap-1 last:flex-none">
            <button
              type="button"
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] font-semibold transition ${
                index === activeIndex
                  ? "border-black bg-black text-[#EEE9E3]"
                  : index < activeIndex
                    ? "border-black/30 bg-black/10 text-black/60"
                    : "border-black/15 bg-white text-black/40 hover:border-black/35"
              }`}
            >
              {index + 1}
            </button>
            {index < visual.steps.length - 1 && (
              <span
                className={`h-px flex-1 transition-colors ${
                  index < activeIndex ? "bg-black/30" : "bg-black/10"
                }`}
              />
            )}
          </li>
        ))}
      </ol>

      <div className="mt-5 rounded-xl border border-black/15 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#ff4d00]">
          Step {activeIndex + 1} of {visual.steps.length}
        </p>
        <p className="mt-2 text-lg font-semibold tracking-[-.02em]">{active.label}</p>
        <p className="mt-3 text-sm leading-relaxed text-black/65">{active.detail}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          disabled={isFirst}
          onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
          className="text-xs font-semibold uppercase tracking-[.1em] text-black/55 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Previous
        </button>
        <button
          type="button"
          disabled={isLast}
          onClick={() => setActiveIndex((index) => Math.min(visual.steps.length - 1, index + 1))}
          className="text-xs font-semibold uppercase tracking-[.1em] text-black/55 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
