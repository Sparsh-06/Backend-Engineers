"use client";

import { useState } from "react";
import type {
  ComparisonVisual,
  MemoryMapVisual,
  RequestFlowVisual,
  TimelineVisual,
} from "@/data/topics";
import type { VisualDraft } from "@/lib/dev-authoring/types";
import MemoryMapEditor from "./memory-map-editor";
import RequestFlowEditor from "./request-flow-editor";
import ComparisonEditor from "./comparison-editor";
import TimelineEditor from "./timeline-editor";

type VisualType = VisualDraft["type"];

const VISUAL_TYPES: { value: VisualType; label: string }[] = [
  { value: "memory-map", label: "Memory map" },
  { value: "request-flow", label: "Request flow" },
  { value: "comparison", label: "Comparison" },
  { value: "timeline", label: "Timeline" },
];

function emptyDraft(type: VisualType): VisualDraft {
  switch (type) {
    case "memory-map":
      return { type, title: "", description: "", items: [] } satisfies MemoryMapVisual;
    case "request-flow":
      return {
        type,
        title: "",
        description: "",
        sourceId: "",
        nodes: [],
        defaultPath: [],
        activePath: [],
        hint: "",
        detail: "",
      } satisfies RequestFlowVisual;
    case "comparison":
      return {
        type,
        title: "",
        description: "",
        left: { label: "", summary: "", points: [] },
        right: { label: "", summary: "", points: [] },
      } satisfies ComparisonVisual;
    case "timeline":
      return { type, title: "", description: "", steps: [] } satisfies TimelineVisual;
  }
}

function VisualEditor({ draft, onChange }: { draft: VisualDraft; onChange: (v: VisualDraft) => void }) {
  if (draft.type === "memory-map") return <MemoryMapEditor value={draft} onChange={onChange} />;
  if (draft.type === "request-flow") return <RequestFlowEditor value={draft} onChange={onChange} />;
  if (draft.type === "comparison") return <ComparisonEditor value={draft} onChange={onChange} />;
  return <TimelineEditor value={draft} onChange={onChange} />;
}

type Props = {
  heroVisual: VisualDraft | null;
  onHeroChange: (v: VisualDraft | null) => void;
  poolVisuals: (VisualDraft & { id: string })[];
  onPoolChange: (visuals: (VisualDraft & { id: string })[]) => void;
};

export default function VisualPicker({ heroVisual, onHeroChange, poolVisuals, onPoolChange }: Props) {
  const [newPoolId, setNewPoolId] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold">Hero visual (optional)</label>
          <select
            className="rounded-md border border-black/20 px-2 py-1 text-xs"
            value={heroVisual?.type ?? ""}
            onChange={(e) => onHeroChange(e.target.value ? emptyDraft(e.target.value as VisualType) : null)}
          >
            <option value="">None</option>
            {VISUAL_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        {heroVisual && (
          <div className="mt-3">
            <VisualEditor draft={heroVisual} onChange={onHeroChange} />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold">Pool visuals (inline, referenced via &lt;Visual id /&gt;)</label>
        <div className="mt-2 space-y-4">
          {poolVisuals.map((visual, index) => (
            <div key={visual.id || index} className="rounded-md border border-black/15 p-3">
              <div className="mb-2 flex items-center justify-between">
                <code className="text-xs text-black/50">id: {visual.id}</code>
                <button
                  type="button"
                  className="text-xs text-black/40 hover:text-red-600"
                  onClick={() => onPoolChange(poolVisuals.filter((_, i) => i !== index))}
                >
                  remove
                </button>
              </div>
              <VisualEditor
                draft={visual}
                onChange={(updated) => {
                  const next = poolVisuals.slice();
                  next[index] = { ...updated, id: visual.id };
                  onPoolChange(next);
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            className="rounded-md border border-black/20 px-2 py-1 text-xs font-mono"
            placeholder="new-visual-id"
            value={newPoolId}
            onChange={(e) => setNewPoolId(e.target.value)}
          />
          <select
            className="rounded-md border border-black/20 px-2 py-1 text-xs"
            value=""
            onChange={(e) => {
              const type = e.target.value as VisualType;
              if (!type || !newPoolId.trim()) return;
              onPoolChange([...poolVisuals, { ...emptyDraft(type), id: newPoolId.trim() }]);
              setNewPoolId("");
            }}
          >
            <option value="">+ add pool visual (type)</option>
            {VISUAL_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
