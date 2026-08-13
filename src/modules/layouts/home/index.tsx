import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import { GitHubIcon, REPO_URL } from "@/modules/components/common/site-footer";
import { visibleTopicGroups, topicGroupsFlat } from "@/data/topics";

const Arrow = () => (
  <span aria-hidden="true" className="text-lg leading-none">
    ↗
  </span>
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
    answer: "Backend fundamentals and Node.js runtime internals - the rest is being written.",
    schemaAnswer:
      "Backend fundamentals (Phase 0) and Node.js runtime internals (part of Phase 1) are live now. Protocols, data storage, distributed systems, and cloud infrastructure are planned but not published yet.",
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

import HeroVisual from "@/modules/components/home/hero-visual";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <section className="relative isolate min-h-190 overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:min-h-205 lg:px-12">
        <div className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-[#ff4d00]/10 blur-3xl" />
        <div className="mx-auto flex w-full max-w-6xl flex-col justify-between">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-4">
            <div className="max-w-4xl">
              <div className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-black/55">
                Backend engineering, explained visually
              </div>
              <h1 className="max-w-4xl text-balance font-semibold text-[clamp(3.5rem,9vw,8rem)] leading-[0.88] tracking-[-0.075em] text-black">
                Make the invisible{" "}
                <em className="font-serif font-normal text-[#ff4d00]">
                  click.
                </em>
              </h1>
              <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-black/65 sm:text-xl">
                A backend engineer&rsquo;s library for learning backend engineering
                and system design - from what a server actually is, to the
                first request, to the last deployed container.
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
              ["Visual", "mental models"],
              ["No jargon", "by default"],
              ["Always", "free"],
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
            More phases - protocols, data storage, distributed systems, cloud
            infrastructure - are being written next.
          </p>
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
              No paywall on the fundamentals. Still early, still growing -
              Node.js runtimes today, distributed systems and cloud next.
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
            {["what-is-a-server", "nodejs-event-loop", "statelessness"].map(
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
                <li><Link href="/concepts" className="hover:text-white transition">Concepts</Link></li>
                <li><Link href="/architecture" className="hover:text-white transition">Architecture</Link></li>
                <li><Link href="/cloud" className="hover:text-white transition">Cloud</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4 text-[11px] font-mono">
            <span>© {new Date().getFullYear()} Backend Engineer. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition"
              >
                <GitHubIcon />
                Contribute on GitHub
              </a>
              <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
              <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
