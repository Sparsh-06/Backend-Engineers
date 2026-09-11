import { login } from "./actions";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AnalyticsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EEE9E3] px-5">
      <form
        action={login}
        className="w-full max-w-sm rounded-3xl border border-black/10 bg-white/60 p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
          Analytics
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-black">
          Enter password
        </h1>
        {error && (
          <p className="mt-3 text-sm text-red-600">Wrong password - try again.</p>
        )}
        <input type="hidden" name="next" value={next ?? ""} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
          className="mt-6 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 focus:border-[#ff4d00]/50 focus:outline-none"
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-black px-4 py-3 text-sm font-semibold text-[#EEE9E3] transition hover:bg-[#ff4d00]"
        >
          Enter
        </button>
      </form>
    </main>
  );
}
