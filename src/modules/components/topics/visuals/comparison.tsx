"use client";

import { useState } from "react";
import type { ComparisonVisual } from "@/data/topics";

export default function Comparison({ visual }: { visual: ComparisonVisual }) {
  const [side, setSide] = useState<"left" | "right">("left");
  const active = visual[side];

  return (
    <div className="rounded-2xl border border-black/15 bg-white/40 p-6">
      <div
        className="grid grid-cols-2 overflow-hidden rounded-xl border border-black/15"
        role="tablist"
        aria-label={visual.title}
      >
        {(["left", "right"] as const).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={side === key}
            onClick={() => setSide(key)}
            className={`px-4 py-3 text-center text-sm font-semibold tracking-tight transition ${
              side === key
                ? "bg-black text-[#EEE9E3]"
                : "bg-transparent text-black/55 hover:bg-black/5"
            }`}
          >
            {visual[key].label}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-black/15 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#ff4d00]">
          {active.label}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-black/70">{active.summary}</p>
        <ul className="mt-4 grid gap-2">
          {active.points.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-black/60">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-black/40" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
