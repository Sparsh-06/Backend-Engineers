"use client";

import MemoryMap from "@/modules/components/topics/visuals/memory-map";
import type { MemoryMapVisual } from "@/data/topics";

type Draft = Omit<MemoryMapVisual, "type"> & { type: "memory-map" };

type Props = {
  value: Draft;
  onChange: (value: Draft) => void;
};

export default function MemoryMapEditor({ value, onChange }: Props) {
  function updateItem(index: number, patch: Partial<Draft["items"][number]>) {
    const items = value.items.slice();
    items[index] = { ...items[index], ...patch };
    onChange({ ...value, items });
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
        {value.items.map((item, index) => (
          <div key={index} className="rounded-md border border-black/15 p-3 space-y-2">
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-md border border-black/20 px-2 py-1 text-sm"
                placeholder="Label"
                value={item.label}
                onChange={(e) => updateItem(index, { label: e.target.value })}
              />
              <select
                className="rounded-md border border-black/20 px-2 py-1 text-sm"
                value={item.location}
                onChange={(e) => updateItem(index, { location: e.target.value as "stack" | "heap" })}
              >
                <option value="stack">stack</option>
                <option value="heap">heap</option>
              </select>
              <button
                type="button"
                onClick={() => onChange({ ...value, items: value.items.filter((_, i) => i !== index) })}
                className="text-black/40 hover:text-red-600"
              >
                remove
              </button>
            </div>
            <textarea
              className="w-full rounded-md border border-black/20 px-2 py-1 text-sm"
              rows={2}
              placeholder="Detail"
              value={item.detail}
              onChange={(e) => updateItem(index, { detail: e.target.value })}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange({ ...value, items: [...value.items, { label: "", location: "stack", detail: "" }] })
          }
          className="text-xs font-semibold text-black/60 hover:text-black"
        >
          + add item
        </button>
      </div>
      <div className="rounded-md border border-dashed border-black/20 p-4">
        <p className="mb-2 text-xs font-semibold uppercase text-black/40">Live preview</p>
        {value.items.length > 0 && value.items.every((i) => i.label) ? (
          <MemoryMap visual={value} />
        ) : (
          <p className="text-sm text-black/40">Add at least one labeled item to preview.</p>
        )}
      </div>
    </div>
  );
}
