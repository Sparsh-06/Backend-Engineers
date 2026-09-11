type Item = { label: string; value: number };

export default function BarList({ items }: { items: Item[] }) {
  if (items.length === 0) {
    return <p className="text-xs text-black/40">No data yet.</p>;
  }

  const max = Math.max(1, ...items.map((i) => i.value));

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="flex items-baseline justify-between gap-3 text-xs">
            <span className="truncate font-medium text-black/75">{item.label}</span>
            <span className="shrink-0 font-mono tabular-nums text-black/50">
              {item.value.toLocaleString()}
            </span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/5">
            <div
              className="h-full rounded-full bg-[#ff4d00]"
              style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
