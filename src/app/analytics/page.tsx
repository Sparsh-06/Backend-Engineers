import { getDashboardData } from "@/lib/analytics-data";
import LineChart from "@/modules/components/analytics/line-chart";
import BarList from "@/modules/components/analytics/bar-list";
import StatTile from "@/modules/components/analytics/stat-tile";

export const metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

// Always live - this reads real-time rows from Supabase, never statically
// cached at build time.
export const dynamic = "force-dynamic";

export default async function AnalyticsPage() {
  const data = await getDashboardData();

  if (!data.configured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#EEE9E3] px-5">
        <div className="max-w-md text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
            Analytics
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-black">
            Not connected yet
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-black/60">
            Set <code className="rounded bg-black/5 px-1.5 py-0.5">SUPABASE_URL</code> and{" "}
            <code className="rounded bg-black/5 px-1.5 py-0.5">SUPABASE_SERVICE_ROLE_KEY</code>,
            run <code className="rounded bg-black/5 px-1.5 py-0.5">supabase/schema.sql</code>{" "}
            against your project, then reload this page.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#EEE9E3] px-5 py-16 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
          Analytics
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black">
          Traffic, last 30 days.
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Today" value={data.todayViews} />
          <StatTile label="Last 7 days" value={data.last7Views} />
          <StatTile label="Last 30 days" value={data.last30Views} />
          <StatTile label="Unique sessions (30d)" value={data.uniqueSessions30d} />
        </div>

        <div className="mt-6 rounded-3xl border border-black/10 bg-white/50 p-6">
          <h2 className="text-sm font-semibold text-black/70">Pageviews per day</h2>
          <div className="mt-6">
            <LineChart data={data.daily} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-black/10 bg-white/50 p-6">
            <h2 className="text-sm font-semibold text-black/70">Top pages</h2>
            <div className="mt-5">
              <BarList items={data.topPaths} />
            </div>
          </div>
          <div className="rounded-3xl border border-black/10 bg-white/50 p-6">
            <h2 className="text-sm font-semibold text-black/70">Top referrers</h2>
            <div className="mt-5">
              <BarList items={data.topReferrers} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
