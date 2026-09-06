import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * Guards the whole /dev/* subtree. This stops the *page* from rendering in
 * production, which is enough for normal navigation - but Server Actions
 * are independently POST-able by their action id regardless of whether the
 * referencing page rendered, so this is defense-in-depth only. The real
 * security boundary is the identical NODE_ENV check at the top of every
 * exported Server Action under this route (see dev/new-topic/actions.ts).
 */
export default function DevLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }
  return <>{children}</>;
}
