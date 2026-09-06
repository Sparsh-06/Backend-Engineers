"use client";

import Timeline from "@/modules/components/topics/visuals/timeline";
import type { TimelineVisual } from "@/data/topics";

type Draft = TimelineVisual;

type Props = {
  value: Draft;
  onChange: (value: Draft) => void;
};

export default function TimelineEditor({ value, onChange }: Props) {
  function updateStep(index: number, patch: Partial<Draft["steps"][number]>) {
    const steps = value.steps.slice();
    steps[index] = { ...steps[index], ...patch };
    onChange({ ...value, steps });
  }

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
        {value.steps.map((step, index) => (
          <div key={index} className="rounded-md border border-black/15 p-3 space-y-2">
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-md border border-black/20 px-2 py-1 text-sm"
                placeholder="Label"
                value={step.label}
                onChange={(e) => updateStep(index, { label: e.target.value })}
              />
              <button
                type="button"
                onClick={() => onChange({ ...value, steps: value.steps.filter((_, i) => i !== index) })}
                className="text-black/40 hover:text-red-600"
              >
                remove
              </button>
            </div>
            <textarea
              className="w-full rounded-md border border-black/20 px-2 py-1 text-sm"
              rows={2}
              placeholder="Detail"
              value={step.detail}
              onChange={(e) => updateStep(index, { detail: e.target.value })}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange({ ...value, steps: [...value.steps, { label: "", detail: "" }] })}
          className="text-xs font-semibold text-black/60 hover:text-black"
        >
          + add step
        </button>
      </div>
      <div className="rounded-md border border-dashed border-black/20 p-4">
        <p className="mb-2 text-xs font-semibold uppercase text-black/40">Live preview</p>
        {value.steps.length > 0 && value.steps.every((s) => s.label) ? (
          <Timeline visual={value} />
        ) : (
          <p className="text-sm text-black/40">Add at least one labeled step to preview.</p>
        )}
      </div>
    </div>
  );
}
