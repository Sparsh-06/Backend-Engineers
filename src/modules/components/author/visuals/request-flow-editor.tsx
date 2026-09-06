"use client";

import RequestFlow from "@/modules/components/topics/visuals/request-flow";
import type { RequestFlowVisual } from "@/data/topics";

type Draft = RequestFlowVisual;

type Props = {
  value: Draft;
  onChange: (value: Draft) => void;
};

function PathBuilder({
  label,
  path,
  nodeIds,
  onChange,
}: {
  label: string;
  path: string[];
  nodeIds: string[];
  onChange: (path: string[]) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-black/60">{label}</p>
      <div className="mt-1 flex flex-wrap items-center gap-1.5">
        {path.map((id, index) => (
          <span key={index} className="flex items-center gap-1 rounded-full bg-black/5 px-2 py-0.5 text-xs">
            {id}
            <button type="button" onClick={() => onChange(path.filter((_, i) => i !== index))} className="text-black/40">
              ×
            </button>
          </span>
        ))}
        <select
          className="rounded-md border border-black/20 px-1.5 py-0.5 text-xs"
          value=""
          onChange={(e) => {
            if (e.target.value) onChange([...path, e.target.value]);
          }}
        >
          <option value="">+ add node</option>
          {nodeIds.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function RequestFlowEditor({ value, onChange }: Props) {
  const nodeIds = value.nodes.map((n) => n.id).filter(Boolean);

  function updateNode(index: number, patch: Partial<Draft["nodes"][number]>) {
    const nodes = value.nodes.slice();
    nodes[index] = { ...nodes[index], ...patch };
    onChange({ ...value, nodes });
  }

  const previewReady = value.nodes.length > 0 && value.nodes.every((n) => n.id && n.label) && value.sourceId;

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

        <p className="text-xs font-semibold text-black/60">
          Nodes (positions are within a 340×192 canvas)
        </p>
        {value.nodes.map((node, index) => (
          <div key={index} className="grid grid-cols-6 items-center gap-1.5 rounded-md border border-black/15 p-2">
            <input
              className="col-span-2 rounded-md border border-black/20 px-1.5 py-1 text-xs"
              placeholder="id"
              value={node.id}
              onChange={(e) => updateNode(index, { id: e.target.value })}
            />
            <input
              className="col-span-2 rounded-md border border-black/20 px-1.5 py-1 text-xs"
              placeholder="label"
              value={node.label}
              onChange={(e) => updateNode(index, { label: e.target.value })}
            />
            <input
              type="number"
              className="rounded-md border border-black/20 px-1.5 py-1 text-xs"
              placeholder="x"
              value={node.x}
              onChange={(e) => updateNode(index, { x: Number(e.target.value) })}
            />
            <input
              type="number"
              className="rounded-md border border-black/20 px-1.5 py-1 text-xs"
              placeholder="y"
              value={node.y}
              onChange={(e) => updateNode(index, { y: Number(e.target.value) })}
            />
            <label className="col-span-3 flex items-center gap-1 text-xs">
              <input
                type="checkbox"
                checked={Boolean(node.emphasis)}
                onChange={(e) => updateNode(index, { emphasis: e.target.checked })}
              />
              emphasis
            </label>
            <button
              type="button"
              className="col-span-3 text-right text-xs text-black/40 hover:text-red-600"
              onClick={() => onChange({ ...value, nodes: value.nodes.filter((_, i) => i !== index) })}
            >
              remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            onChange({ ...value, nodes: [...value.nodes, { id: "", label: "", x: 20, y: 20 }] })
          }
          className="text-xs font-semibold text-black/60 hover:text-black"
        >
          + add node
        </button>

        <div>
          <label className="block text-xs font-semibold text-black/60">Source node id</label>
          <select
            className="mt-1 w-full rounded-md border border-black/20 px-2 py-1 text-sm"
            value={value.sourceId}
            onChange={(e) => onChange({ ...value, sourceId: e.target.value })}
          >
            <option value="">select a node</option>
            {nodeIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        <PathBuilder
          label="Default path (at rest)"
          path={value.defaultPath}
          nodeIds={nodeIds}
          onChange={(defaultPath) => onChange({ ...value, defaultPath })}
        />
        <PathBuilder
          label="Active path (on hover)"
          path={value.activePath}
          nodeIds={nodeIds}
          onChange={(activePath) => onChange({ ...value, activePath })}
        />

        <input
          className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
          placeholder="Hint text"
          value={value.hint}
          onChange={(e) => onChange({ ...value, hint: e.target.value })}
        />
        <textarea
          className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
          rows={2}
          placeholder="Detail text"
          value={value.detail}
          onChange={(e) => onChange({ ...value, detail: e.target.value })}
        />
      </div>
      <div className="rounded-md border border-dashed border-black/20 p-4">
        <p className="mb-2 text-xs font-semibold uppercase text-black/40">Live preview</p>
        {previewReady ? (
          <RequestFlow visual={value} />
        ) : (
          <p className="text-sm text-black/40">Add nodes (with ids + labels) and a source id to preview.</p>
        )}
      </div>
    </div>
  );
}
