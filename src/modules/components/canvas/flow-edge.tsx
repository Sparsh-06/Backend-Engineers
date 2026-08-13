"use client";

import { BaseEdge, getSmoothStepPath, type EdgeProps } from "@xyflow/react";
import type { CanvasFlowEdge } from "@/lib/canvas/types";

export default function CanvasEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  data,
}: EdgeProps<CanvasFlowEdge>) {
  const [path] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 12,
  });

  const isBad = data?.targetStatus === "bad";

  return (
    <BaseEdge
      path={path}
      markerEnd={markerEnd}
      style={{
        stroke: isBad ? "#ff4d00" : "rgba(0,0,0,0.18)",
        strokeWidth: isBad ? 2 : 1.5,
        strokeDasharray: isBad ? "6 4" : undefined,
        animation: isBad ? "canvas-edge-flow 0.6s linear infinite" : undefined,
      }}
    />
  );
}
