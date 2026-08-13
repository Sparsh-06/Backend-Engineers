export type StatusLevel = "good" | "warn" | "bad";

export const STATUS_STYLES: Record<StatusLevel, string> = {
  good: "border-black/15 text-black",
  warn: "border-[#ff4d00]/40 text-[#ff4d00]",
  bad: "border-[#ff4d00] bg-[#ff4d00]/10 text-[#ff4d00]",
};
