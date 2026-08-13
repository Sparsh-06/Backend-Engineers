"use client";

import { getComponentTypeDef } from "@/data/canvas-component-types";
import { CANVAS_TYPE_COLORS } from "@/data/canvas-colors";
import { STATUS_STYLES } from "@/modules/components/shared/status-styles";
import { TRAFFIC_STEPS_RPS } from "@/lib/canvas/simulation";
import type { CanvasFlowNode, CanvasSimulationResult } from "@/lib/canvas/types";

type Props = {
  trafficIndex: number;
  onTrafficIndexChange: (index: number) => void;
  simulation: CanvasSimulationResult;
  nodes: CanvasFlowNode[];
};

function formatRps(rps: number) {
  return rps >= 1000 ? `${(rps / 1000).toFixed(rps % 1000 === 0 ? 0 : 1)}k req/s` : `${rps} req/s`;
}

export default function SimulationPanel({ trafficIndex, onTrafficIndexChange, simulation, nodes }: Props) {
  const max = TRAFFIC_STEPS_RPS.length - 1;
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const shortLabelFor = (id: string) => {
    const node = nodeById.get(id);
    return node ? getComponentTypeDef(node.data.type).shortLabel : "?";
  };

  return (
    <div className="rounded-2xl border border-black/15 bg-white/85 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.06)] backdrop-blur-md">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#ff4d00]">
        Simulate load
      </p>

      <div className="mt-3">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
            Traffic
          </span>
          <span className="font-mono text-sm font-semibold text-black">
            {formatRps(TRAFFIC_STEPS_RPS[trafficIndex])}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={max}
          step={1}
          value={trafficIndex}
          onChange={(event) => onTrafficIndexChange(Number(event.target.value))}
          className="mt-2 w-full accent-[#ff4d00]"
        />
        <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.1em] text-black/30">
          <span>{formatRps(TRAFFIC_STEPS_RPS[0])}</span>
          <span>{formatRps(TRAFFIC_STEPS_RPS[max])}</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <div
          className={`rounded-xl border bg-white/60 px-3 py-2.5 transition-colors ${STATUS_STYLES[simulation.overallStatus]}`}
        >
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] opacity-60">
            Bottlenecks
          </p>
          <p className="mt-0.5 text-lg font-semibold tracking-tight">{simulation.bottleneckNodeIds.length}</p>
        </div>
        <div
          className={`rounded-xl border bg-white/60 px-3 py-2.5 transition-colors ${
            simulation.spofNodeIds.length > 0 ? STATUS_STYLES.warn : STATUS_STYLES.good
          }`}
        >
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] opacity-60">
            Single points of failure
          </p>
          <p className="mt-0.5 text-lg font-semibold tracking-tight">{simulation.spofNodeIds.length}</p>
        </div>
      </div>

      <p className="mt-3 border-t border-black/10 pt-3 text-[12px] leading-relaxed text-black/60">
        {simulation.summary}
      </p>

      <div className="mt-4 border-t border-black/10 pt-4">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">
          Estimates
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2.5">
          <div className="rounded-xl border border-black/10 bg-white/60 px-3 py-2.5">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-black/40">
              Est. monthly cost
            </p>
            <p className="mt-0.5 text-lg font-semibold tracking-tight">
              ${simulation.estimatedMonthlyCost.toLocaleString()}
            </p>
            <p className="mt-0.5 text-[10px] leading-snug text-black/35">Illustrative, not a cost calculator.</p>
          </div>
          <div className="rounded-xl border border-black/10 bg-white/60 px-3 py-2.5">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-black/40">
              Est. latency
            </p>
            <p className="mt-0.5 text-lg font-semibold tracking-tight">
              {Math.round(simulation.estimatedLatencyMs)}ms
            </p>
            <p className="mt-0.5 truncate text-[10px] leading-snug text-black/35">
              {simulation.latencyCriticalPath.length > 0
                ? simulation.latencyCriticalPath.map(shortLabelFor).join(" → ")
                : "-"}
            </p>
          </div>
        </div>

        {simulation.consistencyNotes.length > 0 && (
          <div className="mt-2.5 space-y-1.5">
            {simulation.consistencyNotes.map((note) => (
              <div key={`${note.nodeId}-${note.message}`} className="flex gap-2 rounded-lg bg-black/3 px-2.5 py-2">
                <span
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: CANVAS_TYPE_COLORS[nodeById.get(note.nodeId)?.data.type ?? "client"] }}
                />
                <p className="text-[11px] leading-relaxed text-black/60">{note.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
