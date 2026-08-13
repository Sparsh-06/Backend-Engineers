"use client";

import { Handle, Position, useConnection, type NodeProps } from "@xyflow/react";
import { getComponentTypeDef, isValidCanvasConnection, TIER_LABELS } from "@/data/canvas-component-types";
import { getTechnologyDef } from "@/data/canvas-technologies";
import { CANVAS_TYPE_COLORS } from "@/data/canvas-colors";
import type { CanvasFlowNode, CapacityStatus } from "@/lib/canvas/types";
import { CANVAS_NODE_ICONS } from "./node-icons";

const STATUS_BAR_COLOR: Record<CapacityStatus, string> = {
  good: "transparent",
  warn: "rgba(255,77,0,0.5)",
  bad: "#ff4d00",
};

export default function CanvasNode({ id, data, selected }: NodeProps<CanvasFlowNode>) {
  const def = getComponentTypeDef(data.type);
  const Icon = CANVAS_NODE_ICONS[data.type];
  const techDef = getTechnologyDef(data.technology);
  const color = CANVAS_TYPE_COLORS[data.type];
  const sim = data.simResult;
  const hasTarget = data.type !== "client";
  const hasSource = def.validTargets.length > 0;

  const connection = useConnection<CanvasFlowNode>();
  const isSourceOfDrag = connection.fromNode?.id === id;
  const wouldBeValidTarget =
    connection.inProgress && !isSourceOfDrag && connection.fromNode
      ? isValidCanvasConnection(connection.fromNode.data.type, data.type)
      : false;
  const shouldDim = connection.inProgress && !isSourceOfDrag && !wouldBeValidTarget;

  return (
    <div className="relative">
      {sim?.isSpof && (
        <span className="absolute -top-2.5 -right-2.5 z-10 rounded-full border border-[#ff4d00] bg-[#EEE9E3] px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-[0.1em] text-[#ff4d00]">
          SPOF
        </span>
      )}
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Left}
          className={`!border-0 !transition-all ${
            wouldBeValidTarget
              ? "!h-3.5 !w-3.5"
              : shouldDim
                ? "!h-2.5 !w-2.5 !bg-black/15"
                : "!h-2.5 !w-2.5 !bg-black/40 hover:!bg-[#ff4d00]"
          }`}
          style={wouldBeValidTarget ? { backgroundColor: color } : undefined}
        />
      )}

      <div
        className={`relative w-[184px] overflow-hidden rounded-xl border border-black/10 bg-white px-3.5 pt-4 pb-3 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.05)] transition-all ${
          selected ? "outline outline-2 outline-offset-2 outline-black" : ""
        } ${shouldDim ? "opacity-40 grayscale-[0.3]" : ""} ${
          wouldBeValidTarget ? "outline outline-2 outline-offset-2" : ""
        }`}
        style={wouldBeValidTarget ? { outlineColor: color } : undefined}
      >
        <span
          className="absolute inset-x-0 top-0 h-[3px]"
          style={{ backgroundColor: STATUS_BAR_COLOR[sim?.status ?? "good"] }}
        />

        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-1.5">
            <span
              className="grid h-6 w-6 shrink-0 place-items-center rounded-md"
              style={{ backgroundColor: `${color}1A`, color }}
            >
              <Icon />
            </span>
            <span className="truncate font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-black/45">
              {def.shortLabel}
            </span>
          </div>
          {def.maxInstances > 1 && (
            <span className="shrink-0 rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-black/55">
              ×{data.instances}
            </span>
          )}
        </div>

        <div className="my-2 border-t border-black/8" />

        <p className="text-[13px] font-semibold leading-snug tracking-tight text-black">
          {data.label || def.label}
        </p>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-black/40">
          <span>{TIER_LABELS[data.tier]}</span>
          {techDef && (
            <>
              <span>·</span>
              <span>{techDef.label}</span>
            </>
          )}
          {def.supportsHitRatio && typeof data.hitRatio === "number" && (
            <>
              <span>·</span>
              <span>{Math.round(data.hitRatio * 100)}% hit</span>
            </>
          )}
        </div>

        {sim && def.isCapacityBearing && (
          <p className="mt-2 border-t border-black/10 pt-2 font-mono text-[10px] font-semibold tracking-tight">
            {Math.round(sim.utilization * 100)}% utilized
          </p>
        )}
      </div>

      {hasSource && <Handle type="source" position={Position.Right} className="!h-2.5 !w-2.5 !rounded-full !border-0 !bg-black/40 hover:!bg-[#ff4d00]" />}
    </div>
  );
}
