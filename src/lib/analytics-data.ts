import { getSupabaseServerClient } from "./supabase";

export type DashboardData = {
  configured: boolean;
  todayViews: number;
  last7Views: number;
  last30Views: number;
  uniqueSessions30d: number;
  daily: { date: string; value: number }[];
  topPaths: { label: string; value: number }[];
  topReferrers: { label: string; value: number }[];
};

const EMPTY: DashboardData = {
  configured: false,
  todayViews: 0,
  last7Views: 0,
  last30Views: 0,
  uniqueSessions30d: 0,
  daily: [],
  topPaths: [],
  topReferrers: [],
};

/**
 * Fetches raw pageview rows for the last 30 days and aggregates them here in
 * JS rather than with SQL functions - simpler to set up (just the one table,
 * no RPCs to deploy) and plenty fast at the traffic volume a single site
 * actually gets. Revisit with real SQL aggregation if this ever needs to
 * page through hundreds of thousands of rows.
 */
export async function getDashboardData(): Promise<DashboardData> {
  const supabase = getSupabaseServerClient();
  if (!supabase) return EMPTY;

  const now = new Date();
  const startOf30d = new Date(now);
  startOf30d.setDate(startOf30d.getDate() - 29);
  startOf30d.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("analytics_events")
    .select("path, referrer, session_id, created_at")
    .eq("event_type", "pageview")
    .gte("created_at", startOf30d.toISOString())
    .order("created_at", { ascending: true })
    .limit(20000);

  if (error || !data) {
    if (error) console.error("analytics query failed:", error.message);
    return { ...EMPTY, configured: true };
  }

  // Every day gets a bucket up front, including days with zero events, so
  // the chart doesn't silently skip a quiet day.
  const dayBuckets = new Map<string, number>();
  for (let i = 0; i < 30; i++) {
    const d = new Date(startOf30d);
    d.setDate(d.getDate() + i);
    dayBuckets.set(d.toISOString().slice(0, 10), 0);
  }

  const pathCounts = new Map<string, number>();
  const referrerCounts = new Map<string, number>();
  const sessions30d = new Set<string>();

  const todayKey = now.toISOString().slice(0, 10);
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  let todayViews = 0;
  let last7Views = 0;

  for (const row of data as {
    path: string | null;
    referrer: string | null;
    session_id: string | null;
    created_at: string;
  }[]) {
    const created = new Date(row.created_at);
    const dayKey = created.toISOString().slice(0, 10);

    if (dayBuckets.has(dayKey)) {
      dayBuckets.set(dayKey, (dayBuckets.get(dayKey) ?? 0) + 1);
    }
    if (dayKey === todayKey) todayViews++;
    if (created >= sevenDaysAgo) last7Views++;

    if (row.session_id) sessions30d.add(row.session_id);

    if (row.path) {
      pathCounts.set(row.path, (pathCounts.get(row.path) ?? 0) + 1);
    }

    if (row.referrer) {
      try {
        const host = new URL(row.referrer).hostname.replace(/^www\./, "");
        if (!host.includes("backendengineer.in")) {
          referrerCounts.set(host, (referrerCounts.get(host) ?? 0) + 1);
        }
      } catch {
        // malformed referrer string - skip rather than crash the page
      }
    } else {
      referrerCounts.set("Direct / none", (referrerCounts.get("Direct / none") ?? 0) + 1);
    }
  }

  const daily = [...dayBuckets.entries()].map(([date, value]) => ({ date, value }));
  const topPaths = [...pathCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, value]) => ({ label, value }));
  const topReferrers = [...referrerCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([label, value]) => ({ label, value }));

  return {
    configured: true,
    todayViews,
    last7Views,
    last30Views: data.length,
    uniqueSessions30d: sessions30d.size,
    daily,
    topPaths,
    topReferrers,
  };
}
