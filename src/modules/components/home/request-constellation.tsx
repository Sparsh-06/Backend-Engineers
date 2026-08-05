const nodes = [
  { label: "request", meta: "GET /learn", className: "left-[2%] top-[27%]" },
  { label: "edge", meta: "TLS · 42ms", className: "left-[31%] top-[5%]" },
  { label: "service", meta: "healthy", className: "right-[8%] top-[22%] active" },
  { label: "cache", meta: "hit · 94%", className: "left-[21%] bottom-[9%]" },
  { label: "data", meta: "replica", className: "right-[1%] bottom-[14%]" },
];

export default function RequestConstellation() {
  return (
    <div className="constellation relative mx-auto h-[390px] w-full max-w-[470px] select-none sm:h-[470px]" aria-label="An abstract backend request flow">
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 470 470" fill="none" aria-hidden="true">
        <path className="constellation-line" d="M70 190C105 105 168 90 216 88C295 86 314 153 354 158" />
        <path className="constellation-line constellation-line-delay" d="M72 190C160 207 147 352 215 373C278 392 332 326 379 326" />
        <path className="constellation-line constellation-line-delay-2" d="M354 158C395 218 382 273 379 326" />
        <circle className="constellation-pulse" cx="215" cy="88" r="5" />
        <circle className="constellation-pulse constellation-pulse-delay" cx="354" cy="158" r="5" />
      </svg>
      <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black bg-black text-[#EEE9E3] shadow-[0_18px_40px_rgba(0,0,0,.18)] sm:h-32 sm:w-32">
        <div className="text-center"><span className="block font-mono text-[9px] uppercase tracking-[.25em] text-[#ff8051]">trace</span><span className="mt-1 block text-sm font-semibold">the flow</span><span className="mt-1 block font-mono text-[9px] text-white/45">01 · 200 OK</span></div>
      </div>
      {nodes.map((node) => <div key={node.label} className={`constellation-node absolute ${node.className ?? ""}`}><span className="constellation-ring" /><span className="relative block text-sm font-semibold tracking-tight">{node.label}</span><span className="relative mt-1 block font-mono text-[9px] text-black/45">{node.meta}</span></div>)}
      <p className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[.18em] text-black/45">every system tells a story</p>
    </div>
  );
}
