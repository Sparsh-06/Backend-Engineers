export default function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60 p-5">
      <p className="text-2xl font-semibold tracking-tight tabular-nums text-black">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-black/45">
        {label}
      </p>
    </div>
  );
}
