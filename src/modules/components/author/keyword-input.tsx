"use client";

import { useState } from "react";

type Props = {
  keywords: string[];
  onChange: (keywords: string[]) => void;
};

export default function KeywordInput({ keywords, onChange }: Props) {
  const [draft, setDraft] = useState("");

  function commit() {
    const value = draft.trim();
    if (value && !keywords.includes(value)) {
      onChange([...keywords, value]);
    }
    setDraft("");
  }

  return (
    <div>
      <label className="block text-sm font-semibold">Keywords</label>
      <div className="mt-1 flex flex-wrap gap-2 rounded-md border border-black/20 p-2">
        {keywords.map((keyword, index) => (
          <span
            key={keyword}
            className="flex items-center gap-1 rounded-full bg-black/5 px-2.5 py-1 text-xs"
          >
            {keyword}
            <button
              type="button"
              onClick={() => onChange(keywords.filter((_, i) => i !== index))}
              className="text-black/40 hover:text-black"
              aria-label={`Remove ${keyword}`}
            >
              ×
            </button>
          </span>
        ))}
        <input
          className="min-w-32 flex-1 border-none px-1 py-1 text-sm outline-none"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              commit();
            } else if (e.key === "Backspace" && draft === "" && keywords.length > 0) {
              onChange(keywords.slice(0, -1));
            }
          }}
          onBlur={commit}
          placeholder="type a keyword, press Enter"
        />
      </div>
    </div>
  );
}
