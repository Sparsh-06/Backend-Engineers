"use client";

import { useState } from "react";
import type { TopicVisual } from "@/data/topics";

export default function InteractiveVisual({ visual }: { visual: TopicVisual }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = visual.items[activeIndex];

  if (visual.type !== "memory-map") return null;

  return (
    <figure className="my-10 border-y border-black/15 py-7" aria-labelledby="visual-title">
      <figcaption id="visual-title">
        <p className="article-kicker text-[#ff4d00]">Interactive example</p>
        <h2 className="!mb-2">{visual.title}</h2>
        <p className="!mb-5 max-w-xl text-sm leading-relaxed text-black/60">{visual.description}</p>
      </figcaption>
      <div className="grid gap-3 sm:grid-cols-3" role="tablist" aria-label="Memory examples">
        {visual.items.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={activeIndex === index} onClick={() => setActiveIndex(index)} className={`rounded-xl border px-4 py-3 text-left transition ${activeIndex === index ? "border-black bg-black text-[#EEE9E3]" : "border-black/15 bg-white/35 hover:border-black/35"}`}><span className="block font-mono text-xs">{item.label}</span><span className={`mt-1 block text-[10px] font-semibold uppercase tracking-[.15em] ${activeIndex === index ? "text-[#ff8051]" : "text-black/45"}`}>{item.location}</span></button>)}
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1.35fr]">
        <div className="rounded-xl border border-black/15 bg-[#f7f3ee] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-black/45">Likely home</p>
          <p className="mt-2 text-2xl font-semibold tracking-[-.04em]">{active.location === "stack" ? "The stack" : "The heap"}</p>
          <p className="mt-3 text-sm leading-relaxed text-black/60">{active.location === "stack" ? "Fast, short-lived space for work happening right now." : "Longer-lived space for values that other work still needs."}</p>
        </div>
        <div className="rounded-xl border border-black/15 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#ff4d00]">Why</p>
          <p className="mt-2 text-sm leading-relaxed text-black/70">{active.detail}</p>
        </div>
      </div>
    </figure>
  );
}
