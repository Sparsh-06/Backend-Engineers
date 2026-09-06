"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function BodyEditor({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-semibold">Lesson body (MDX)</label>
      <p className="mt-0.5 text-xs text-black/50">
        Plain prose + Markdown. Reference a pool visual inline with{" "}
        <code className="rounded bg-black/5 px-1 py-0.5">{`<Visual id="..." />`}</code>.
      </p>
      <textarea
        className="mt-1 h-96 w-full rounded-md border border-black/20 px-3 py-2 font-mono text-sm leading-relaxed"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={"## A heading\n\nYour lesson prose goes here.\n\n<Visual id=\"some-pool-visual-id\" />"}
      />
    </div>
  );
}
