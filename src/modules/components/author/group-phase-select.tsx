"use client";

import { TOPIC_GROUPS } from "@/lib/dev-authoring/types";

type Props = {
  groupSlug: string;
  phase: string;
  onGroupChange: (slug: string) => void;
};

export default function GroupPhaseSelect({ groupSlug, phase, onGroupChange }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="block text-sm font-semibold">Curriculum group</label>
        <select
          className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
          name="groupSlug"
          value={groupSlug}
          onChange={(e) => onGroupChange(e.target.value)}
        >
          {TOPIC_GROUPS.map((group) => (
            <option key={group.slug} value={group.slug}>
              {group.title}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold">Phase</label>
        <input
          className="mt-1 w-full rounded-md border border-black/10 bg-black/5 px-3 py-2 text-black/60"
          name="phase"
          value={phase}
          readOnly
        />
      </div>
    </div>
  );
}
