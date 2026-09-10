import Image from "next/image";
import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import {
  GitHubIcon,
  InstagramIcon,
  INSTAGRAM_URL,
  REPO_URL,
} from "@/modules/components/common/site-footer";
import { visibleTopicGroups, topicGroupsFlat } from "@/data/topics";
import { architectureProfiles } from "@/data/architecture-profiles";

const Arrow = () => (
  <span aria-hidden="true" className="text-lg leading-none">
    ↗
  </span>
);

// Registration marks bounding the hero like an engineering drawing sheet -
// positioned on the corners of whatever container renders them, centered on
// the corner point via translate.
const CornerMark = ({ className }: { className: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 16 16"
    className={`absolute h-3.5 w-3.5 text-black/25 ${className}`}
  >
    <path d="M8 1V15M1 8H15" stroke="currentColor" strokeWidth="1" />
  </svg>
);

const faqs = [
  {
    question: "Is Backend Engineer actually free?",
    answer: "Yes, all of it - no paywall, no signup wall.",
    schemaAnswer:
      "Yes, all of it. No paywall, no signup wall on the lessons themselves. The newsletter is optional, not a gate.",
  },
  {
    question: "Do I need prior backend experience to start?",
    answer: "No. Phase 0 covers the fundamentals most tutorials skip.",
    schemaAnswer:
      "No. The curriculum starts at Phase 0 with the fundamentals most tutorials skip, such as what a server is and how a request becomes a response, before moving into runtimes, protocols, and distributed systems.",
  },
  {
    question: "Who is this actually for?",
    answer: "Junior-to-mid engineers, interview prep, and curious full-stack devs.",
    schemaAnswer:
      "Junior to mid-level engineers bridging the gap to system design, system design interview candidates, and frontend or full-stack developers who want a clear mental model of the backend and cloud infrastructure they depend on.",
  },
  {
    question: "How much of the curriculum is live right now?",
    answer:
      "42 lessons across four phases - fundamentals, runtimes, protocols and APIs, and data structures in backend context.",
    schemaAnswer:
      "Backend fundamentals, language runtimes, protocols and APIs, and data structures in backend context are live now - 42 lessons across four phases. Data storage, distributed systems, cloud infrastructure, and production engineering are planned but not yet published.",
  },
  {
    question: "Is it just lessons, or is there anything hands-on?",
    answer:
      "An interactive system design canvas, three build-it-yourself projects, real company architecture case studies, and role-leveled interview questions.",
    schemaAnswer:
      "Beyond the written lessons, the site includes an interactive System Design Canvas for simulating architecture under load, three hands-on build projects (a rate limiter, a URL shortener, and a real-time chat server), architecture case studies on how Netflix, Uber, Discord, Stripe, Airbnb, and Spotify actually run their systems, and interview questions leveled by role (SDE1, SDE2, SDE3+/Senior) for each topic covered.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, schemaAnswer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: schemaAnswer },
  })),
};

