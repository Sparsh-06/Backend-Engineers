"use client";

import { useState } from "react";
import type { TechStackItem } from "@/data/architecture-profiles";

type Props = {
  company: string;
  techStack: TechStackItem[];
};

type Lane = {
  label: string;
  match: (category: string) => boolean;
};

const LANES: Lane[] = [
  {
    label: "Infrastructure",
    match: (c) => /cloud|provider|orchestration|container/i.test(c),
  },
  {
    label: "Edge & delivery",
    match: (c) => /gateway|cdn|protocol|delivery/i.test(c),
  },
  {
    label: "Services & language",
    match: (c) => /language|runtime|framework|library/i.test(c),
  },
  {
    label: "Data & messaging",
    match: (c) => /database|datastore|cache|streaming|state/i.test(c),
  },
  {
    label: "Patterns & tooling",
    match: (c) => /pattern|checker|tool/i.test(c),
  },
];

function laneFor(category: string): number {
  const index = LANES.findIndex((lane) => lane.match(category));
  return index === -1 ? 1 : index;
}

export default function StackMap({ company, techStack }: Props) {
  const [activeName, setActiveName] = useState(techStack[0]?.name ?? "");
  const active = techStack.find((item) => item.name === activeName) ?? techStack[0];

  const lanes = LANES.map((lane, index) => ({
    ...lane,
    items: techStack.filter((item) => laneFor(item.category) === index),
  })).filter((lane) => lane.items.length > 0);

  return (
    <div className="rounded-2xl border border-black/15 bg-white/40 p-6">
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${lanes.length}, minmax(0, 1fr))` }}>
        {lanes.map((lane, laneIndex) => (
          <div key={lane.label} className="relative flex flex-col gap-2">
            <p className="text-center font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-black/40">
              {lane.label}
            </p>
            <div className="flex flex-1 flex-col justify-center gap-2">
              {lane.items.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveName(item.name)}
                  aria-pressed={active?.name === item.name}
                  className={`rounded-lg border px-2.5 py-2 text-left transition ${
                    active?.name === item.name
                      ? "border-black bg-black text-[#EEE9E3] shadow-md"
                      : "border-black/15 bg-white text-black/75 hover:border-[#ff4d00]/60 hover:bg-white"
                  }`}
                >
                  <span className="block truncate text-[11px] font-semibold leading-tight">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
            {laneIndex < lanes.length - 1 && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2.25 top-1/2 hidden -translate-y-1/2 font-mono text-xs text-black/20 sm:block"
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>

      {active && (
        <div className="mt-6 rounded-xl border border-black/15 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff4d00]">
              {active.category}
            </p>
            <span className="text-black/20">·</span>
            <p className="text-sm font-semibold text-black">{active.name}</p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-black/65">{active.whatItsFor}</p>
        </div>
      )}

      <p className="mt-4 text-center font-mono text-[9px] uppercase tracking-[0.14em] text-black/30">
        Click a piece of {company}&rsquo;s stack to see what it&rsquo;s for
      </p>
    </div>
  );
}
