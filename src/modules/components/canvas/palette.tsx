"use client";

import { canvasComponentTypes, getComponentTypeDef, type CanvasComponentType } from "@/data/canvas-component-types";
import { CANVAS_TYPE_COLORS } from "@/data/canvas-colors";
import { CANVAS_NODE_ICONS } from "./node-icons";

export const CANVAS_DND_MIME = "application/canvas-node-type";

type Props = {
  onAdd: (type: CanvasComponentType) => void;
};

export default function CanvasPalette({ onAdd }: Props) {
  return (
    <div className="rounded-2xl border border-black/15 bg-white/85 p-3 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.06)] backdrop-blur-md">
      <p className="px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
        Components
      </p>
      <div className="mt-2 grid gap-1.5">
        {canvasComponentTypes.map((def) => {
          const Icon = CANVAS_NODE_ICONS[def.type];
          const color = CANVAS_TYPE_COLORS[def.type];
          return (
            <button
              key={def.type}
              type="button"
              draggable
              onDragStart={(event) => {
                event.dataTransfer.setData(CANVAS_DND_MIME, def.type);
                event.dataTransfer.effectAllowed = "move";
              }}
              onClick={() => onAdd(def.type)}
              title={def.description}
              className="flex cursor-grab items-center gap-2.5 rounded-xl border border-transparent px-2.5 py-2 text-left transition hover:border-black/15 hover:bg-black/5 active:cursor-grabbing"
            >
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-lg"
                style={{ backgroundColor: `${color}1A`, color }}
              >
                <Icon />
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-semibold text-black/80">{def.label}</span>
                <span className="mt-0.5 block truncate text-[10px] leading-snug text-black/40">
                  {def.validTargets.length > 0
                    ? `→ ${def.validTargets.map((t) => getComponentTypeDef(t).shortLabel).join(", ")}`
                    : "Terminal - no outgoing connections"}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 px-1 text-[11px] leading-relaxed text-black/45">
        Drag onto the canvas, or click to add.
      </p>
    </div>
  );
}
