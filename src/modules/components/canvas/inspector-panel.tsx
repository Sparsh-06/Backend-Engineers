"use client";

import { getComponentTypeDef, TIER_LABELS } from "@/data/canvas-component-types";
import type { CanvasNodeTier } from "@/data/canvas-component-types";
import { getTechnologyDef } from "@/data/canvas-technologies";
import type { CanvasFlowNode, CanvasNodeData } from "@/lib/canvas/types";

type Props = {
  node: CanvasFlowNode | null;
  onChange: (id: string, patch: Partial<CanvasNodeData>) => void;
  onDelete: (id: string) => void;
};

const TIERS: CanvasNodeTier[] = ["small", "medium", "large"];

function pillClass(selected: boolean) {
  return `rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold transition ${
    selected ? "border-black bg-black text-[#EEE9E3]" : "border-black/15 text-black/55 hover:border-black/40"
  }`;
}

export default function InspectorPanel({ node, onChange, onDelete }: Props) {
  if (!node) {
    return (
      <div className="rounded-2xl border border-dashed border-black/20 bg-white/60 p-4 text-[13px] leading-relaxed text-black/45 backdrop-blur-md">
        Select a node to configure it.
      </div>
    );
  }

  const def = getComponentTypeDef(node.data.type);
  const selectedTechDef = getTechnologyDef(node.data.technology);

  return (
    <div className="rounded-2xl border border-black/15 bg-white/85 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.06)] backdrop-blur-md">
      <div className="flex items-center justify-between gap-2">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff4d00]">
          {def.label}
        </p>
        <button
          type="button"
          onClick={() => onDelete(node.id)}
          className="text-[11px] font-semibold text-black/40 transition hover:text-[#ff4d00]"
        >
          Delete
        </button>
      </div>

      <label className="mt-3 block">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
          Label
        </span>
        <input
          type="text"
          value={node.data.label ?? ""}
          placeholder={def.label}
          onChange={(event) => onChange(node.id, { label: event.target.value })}
          className="mt-1 w-full rounded-lg border border-black/15 bg-white/80 px-2.5 py-1.5 text-[13px] outline-none focus:border-black/40"
        />
      </label>

      {def.maxInstances > 1 && (
        <div className="mt-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
            Instances
          </span>
          <div className="mt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => onChange(node.id, { instances: Math.max(1, node.data.instances - 1) })}
              className="grid h-7 w-7 place-items-center rounded-lg border border-black/15 text-black/60 transition hover:bg-black/5"
              aria-label="Decrease instances"
            >
              −
            </button>
            <span className="w-6 text-center text-[13px] font-semibold">{node.data.instances}</span>
            <button
              type="button"
              onClick={() =>
                onChange(node.id, { instances: Math.min(def.maxInstances, node.data.instances + 1) })
              }
              className="grid h-7 w-7 place-items-center rounded-lg border border-black/15 text-black/60 transition hover:bg-black/5"
              aria-label="Increase instances"
            >
              +
            </button>
          </div>
        </div>
      )}

      <div className="mt-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
          Tier
        </span>
        <div className="mt-1 flex gap-1.5">
          {TIERS.map((tier) => (
            <button
              key={tier}
              type="button"
              onClick={() => onChange(node.id, { tier })}
              className={`flex-1 ${pillClass(node.data.tier === tier)}`}
            >
              {TIER_LABELS[tier]}
            </button>
          ))}
        </div>
      </div>

      {def.technologies.length > 0 && (
        <div className="mt-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
            Technology
          </span>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => onChange(node.id, { technology: undefined })}
              className={pillClass(!node.data.technology)}
            >
              Generic
            </button>
            {def.technologies.map((tech) => (
              <button
                key={tech.id}
                type="button"
                onClick={() => onChange(node.id, { technology: tech.id })}
                className={pillClass(node.data.technology === tech.id)}
              >
                {tech.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedTechDef && (
        <div className="mt-3 rounded-lg bg-black/3 p-2.5">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-black/40">
            {selectedTechDef.label} notes
          </p>
          <ul className="mt-1 space-y-1">
            {selectedTechDef.tips.map((tip) => (
              <li key={tip} className="text-[11px] leading-relaxed text-black/60">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {def.supportsHitRatio && (
        <label className="mt-3 block">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
            Hit ratio - {Math.round((node.data.hitRatio ?? def.defaultHitRatio ?? 0) * 100)}%
          </span>
          <input
            type="range"
            min={0}
            max={95}
            step={5}
            value={Math.round((node.data.hitRatio ?? def.defaultHitRatio ?? 0) * 100)}
            onChange={(event) => onChange(node.id, { hitRatio: Number(event.target.value) / 100 })}
            className="mt-1.5 w-full accent-[#ff4d00]"
          />
        </label>
      )}

      <p className="mt-3 border-t border-black/10 pt-3 text-[11px] leading-relaxed text-black/45">
        {def.description}
      </p>
    </div>
  );
}