export default function Home() {
  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:px-12 lg:pb-20 lg:pt-36">
        {/* Blueprint sheet texture - fine dot grid, fills the flat cream areas */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.19) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto w-full max-w-5xl px-6 py-8 sm:px-10 sm:py-10">
          <CornerMark className="left-0 top-0 -translate-x-1/2 -translate-y-1/2" />
          <CornerMark className="right-0 top-0 translate-x-1/2 -translate-y-1/2" />
          <CornerMark className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
          <CornerMark className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://www.producthunt.com/products/backend-engineer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-backend-engineer"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1227185&theme=light&t=1787249936641"
                alt="Backend Engineer - Backend engineering, explained visually | Product Hunt"
                width={150}
                height={32}
                className="h-7 w-auto"
              />
            </a>
            <span className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-black/55">
              Backend engineering — explained visually
            </span>
          </div>

          <h1 className="mx-auto mt-12 max-w-4xl text-balance text-center font-medium text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.04em] text-black">
            Make the invisible{" "}
            <em className="font-serif font-normal text-[#ff4d00]">
              click.
            </em>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-pretty text-center text-lg leading-relaxed text-black/60">
            A backend engineer&rsquo;s library for learning backend engineering
            and system design - from what a server actually is, to the
            first request, to the last deployed container.
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
            <Link
              href="/topics"
              className="rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-[#EEE9E3] transition hover:bg-[#ff4d00]"
            >
              Start exploring <span className="ml-2">→</span>
            </Link>
            <Link
              href="/topics"
              className="text-sm font-semibold text-black/70 underline decoration-black/25 underline-offset-[6px] transition hover:text-black hover:decoration-black"
            >
              See the maps
            </Link>
          </div>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-y-8 border-t border-black/10 pt-10 sm:grid-cols-3 sm:gap-y-0">
            {[
              ["Visual", "mental models"],
              ["No jargon", "by default"],
              ["Always", "free"],
            ].map(([stat, label]) => (
              <div key={stat} className="text-center">
                <div className="text-xl font-medium tracking-tight">
                  {stat}
                </div>
                <div className="mt-1.5 text-[11px] uppercase tracking-[0.16em] text-black/50">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-20 text-[#EEE9E3] sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff8051]">
              Backend engineering topics, mapped
            </p>
            <h2 className="max-w-3xl text-balance text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
              We skip the jargon. Let&rsquo;s form better technical instincts together.
            </h2>
          </div>
          <div className="mt-16 grid border-t border-white/15 md:grid-cols-2">
            {visibleTopicGroups.map((group, index) => (
              <Link
                key={group.slug}
                href={`/topics#${group.slug}`}
                className="group grid min-h-60 grid-cols-[auto_1fr] gap-x-6 border-b border-white/15 py-8 transition hover:bg-white/4 md:px-7 md:odd:pl-0 md:even:border-l md:even:pl-7"
              >
                <span className="font-mono text-xs text-[#ff8051]">
                  0{index + 1}
                </span>
                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-medium tracking-tight">
                      {group.title}
                    </h3>
                    <span className="text-[#ff8051] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      <Arrow />
                    </span>
                  </div>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
                    {group.description}
                  </p>
                  <span className="mt-auto pt-9 text-xs font-semibold uppercase tracking-wider text-white/75">
                    {group.topics.length} lesson{group.topics.length === 1 ? "" : "s"} live
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-10 max-w-xl text-sm text-white/40">
            Data storage, distributed systems, cloud infrastructure, and
            production engineering are being written next.
          </p>
        </div>
      </section>

      {/* Real company architecture case studies */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 border-b border-black/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
                How real systems are built
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tighter sm:text-5xl">
                Case studies from companies that actually run this stuff.
              </h2>
            </div>
            <Link
              href="/architecture"
              className="group text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black"
            >
              See every case study{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-5 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {architectureProfiles.map((profile) => (
              <Link
                key={profile.slug}
                href={`/architecture/${profile.slug}`}
                className="group flex min-h-52 flex-col justify-between rounded-4xl border border-black/15 bg-white/60 p-7 transition hover:-translate-y-1 hover:bg-white"
              >
                <div>
                  <Image
                    src={profile.logo}
                    alt={profile.company}
                    width={120}
                    height={28}
                    className="h-6 w-auto object-contain object-left"
                  />
                  <p className="mt-5 text-sm leading-relaxed text-black/65">
                    {profile.tagline}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-4 text-xs font-semibold uppercase tracking-wider">
                  <span>Read the case study</span>
                  <Arrow />
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
              Why learn backend engineering here
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-5xl">
              Because a mental model is worth a thousand lines of log files.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-black/65">
              Traditional computer science resources are either too abstractly academic or too hyper-focused on syntax. Backend Engineer bridges that gap for backend engineers and backend developers of every level, using clean, interactive illustrations that explain the invisible mechanics of scalable computing, system design, and cloud architecture.
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

      {/* More than lessons - Canvas, Build It, Concepts, Cloud */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
              More than lessons
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-5xl">
              A workspace, not just a reading list.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 border-t border-black/15 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                href: "/interview-prep",
                label: "54 questions",
                title: "Interview Prep",
                desc: "Real interview questions, leveled for SDE1, SDE2, and SDE3+/Senior - each one tied to the full lesson behind it, not a generic list.",
              },
              {
                href: "/canvas",
                label: "Interactive",
                title: "System Design Canvas",
                desc: "Drag components onto a canvas, wire them into a system, and run a load simulation that shows exactly where it breaks - and why.",
              },
              {
                href: "/build",
                label: "3 projects",
                title: "Build It",
                desc: "A rate limiter, a URL shortener, a real-time chat server - each with a real implementation guide, not just a spec.",
              },
              {
                href: "/concepts",
                label: "36 terms",
                title: "Glossary",
                desc: "Backend terms defined in plain English - idempotency, backpressure, p99 latency - each linked back to the full lesson.",
              },
              {
                href: "/cloud",
                label: "18 categories",
                title: "AWS vs GCP vs Azure",
                desc: "Cloud services mapped by what they actually do, organized by category instead of vendor marketing names.",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col justify-between rounded-4xl border border-black/15 bg-white/35 p-8 transition hover:-translate-y-1 hover:bg-white"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#ff4d00]">
                    {tool.label}
                  </p>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                    {tool.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/65">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-4 text-xs font-semibold uppercase tracking-wider">
                  <span>Open</span>
                  <Arrow />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why this exists */}
      <section className="border-t border-black/10 bg-black px-5 py-20 text-[#EEE9E3] sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff8051]">
              Why this exists
            </span>
            <h2 className="mt-4 text-balance text-3xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl">
              Built by one backend engineer, for the backend engineer he used to be.
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-base leading-relaxed text-white/65 sm:text-lg">
            <p>
              Most backend resources are either academic papers or shallow
              tutorials that skip the &ldquo;why.&rdquo; This site starts from
              the parts nobody explains - what a server actually is, why HTTP
              forgets you - and builds up to real system design, visually.
            </p>
            <p className="text-white/45">
              No paywall, on any of it. 42 lessons live across four phases -
              fundamentals, runtimes, protocols and APIs, and data structures
              in backend context - with data storage and distributed systems
              being written next.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-b border-black/10 bg-white/20 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
              Before you dive in
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-black sm:text-5xl">
              Questions people usually ask first.
            </h2>
          </div>
          <div className="mt-14 grid gap-x-12 gap-y-10 border-t border-black/15 pt-10 md:grid-cols-2">
            {faqs.map(({ question, answer }) => (
              <div key={question}>
                <h3 className="text-lg font-semibold tracking-tight text-black">
                  {question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-black/60">
                  {answer}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-14 border-t border-black/15 pt-8 text-sm text-black/55">
            Still have a question?{" "}
            <a
              href="mailto:support@backendengineer.in"
              className="font-semibold text-black underline decoration-black/25 underline-offset-4 hover:decoration-black"
            >
              support@backendengineer.in
            </a>
          </p>
        </div>
      </section>

      {/* Start here - real published lessons */}
      <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col justify-between gap-6 border-b border-black/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
                Start here
              </p>
              <h2 className="mt-3 text-4xl font-semibold tracking-tighter sm:text-5xl">
                Three lessons to begin with.
              </h2>
            </div>
            <Link
              href="/topics"
              className="group text-sm font-semibold underline decoration-black/25 underline-offset-4 hover:decoration-black"
            >
              See every topic{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="grid gap-6 pt-8 md:grid-cols-3">
            {["what-is-a-server", "nodejs-event-loop", "lru-cache"].map(
              (slug, index) => {
                const topic = topicGroupsFlat.find((t) => t.slug === slug);
                if (!topic) return null;
                return (
                  <Link
                    key={slug}
                    href={`/topics/${slug}`}
                    className={`group rounded-4xl p-7 transition hover:-translate-y-1 sm:p-10 flex flex-col justify-between ${
                      index === 0
                        ? "bg-[#d9ff63]"
                        : "border border-black/15 bg-white/35"
                    }`}
                  >
                    <div>
                      <p
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          index === 0 ? "text-black/60" : "text-[#ff4d00]"
                        }`}
                      >
                        {topic.phase} · {topic.groupTitle}
                      </p>
                      <h3 className="mt-8 text-2xl font-semibold leading-tight tracking-tight">
                        {topic.title}
                      </h3>
                    </div>
                    <div>
                      <p className="mt-8 text-sm leading-relaxed text-black/65">
                        {topic.description}
                      </p>
                      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs font-semibold">
                        <span>Read lesson</span>
                        <Arrow />
                      </div>
                    </div>
                  </Link>
                );
              },
            )}
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
          <span className="block mt-4 text-[10px] text-white/40 font-mono">
            One email a month, easy to unsubscribe from. Sent from{" "}
            <a href="mailto:promotions@backendengineer.in" className="underline decoration-white/25 hover:decoration-white">
              promotions@backendengineer.in
            </a>
            .
          </span>
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
              <a
                href="mailto:contact@backendengineer.in"
                className="mt-5 inline-block text-xs font-semibold text-white/75 underline decoration-white/25 underline-offset-4 hover:text-white hover:decoration-white"
              >
                contact@backendengineer.in
              </a>
            </div>
            <div>
              <h4 className="text-xs uppercase font-semibold text-white tracking-widest mb-4">Learning paths</h4>
              <ul className="space-y-2 text-xs">
                {visibleTopicGroups.map((group) => (
                  <li key={group.slug}>
                    <Link href={`/topics#${group.slug}`} className="hover:text-white transition">
                      {group.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase font-semibold text-white tracking-widest mb-4">Explore</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="/topics" className="hover:text-white transition">All topics</Link></li>
                <li><Link href="/build" className="hover:text-white transition">Build it</Link></li>
                <li><Link href="/canvas" className="hover:text-white transition">Canvas</Link></li>
                <li><Link href="/architecture" className="hover:text-white transition">Architecture</Link></li>
                <li><Link href="/concepts" className="hover:text-white transition">Concepts</Link></li>
                <li><Link href="/cloud" className="hover:text-white transition">Cloud</Link></li>
                <li><Link href="/interview-prep" className="hover:text-white transition">Interview prep</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 text-[11px] font-mono">
            <span>© {new Date().getFullYear()} Backend Engineer. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition"
              >
                <GitHubIcon />
                Contribute on GitHub
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition"
              >
                <InstagramIcon />
                Instagram
              </a>
              <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
              <a
                href="https://www.producthunt.com/products/backend-engineer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-backend-engineer"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1227185&theme=light&t=1787249936641"
                  alt="Backend Engineer - Backend engineering, explained visually | Product Hunt"
                  width={150}
                  height={32}
                  className="h-8 w-auto"
                />
              </a>
              <a
                href="https://launchbuff.com/products/backend-engineer-kwcqfv"
                target="_blank"
                rel="noopener noreferrer"
                title="Featured on LaunchBuff"
                className="shrink-0"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://launchbuff.com/badge-featured-light.svg"
                  alt="Featured on LaunchBuff"
                  width={256}
                  height={80}
                  className="h-8 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
