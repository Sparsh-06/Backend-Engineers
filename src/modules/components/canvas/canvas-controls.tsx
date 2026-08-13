"use client";

import { useReactFlow } from "@xyflow/react";

type Props = {
  onReset?: () => void;
};

const buttonClass =
  "grid h-8 w-8 place-items-center rounded-full text-black/60 transition hover:bg-black/5 hover:text-black";

export default function CanvasControls({ onReset }: Props) {
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-black/10 bg-[#EEE9E3]/90 p-1 shadow-sm backdrop-blur-xl">
      <button type="button" onClick={() => zoomOut()} className={buttonClass} aria-label="Zoom out">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
          <path d="M3 8h10" />
        </svg>
      </button>
      <button type="button" onClick={() => zoomIn()} className={buttonClass} aria-label="Zoom in">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
          <path d="M8 3v10M3 8h10" />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => fitView({ padding: 0.2, duration: 300 })}
        className={buttonClass}
        aria-label="Fit to view"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 6V3a1 1 0 0 1 1-1h3M14 6V3a1 1 0 0 0-1-1h-3M2 10v3a1 1 0 0 0 1 1h3M14 10v3a1 1 0 0 1-1 1h-3" />
        </svg>
      </button>
      {onReset && (
        <>
          <span className="mx-0.5 h-4 w-px bg-black/10" />
          <button type="button" onClick={onReset} className={buttonClass} aria-label="Reset canvas">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
              <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2v3h-3" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
