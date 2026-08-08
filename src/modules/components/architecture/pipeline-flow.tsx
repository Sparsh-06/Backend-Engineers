"use client";

import { useState } from "react";
import type { PipelineStage } from "@/data/architecture-deep-dives";

type Props = {
  title: string;
  stages: PipelineStage[];
};

export default function PipelineFlow({ title, stages }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = stages[activeIndex];

  return (
    <div className="rounded-2xl border border-black/15 bg-white/40 p-6">
      <div className="flex items-stretch gap-1 overflow-x-auto pb-1" role="tablist" aria-label={title}>
        {stages.map((stage, index) => (
          <div key={stage.label} className="flex flex-1 items-center gap-1">
            <button
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              className={`flex min-w-[92px] flex-1 flex-col items-center gap-1 rounded-xl border px-3 py-3 text-center transition ${
                activeIndex === index
                  ? "border-black bg-black text-[#EEE9E3] shadow-md"
                  : "border-black/15 bg-white text-black/70 hover:border-[#ff4d00]/60"
              }`}
            >
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] opacity-60">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-[11px] font-semibold leading-tight">{stage.label}</span>
            </button>
            {index < stages.length - 1 && (
              <span
                aria-hidden="true"
                className={`hidden shrink-0 font-mono text-xs sm:block ${
                  index < activeIndex ? "text-[#ff4d00]" : "text-black/20"
                }`}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-black/15 p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff4d00]">
            Stage {activeIndex + 1} of {stages.length} · {active.label}
          </p>
          {active.stat && (
            <span className="rounded-full border border-black/15 bg-[#f7f3ee] px-2.5 py-1 font-mono text-[10px] font-semibold text-black/70">
              {active.stat}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-black/70">{active.detail}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          type="button"
          disabled={activeIndex === 0}
          onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}
          className="text-xs font-semibold uppercase tracking-[.1em] text-black/55 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Previous
        </button>
        <button
          type="button"
          disabled={activeIndex === stages.length - 1}
          onClick={() => setActiveIndex((index) => Math.min(stages.length - 1, index + 1))}
          className="text-xs font-semibold uppercase tracking-[.1em] text-black/55 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
