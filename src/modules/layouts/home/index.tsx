import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";

const topics = [
  [
    "01",
    "Foundations",
    "Networking, APIs, authentication, queues, and the tools beneath every dependable service.",
    "/topics",
  ],
  [
    "02",
    "Data systems",
    "Model data deliberately, choose the right storage engine, and make it perform at scale.",
    "/topics",
  ],
  [
    "03",
    "Distributed systems",
    "The practical mechanics of failure, consistency, coordination, and resilient design.",
    "/topics",
  ],
  [
    "04",
    "Cloud & platform",
    "Ship systems that are observable, secure, automated, and ready for real traffic.",
    "/topics",
  ],
];

const Arrow = () => (
  <span aria-hidden="true" className="text-lg leading-none">
    ↗
  </span>
);

import HeroVisual from "@/modules/components/home/hero-visual";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Navbar />
      <section className="relative isolate min-h-190 overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:min-h-205 lg:px-12">
        <div className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-[#ff4d00]/10 blur-3xl" />
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-4">
            <div className="max-w-4xl">
              <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
                The field guide for backend builders
              </div>
              <h1 className="max-w-4xl text-balance font-semibold text-[clamp(3.5rem,9vw,8rem)] leading-[0.88] tracking-[-0.075em] text-black">
                Make the invisible{" "}
                <em className="font-serif font-normal text-[#ff4d00]">
                  click.
                </em>
              </h1>
              <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-black/65 sm:text-xl">
                A living library for understanding backend engineering - from
                the first request to the last deployed container.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  href="/topics"
                  className="rounded-full bg-black px-6 py-3.5 text-sm font-semibold text-[#EEE9E3] transition hover:-translate-y-0.5 hover:bg-[#ff4d00]"
                >
                  Start exploring <span className="ml-2">→</span>
                </Link>
                <Link
                  href="/topics"
                  className="rounded-full border border-black/20 px-6 py-3.5 text-sm font-semibold text-black transition hover:border-black hover:bg-white/40"
                >
                  See the maps
                </Link>
              </div>
            </div>
            <div className="hidden lg:block relative w-full lg:w-[calc(100%+12vw)] lg:mr-[-12vw] xl:w-[calc(100%+16vw)] xl:mr-[-16vw]">
              {/* Background strip extending outside the viewport on the right */}
              <div className="absolute inset-y-0 left-0 right-[-100vw] bg-black/3 border-l border-t border-b border-black/10 rounded-l-4xl sm:rounded-l-[48px]" />
              
              {/* Visual content padded inside the strip */}
              <div className="relative z-10 px-6 py-8 sm:p-10 lg:pl-12 lg:pr-4">
                <HeroVisual />
              </div>
            </div>
          </div>

          <div className="relative mt-16 grid max-w-5xl grid-cols-1 border-t border-black/15 sm:grid-cols-3">
            {[
              ["12+", "learning paths"],
              ["Visual", "mental models"],
              ["Always", "evolving"],
            ].map(([stat, label]) => (
              <div
                key={stat}
                className="border-b border-black/15 py-5 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0"
              >
                <div className="text-2xl font-semibold tracking-tight">
                  {stat}
                </div>
                <div className="mt-1 text-xs uppercase tracking-wider text-black/55">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-10 -right-4 hidden rotate-90 text-[10px] font-semibold uppercase tracking-[0.35em] text-black/40 lg:block">
          scroll to trace the stack
        </div>
      </section>

      <section className="bg-black px-5 py-20 text-[#EEE9E3] sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff8051]">
              Your systems atlas
            </p>
            <h2 className="max-w-3xl text-balance text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
              We skip the jargon. Let's form better technical instincts together.
            </h2>
          </div>
          <div className="mt-16 grid border-t border-white/15 md:grid-cols-2">
            {[
              [
                "01",
                "Foundations",
                "The core plumbing. How data moves over wires, how servers negotiate secure connections, and the foundational protocols beneath every API.",
                "/topics",
              ],
              [
                "02",
                "Data systems",
                "Databases shouldn't be black boxes. We show you how indices operate, when to shard, and how to choose the right storage engine based on reality, not hype.",
                "/topics",
              ],
              [
                "03",
                "Distributed systems",
                "When one server isn't enough. Learn the practical mechanics of consensus, partitioning trade-offs, and how to design systems that expect failure.",
                "/topics",
              ],
              [
                "04",
                "Cloud & platform",
                "Shipping and keeping it running. Making systems observable, managing deployments, and confidently scaling containers under load.",
                "/topics",
              ],
            ].map(([number, title, copy, href]) => (
              <Link
                key={title}
                href={href}
                className="group grid min-h-60 grid-cols-[auto_1fr] gap-x-6 border-b border-white/15 py-8 transition hover:bg-white/4 md:px-7 md:odd:pl-0 md:even:border-l md:even:pl-7"
              >
                <span className="font-mono text-xs text-[#ff8051]">
                  {number}
                </span>
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-medium tracking-tight">
                      {title}
                    </h3>
                    <span className="text-[#ff8051] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      <Arrow />
                    </span>
                  </div>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                    {copy}
                  </p>
                  <span className="mt-auto pt-9 text-xs font-semibold uppercase tracking-wider text-white/75">
                    Explore collection
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Rationale Section: Why Visuals? */}
      <section className="px-5 py-20 bg-white/20 sm:px-8 lg:px-12 lg:py-28 border-b border-black/5">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
              Our Philosophy
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-5xl">
              Because a mental model is worth a thousand lines of log files.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-black/65">
              Traditional computer science resources are either too abstractly academic or too hyper-focused on syntax. Backend Engineer bridges that gap by using clean, interactive illustrations that explain the invisible mechanics of scalable computing.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            {[
              ["Visual First", "We map the invisible data flows, cache states, and network routing visually so they click instantly."],
              ["Deep but Readable", "Written for engineers who want to understand the 'why' behind infrastructure decisions without reading research papers."],
              ["Always Free", "High-quality, independent engineering education should be open to all developers, everywhere."]
            ].map(([title, desc]) => (
              <div key={title} className="border-t border-black/10 pt-6">
                <h4 className="font-semibold text-black">{title}</h4>
                <p className="mt-3 text-sm leading-relaxed text-black/60">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles & Guides */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 border-b border-black/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
                Freshly mapped
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tighter sm:text-5xl">
                Read the latest breakdowns.
              </h2>
            </div>
            <Link
              href="/blog"
              className="group text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black"
            >
              See all field notes{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          
          <div className="grid gap-6 pt-8 md:grid-cols-3">
            <Link
              href="/topics"
              className="group rounded-4xl bg-[#d9ff63] p-7 transition hover:-translate-y-1 sm:p-10 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-black/60">
                  Visual Guide · Architecture
                </p>
                <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-tight">
                  What really happens when a request arrives?
                </h3>
              </div>
              <div>
                <p className="mt-8 text-sm leading-relaxed text-black/65">
                  Follow one API request as it moves through a load balancer, route gateway, cache, queue, and database disk.
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs font-semibold">
                  <span>Trace the flow</span>
                  <Arrow />
                </div>
              </div>
            </Link>

            <Link
              href="/blog"
              className="group rounded-4xl border border-black/15 bg-white/35 p-7 transition hover:-translate-y-1 sm:p-10 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#ff4d00]">
                  Field Notes · 6 min
                </p>
                <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-tight">
                  The question underneath “Should we use Redis?”
                </h3>
              </div>
              <div>
                <p className="mt-8 text-sm leading-relaxed text-black/65">
                  A guide to caching tradeoffs. Why caching is not a free lunch, and how to decide if it's worth the extra systems complexity.
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs font-semibold">
                  <span>Read article</span>
                  <Arrow />
                </div>
              </div>
            </Link>

            <Link
              href="/blog"
              className="group rounded-4xl border border-black/15 bg-white/35 p-7 transition hover:-translate-y-1 sm:p-10 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-black/60">
                  Field Notes · 8 min
                </p>
                <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-tight">
                  Demystifying Database Indexes
                </h3>
              </div>
              <div>
                <p className="mt-8 text-sm leading-relaxed text-black/65">
                  Why database indexes speed up read requests but slow down write operations, explained in clear, visual language.
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs font-semibold">
                  <span>Read article</span>
                  <Arrow />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter signup section */}
      <section className="bg-black px-5 py-20 text-[#EEE9E3] sm:px-8 lg:px-12 lg:py-24 border-t border-white/10">
        <div className="mx-auto max-w-4xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff8051]">
            Join the community
          </span>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl text-white">
            Get monthly visual system design breakdowns.
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-sm text-white/60">
            No spam, no fluff. Just a single monthly digest focusing on real-world backend engineering concepts and mental models.
          </p>
          <form className="mt-8 mx-auto max-w-md flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 rounded-full bg-white/10 border border-white/10 px-5 py-3 text-sm text-white placeholder-white/40 focus:border-[#ff8051] focus:outline-none transition"
              required
            />
            <button 
              type="submit" 
              className="rounded-full bg-[#ff8051] hover:bg-[#ff4d00] text-black hover:text-white px-6 py-3 text-sm font-semibold transition"
            >
              Subscribe
            </button>
          </form>
          <span className="block mt-4 text-[10px] text-white/40 font-mono">Join 15,000+ engineers reading our field guides.</span>
        </div>
      </section>

      {/* Awesome Footer */}
      <footer className="bg-[#111111] border-t border-white/10 text-white/60 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 md:grid-cols-4 border-b border-white/10 pb-12 mb-8">
            <div className="md:col-span-2">
              <span className="text-lg font-bold tracking-tight text-white">Backend<span className="text-[#ff8051]">·</span>Engineer</span>
              <p className="mt-4 max-w-xs text-xs leading-relaxed">
                A visual library built for curious software engineers. Demystifying systems architecture, database design, and cloud platform mechanics with visual-first guides.
              </p>
            </div>
            <div>
              <h4 className="text-xs uppercase font-semibold text-white tracking-widest mb-4">Atlas Map</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/topics" className="hover:text-white transition">Foundations</Link></li>
                <li><Link href="/topics" className="hover:text-white transition">Data Systems</Link></li>
                <li><Link href="/topics" className="hover:text-white transition">Distributed Systems</Link></li>
                <li><Link href="/topics" className="hover:text-white transition">Cloud & Platform</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase font-semibold text-white tracking-widest mb-4">Community</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/blog" className="hover:text-white transition">Field Notes</Link></li>
                <li><Link href="/topics" className="hover:text-white transition">Interactive Maps</Link></li>
                <li><span className="text-white/40">GitHub (Open Source)</span></li>
                <li><span className="text-white/40">RSS Feed</span></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 text-[11px] font-mono">
            <span>© {new Date().getFullYear()} Backend Engineer. All rights reserved.</span>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
