import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import RequestConstellation from "@/modules/components/home/request-constellation";

const topics = [
  ["01", "Foundations", "Networking, APIs, authentication, queues, and the tools beneath every dependable service.", "/topics"],
  ["02", "Data systems", "Model data deliberately, choose the right storage engine, and make it perform at scale.", "/topics"],
  ["03", "Distributed systems", "The practical mechanics of failure, consistency, coordination, and resilient design.", "/topics"],
  ["04", "Cloud & platform", "Ship systems that are observable, secure, automated, and ready for real traffic.", "/topics"],
];

const Arrow = () => <span aria-hidden="true" className="text-lg leading-none">↗</span>;

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <section className="hero-grid relative isolate min-h-190 overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:min-h-[820px] lg:px-12">
        <div className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-[#ff4d00]/10 blur-3xl" />
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-4">
          <div className="max-w-4xl">
            <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
              <span className="h-2 w-2 rounded-full bg-[#ff4d00] shadow-[0_0_0_5px_rgba(255,77,0,0.12)]" />
              The field guide for backend builders
            </div>
            <h1 className="max-w-4xl text-balance font-semibold text-[clamp(3.5rem,9vw,8rem)] leading-[0.88] tracking-[-0.075em] text-black">
              Make the invisible <em className="font-serif font-normal text-[#ff4d00]">click.</em>
            </h1>
            <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-black/65 sm:text-xl">
              A living library for understanding backend engineering - from the first request to the last deployed container.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/topics" className="rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-[#EEE9E3] transition hover:-translate-y-0.5 hover:bg-[#ff4d00]">
                Start exploring <span className="ml-2">→</span>
              </Link>
              <Link href="/topics" className="rounded-full border border-black/20 px-6 py-3.5 text-sm font-semibold text-black transition hover:border-black hover:bg-white/40">
                See the maps
              </Link>
            </div>
          </div>
          <div className="hidden lg:block"><RequestConstellation /></div>
          </div>

          <div className="relative mt-16 grid max-w-5xl grid-cols-1 border-t border-black/15 sm:grid-cols-3">
            {[['12+', 'learning paths'], ['Visual', 'mental models'], ['Always', 'evolving']].map(([stat, label]) => (
              <div key={stat} className="border-b border-black/15 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0">
                <div className="text-2xl font-semibold tracking-tight">{stat}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-black/55">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-10 -right-4 hidden rotate-90 text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 lg:block">scroll to trace the stack</div>
      </section>

      <section className="bg-black px-5 py-20 text-[#EEE9E3] sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff8051]">Your systems atlas</p>
            <h2 className="max-w-3xl text-balance text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">Not another glossary. A way to form better technical instincts.</h2>
          </div>
          <div className="mt-16 grid border-t border-white/15 md:grid-cols-2">
            {topics.map(([number, title, copy, href]) => (
              <Link key={title} href={href} className="group grid min-h-60 grid-cols-[auto_1fr] gap-x-6 border-b border-white/15 py-8 transition hover:bg-white/[0.04] md:px-7 md:odd:pl-0 md:even:border-l md:even:pl-7">
                <span className="font-mono text-xs text-[#ff8051]">{number}</span>
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4"><h3 className="text-2xl font-medium tracking-tight">{title}</h3><span className="text-[#ff8051] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"><Arrow /></span></div>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">{copy}</p>
                  <span className="mt-auto pt-9 text-xs font-semibold uppercase tracking-wider text-white/75">Explore collection</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 border-b border-black/15 pb-8 sm:flex-row sm:items-end">
            <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">Freshly mapped</p><h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Start with a question.</h2></div>
            <Link href="/blog" className="group text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black">Read the field notes <span className="inline-block transition-transform group-hover:translate-x-1">→</span></Link>
          </div>
          <div className="grid gap-5 pt-8 md:grid-cols-[1.3fr_0.7fr]">
            <Link href="/topics" className="group rounded-4xl bg-[#d9ff63] p-7 transition hover:-translate-y-1 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-black/60">Interactive explainer · Architecture</p>
              <div className="mt-12 flex justify-between gap-6"><h3 className="max-w-md text-3xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl">What really happens when a request arrives?</h3><Arrow /></div>
              <p className="mt-10 max-w-md text-sm leading-relaxed text-black/65">Follow one API request as it moves through a load balancer, service, cache, queue, and database.</p>
            </Link>
            <Link href="/blog" className="group rounded-4xl border border-black/15 bg-white/35 p-7 transition hover:-translate-y-1 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#ff4d00]">Field notes · 6 min</p>
              <h3 className="mt-12 text-3xl font-semibold leading-[1.05] tracking-tighter">The question underneath “Should we use Redis?”</h3>
              <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-5 text-sm font-semibold"><span>Read article</span><Arrow /></div>
            </Link>
          </div>
        </div>
      </section>
      <footer className="border-t border-black/15 px-5 py-8 sm:px-8 lg:px-12"><div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-xs font-medium text-black/55 sm:flex-row"><span>© {new Date().getFullYear()} B.Engineers</span><span>Built for curious engineers.</span></div></footer>
    </main>
  );
}
