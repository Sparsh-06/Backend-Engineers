"use client";

import { useState } from "react";

type Props = {
  onCopyLink: () => void;
  onReset: () => void;
};

export default function ShareBar({ onCopyLink, onReset }: Props) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => {
          onCopyLink();
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        }}
        className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-[#EEE9E3] transition hover:bg-[#ff4d00]"
      >
        {copied ? "Link copied" : "Copy share link"}
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full border border-black/15 bg-white/85 px-4 py-2 text-xs font-semibold text-black/60 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.06)] backdrop-blur-md transition hover:border-black/40 hover:text-black"
      >
        Reset
      </button>
    </div>
  );
}
