import Image from "next/image";
import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import PipelineFlow from "@/modules/components/architecture/pipeline-flow";
import type { ArchitectureDeepDive } from "@/data/architecture-deep-dives";

type Props = {
  deepDive: ArchitectureDeepDive;
  companyName: string;
  companySlug: string;
  companyLogo: string;
};

export default function DeepDiveDetail({ deepDive, companyName, companySlug, companyLogo }: Props) {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">
            <Link href="/architecture" className="text-[#ff4d00] hover:underline">
              How they scaled it
            </Link>
            <span>·</span>
            <Link href={`/architecture/${companySlug}`} className="hover:text-black">
              {companyName}
            </Link>
          </div>
          <div className="mt-6 flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/15 bg-white/60 p-2">
              <Image
                src={companyLogo}
                alt={`${companyName} logo`}
                width={32}
                height={32}
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="max-w-3xl text-balance text-3xl font-semibold leading-[1] tracking-[-.05em] sm:text-5xl">
              {deepDive.title}
            </h1>
          </div>
          <p className="mt-5 text-lg text-[#ff4d00]">{deepDive.tagline}</p>
          <p className="mt-7 text-lg leading-relaxed text-black/60">{deepDive.intro}</p>
        </div>
      </section>

      <section className="border-t border-black/10 bg-white/20 px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
            Terms worth knowing before you read on
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {deepDive.keyTermsUsed.map((item) => (
              <div key={item.term} className="rounded-xl border border-black/15 bg-white/60 p-4">
                <p className="text-sm font-semibold text-black">{item.term}</p>
                <p className="mt-1.5 text-xs leading-relaxed text-black/60">{item.definition}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="article-kicker text-[#ff4d00]">Interactive</p>
          <h2 className="mb-2! text-2xl font-semibold tracking-tight text-black">
            Walk the pipeline
          </h2>
          <p className="mb-5! max-w-xl text-sm leading-relaxed text-black/60">
            Step through each stage of how this actually works, in order.
          </p>
          <PipelineFlow title={deepDive.title} stages={deepDive.pipeline} />
        </div>
      </section>

      <section className="border-t border-black/10 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl">
          {deepDive.sections.map((section) => (
            <div key={section.heading} className="mb-12 last:mb-0">
              <h2 className="text-2xl font-semibold tracking-tight text-black">
                {section.heading}
              </h2>
              <div className="mt-4 grid gap-4">
                {section.body.map((paragraph, i) => (
                  <p key={i} className="text-base leading-relaxed text-black/65">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-4 rounded-2xl border border-black/15 bg-[#f7f3ee] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff4d00]">
              Takeaway
            </p>
            <p className="mt-2 text-sm leading-relaxed text-black/70">{deepDive.takeaway}</p>
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-black/20 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
              Source
            </p>
            <a
              href={deepDive.sourceUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-2 block text-sm font-semibold text-black underline decoration-black/25 underline-offset-2 hover:text-[#ff4d00] hover:decoration-[#ff4d00]"
            >
              &ldquo;{deepDive.sourceTitle}&rdquo;
            </a>
            <p className="mt-1 text-xs text-black/55">
              By {deepDive.sourceAuthors.join(" and ")}, on {companyName}&rsquo;s engineering blog
            </p>
            <p className="mt-3 text-xs leading-relaxed text-black/50">{deepDive.sourceNote}</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/15 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-xs font-medium text-black/55 sm:flex-row">
          <span>© {new Date().getFullYear()} Backend Engineer</span>
          <span>
            Explanatory commentary on public engineering writing. Not
            affiliated with {companyName}.
          </span>
        </div>
      </footer>
    </main>
  );
}
