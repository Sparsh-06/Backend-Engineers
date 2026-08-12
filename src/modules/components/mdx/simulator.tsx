"use client";

import { useState } from "react";

export type SimulatorReadout = {
  label: string;
  value: string;
  /** Drives the readout colour, so degradation is visible at a glance. */
  status?: "good" | "warn" | "bad";
};

export type SimulatorStep = {
  /** Shown next to the input label at this position, e.g. "50 req/s". */
  value: string;
  readouts: SimulatorReadout[];
  note: string;
};

type Props = {
  title: string;
  description?: string;
  label: string;
  steps: SimulatorStep[];
};

const STATUS_STYLES: Record<string, string> = {
  good: "border-black/15 text-black",
  warn: "border-[#ff4d00]/40 text-[#ff4d00]",
  bad: "border-[#ff4d00] bg-[#ff4d00]/10 text-[#ff4d00]",
};

export default function Simulator({ title, description, label, steps }: Props) {
  const [index, setIndex] = useState(0);

  // Render nothing rather than breaking the page if a lesson omits `steps`.
  const safeSteps = Array.isArray(steps) ? steps : [];
  const step = safeSteps[index];
  const max = safeSteps.length - 1;

  if (!step) return null;

  return (
    <figure className="my-10 rounded-2xl border border-black/15 bg-white/40 p-6">
      <figcaption>
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff4d00]">
          Try it
        </p>
        <p className="mt-1.5 text-lg font-semibold tracking-tight text-black">{title}</p>
        {description && (
          <p className="mt-1.5 text-sm leading-relaxed text-black/60">{description}</p>
        )}
      </figcaption>

      <div className="mt-6">
        <div className="flex items-baseline justify-between gap-3">
          <label
            htmlFor={`sim-${title.replace(/\W+/g, "-").toLowerCase()}`}
            className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-black/45"
          >
            {label}
          </label>
          <span className="font-mono text-sm font-semibold text-black">{step.value}</span>
        </div>

        <input
          id={`sim-${title.replace(/\W+/g, "-").toLowerCase()}`}
          type="range"
          min={0}
          max={max}
          step={1}
          value={index}
          onChange={(event) => setIndex(Number(event.target.value))}
          className="mt-2 w-full accent-[#ff4d00]"
        />

        <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-black/30">
          <span>{safeSteps[0].value}</span>
          <span>{safeSteps[max].value}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
        {step.readouts.map((readout) => (
          <div
            key={readout.label}
            className={`rounded-xl border bg-white/60 px-4 py-3 transition-colors ${
              STATUS_STYLES[readout.status ?? "good"]
            }`}
          >
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] opacity-60">
              {readout.label}
            </p>
            <p className="mt-1 text-lg font-semibold tracking-tight">{readout.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-5 border-t border-black/10 pt-4 text-sm leading-relaxed text-black/65">
        {step.note}
      </p>
    </figure>
  );
}
