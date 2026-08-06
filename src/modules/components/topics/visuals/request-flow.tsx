"use client";

import type { RequestFlowVisual, RequestFlowNode } from "@/data/topics";

function pathFor(nodes: Map<string, RequestFlowNode>, ids: string[]): string {
  return ids
    .map((id, index) => {
      const node = nodes.get(id);
      if (!node) return "";
      return `${index === 0 ? "M" : "L"} ${node.x} ${node.y}`;
    })
    .join(" ");
}

export default function RequestFlow({ visual }: { visual: RequestFlowVisual }) {
  const nodeMap = new Map(visual.nodes.map((node) => [node.id, node]));
  const restPath = pathFor(nodeMap, visual.defaultPath);
  const activePath = pathFor(nodeMap, visual.activePath);

  return (
    <div className="group rounded-2xl border border-black/15 bg-white/40 p-6" tabIndex={0}>
      <div className="relative mx-auto h-48 w-full max-w-[360px]" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 340 192" fill="none">
          <path d={restPath} stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-black/5 group-focus-visible:stroke-black/5" />
          <path d={activePath} stroke="rgba(0,0,0,0.05)" strokeWidth="1.5" className="transition-all duration-300 group-hover:stroke-[#ff4d00]/40 group-focus-visible:stroke-[#ff4d00]/40" />

          <circle r="4" fill="#ff4d00" className="group-hover:hidden group-focus-visible:hidden">
            <animateMotion dur="2.5s" repeatCount="indefinite" path={restPath} />
          </circle>
          <circle r="4" fill="#ff4d00" className="hidden group-hover:block group-focus-visible:block">
            <animateMotion dur="1.5s" repeatCount="indefinite" path={activePath} />
          </circle>
        </svg>

        {visual.nodes.map((node) => (
          <div
            key={node.id}
            className="absolute flex flex-col items-center gap-1.5 -translate-x-1/2 -translate-y-1/2"
            style={{ left: node.x, top: node.y }}
          >
            <div
              className={`flex items-center justify-center rounded-full border font-mono text-[10px] font-semibold shadow-sm transition-colors ${
                node.emphasis
                  ? "h-11 w-11 border-black bg-black text-[#EEE9E3] shadow-md"
                  : "h-9 w-9 border-black/15 bg-white text-black/75 group-hover:border-[#ff4d00] group-focus-visible:border-[#ff4d00]"
              }`}
            >
              {node.label.length > 6 ? node.label.slice(0, 3) : node.label}
            </div>
            <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-wider text-black/55">
              {node.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-black/10 pt-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
            How it works
          </span>
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-black/35">
            {visual.hint}
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-black/65">{visual.detail}</p>
      </div>
    </div>
  );
}
