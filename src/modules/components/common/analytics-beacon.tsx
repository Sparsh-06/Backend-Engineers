"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const SESSION_KEY = "be_sid";

function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    // Private browsing / storage disabled - fall back to a per-call id
    // rather than breaking tracking entirely. Sessions just won't group.
    return crypto.randomUUID();
  }
}

/**
 * First-party event tracking - no cookies, no cross-site identifiers. The
 * session id lives in sessionStorage only (cleared when the tab closes), so
 * this never becomes a persistent tracking identifier across visits.
 * Exported so any client component can fire a custom event, e.g.
 * trackEvent("deep_dive_opened", { slug }).
 */
export function trackEvent(type: string, meta?: Record<string, unknown>) {
  try {
    const payload = JSON.stringify({
      type,
      path: window.location.pathname,
      referrer: document.referrer || null,
      sessionId: getSessionId(),
      meta: meta ?? null,
    });

    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/collect", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/collect", {
        method: "POST",
        body: payload,
        headers: { "Content-Type": "application/json" },
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Analytics should never be able to break the page.
  }
}

function AnalyticsBeaconInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    trackEvent("pageview");
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsBeacon() {
  return (
    <Suspense fallback={null}>
      <AnalyticsBeaconInner />
    </Suspense>
  );
}
