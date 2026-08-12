"use client";

import { useState } from "react";

export type WalkthroughStep = {
  /** Line numbers this step covers: "3", "3-7", or "1,4-6". 1-indexed. */
  lines: string;
  title: string;
  detail: string;
};

type Props = {
  code: string;
  steps: WalkthroughStep[];
  language?: string;
  title?: string;
};

/** Expands "1,4-6" into [1,4,5,6]. Ignores malformed segments rather than throwing. */
function parseLines(spec: string): number[] {
  const out: number[] = [];
  for (const part of spec.split(",")) {
    const segment = part.trim();
    if (!segment) continue;

    const range = segment.match(/^(\d+)\s*-\s*(\d+)$/);
    if (range) {
      const start = Number(range[1]);
      const end = Number(range[2]);
      for (let n = Math.min(start, end); n <= Math.max(start, end); n++) out.push(n);
      continue;
    }

    const single = Number(segment);
    if (Number.isInteger(single)) out.push(single);
  }
  return out;
}

export default function CodeWalkthrough({ code, steps, language, title }: Props) {
  const [active, setActive] = useState(0);

  // Render nothing rather than breaking the page if a lesson omits `code`.
  if (typeof code !== "string") return null;

  const lines = code.replace(/\n$/, "").split("\n");
  const safeSteps = Array.isArray(steps) ? steps : [];
  const step = safeSteps[active];
  const highlighted = new Set(step ? parseLines(step.lines) : []);

  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-black/15 bg-white/40">
      <figcaption className="flex flex-wrap items-center justify-between gap-2 border-b border-black/10 px-5 py-3">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff4d00]">
          {title ?? "Code walkthrough"}
        </p>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/35">
          {language ?? "js"}
        </span>
      </figcaption>

      <div className="sidebar-scroll overflow-x-auto bg-[#f7f3ee]">
        <pre className="min-w-full py-4 text-[13px] leading-relaxed">
          <code>
            {lines.map((line, i) => {
              const number = i + 1;
              const on = highlighted.has(number);
              return (
                <span
                  key={number}
                  className={`flex px-4 transition-colors ${
                    on ? "bg-[#ff4d00]/10" : ""
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mr-4 inline-block w-6 shrink-0 select-none text-right font-mono text-[11px] ${
                      on ? "text-[#ff4d00]" : "text-black/25"
                    }`}
                  >
                    {number}
                  </span>
                  <span
                    className={`whitespace-pre font-mono ${
                      on ? "text-black" : "text-black/45"
                    }`}
                  >
                    {line || " "}
                  </span>
                </span>
              );
            })}
          </code>
        </pre>
      </div>

      {step && (
        <div className="border-t border-black/10 px-5 py-4">
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Walkthrough steps">
            {safeSteps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                title={s.title}
                className={`h-6 min-w-6 rounded-full border px-2 font-mono text-[10px] font-semibold transition ${
                  i === active
                    ? "border-black bg-black text-[#EEE9E3]"
                    : "border-black/15 bg-white text-black/45 hover:border-black/40"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <p className="mt-3 text-sm font-semibold tracking-tight text-black">{step.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-black/65">{step.detail}</p>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              disabled={active === 0}
              onClick={() => setActive((i) => Math.max(0, i - 1))}
              className="text-xs font-semibold uppercase tracking-[.1em] text-black/55 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Previous
            </button>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/35">
              {active + 1} / {safeSteps.length}
            </span>
            <button
              type="button"
              disabled={active === safeSteps.length - 1}
              onClick={() => setActive((i) => Math.min(safeSteps.length - 1, i + 1))}
              className="text-xs font-semibold uppercase tracking-[.1em] text-black/55 transition hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </figure>
  );
}
