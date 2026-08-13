"use client";

import { canvasPresets } from "@/data/canvas-presets";

type Props = {
  onSelect: (slug: string) => void;
};

export default function PresetsGallery({ onSelect }: Props) {
  return (
    <div className="rounded-2xl border border-black/15 bg-white/85 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.06)] backdrop-blur-md">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
        Start from a preset
      </p>
      <div className="mt-3 grid gap-2.5">
        {canvasPresets.map((preset) => (
          <button
            key={preset.slug}
            type="button"
            onClick={() => onSelect(preset.slug)}
            className="rounded-xl border border-black/15 bg-white/70 p-3 text-left transition hover:border-black/40 hover:bg-white"
          >
            <p className="text-[13px] font-semibold text-black">{preset.title}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-black/55">{preset.tagline}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
