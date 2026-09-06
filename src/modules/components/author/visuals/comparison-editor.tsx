"use client";

import Comparison from "@/modules/components/topics/visuals/comparison";
import type { ComparisonVisual } from "@/data/topics";

type Side = ComparisonVisual["left"];
type Draft = ComparisonVisual;

type Props = {
  value: Draft;
  onChange: (value: Draft) => void;
};

function SideEditor({
  label,
  side,
  onChange,
}: {
  label: string;
  side: Side;
  onChange: (side: Side) => void;
}) {
  return (
    <div className="rounded-md border border-black/15 p-3 space-y-2">
      <p className="text-xs font-semibold uppercase text-black/40">{label}</p>
      <input
        className="w-full rounded-md border border-black/20 px-2 py-1 text-sm"
        placeholder="Label"
        value={side.label}
        onChange={(e) => onChange({ ...side, label: e.target.value })}
      />
      <input
        className="w-full rounded-md border border-black/20 px-2 py-1 text-sm"
        placeholder="Summary"
        value={side.summary}
        onChange={(e) => onChange({ ...side, summary: e.target.value })}
      />
      <textarea
        className="w-full rounded-md border border-black/20 px-2 py-1 text-sm"
        rows={3}
        placeholder="Points, one per line"
        value={side.points.join("\n")}
        onChange={(e) => onChange({ ...side, points: e.target.value.split("\n") })}
      />
    </div>
  );
}

export default function ComparisonEditor({ value, onChange }: Props) {
  const previewReady = value.left.label && value.right.label;
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="space-y-3">
        <input
          className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
          placeholder="Visual title"
          value={value.title}
          onChange={(e) => onChange({ ...value, title: e.target.value })}
        />
        <textarea
          className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
          rows={2}
          placeholder="Visual description"
          value={value.description}
          onChange={(e) => onChange({ ...value, description: e.target.value })}
        />
        <SideEditor label="Left" side={value.left} onChange={(left) => onChange({ ...value, left })} />
        <SideEditor label="Right" side={value.right} onChange={(right) => onChange({ ...value, right })} />
      </div>
      <div className="rounded-md border border-dashed border-black/20 p-4">
        <p className="mb-2 text-xs font-semibold uppercase text-black/40">Live preview</p>
        {previewReady ? (
          <Comparison
            visual={{
              ...value,
              left: { ...value.left, points: value.left.points.filter(Boolean) },
              right: { ...value.right, points: value.right.points.filter(Boolean) },
            }}
          />
        ) : (
          <p className="text-sm text-black/40">Fill in both sides&rsquo; labels to preview.</p>
        )}
      </div>
    </div>
  );
}
