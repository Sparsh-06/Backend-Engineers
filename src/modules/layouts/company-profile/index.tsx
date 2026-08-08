import Image from "next/image";
import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import StackMap from "@/modules/components/architecture/stack-map";
import type { ArchitectureProfile } from "@/data/architecture-profiles";
import type { ArchitectureDeepDive } from "@/data/architecture-deep-dives";

type Props = {
  profile: ArchitectureProfile;
  otherProfiles: { slug: string; company: string; tagline: string; logo: string }[];
  deepDives: ArchitectureDeepDive[];
};

export default function CompanyProfileDetail({ profile, otherProfiles, deepDives }: Props) {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black/45">
            <Link href="/architecture" className="text-[#ff4d00] hover:underline">
              How they scaled it
            </Link>
            <span>·</span>
            <span>{profile.company}</span>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-black/15 bg-white/60 p-2.5">
              <Image
                src={profile.logo}
                alt={`${profile.company} logo`}
                width={40}
                height={40}
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[.94] tracking-[-.065em] sm:text-6xl">
              How {profile.company} scaled its backend
            </h1>
          </div>
          <p className="mt-5 text-lg text-[#ff4d00]">{profile.tagline}</p>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-black/60">
            {profile.problem}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-black/55">
            {profile.scaleContext}
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="article-kicker text-[#ff4d00]">Interactive</p>
          <h2 className="mb-2! text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
            {profile.company}&rsquo;s stack, mapped
          </h2>
          <p className="mb-5! max-w-xl text-sm leading-relaxed text-black/60">
            Grouped by where each piece sits in the request path. Click through to see what each one is actually for.
          </p>
          <StackMap company={profile.company} techStack={profile.techStack} />

          <h3 className="mt-12 text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
            The same stack, in plain language
          </h3>
          <div className="mt-5 grid gap-3">
            {profile.techStack.map((item) => (
              <div
                key={item.name}
                className="grid gap-1 rounded-xl border border-black/15 bg-white/50 p-5 sm:grid-cols-[1fr_2fr] sm:items-start sm:gap-6"
              >
                <div>
                  <p className="font-semibold text-black">{item.name}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#ff4d00]">
                    {item.category}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-black/60">{item.whatItsFor}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {deepDives.length > 0 && (
        <section className="border-t border-black/10 px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
              Deep dives
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {deepDives.map((deepDive) => (
                <Link
                  key={deepDive.slug}
                  href={`/architecture/${profile.slug}/${deepDive.slug}`}
                  className="group flex flex-col justify-between rounded-2xl border border-black/15 bg-white/50 p-6 transition hover:-translate-y-0.5 hover:bg-white"
                >
                  <div>
                    <p className="text-lg font-semibold tracking-tight text-black">
                      {deepDive.title}
                    </p>
                    <p className="mt-1 text-sm text-black/55">{deepDive.tagline}</p>
                  </div>
                  <span className="mt-4 shrink-0 text-lg text-[#ff4d00] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-black/10 bg-white/20 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
            How it actually works
          </h2>
          <div className="mt-6 grid gap-8">
            {profile.approach.map((item) => (
              <div key={item.heading}>
                <h3 className="text-lg font-semibold tracking-tight text-black">
                  {item.heading}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-black/60">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-black/10 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-black/15 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/45">
              What &ldquo;microservices&rdquo; means here, concretely
            </p>
            <p className="mt-2 text-sm leading-relaxed text-black/65">
              {profile.microservicesNote}
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-black/15 bg-[#f7f3ee] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff4d00]">
              Takeaway
            </p>
            <p className="mt-2 text-sm leading-relaxed text-black/70">{profile.takeaway}</p>
          </div>

          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
              Based on
            </p>
            <ul className="mt-2 grid gap-1">
              {profile.sources.map((source) => (
                <li key={source} className="text-xs text-black/45">
                  {source}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-black/15 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
            More profiles
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {otherProfiles.map((other) => (
              <Link
                key={other.slug}
                href={`/architecture/${other.slug}`}
                className="group rounded-2xl border border-black/15 bg-white/40 p-5 transition hover:-translate-y-1 hover:bg-white"
              >
                <div className="flex h-6 w-16 items-center justify-start">
                  <Image
                    src={other.logo}
                    alt=""
                    aria-hidden="true"
                    width={64}
                    height={24}
                    style={{ width: "auto" }}
                    className="h-full max-h-6 max-w-full object-contain object-left opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-3 font-semibold tracking-tight text-black">{other.company}</p>
                <p className="mt-2 text-xs leading-relaxed text-black/55">{other.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-black/15 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-xs font-medium text-black/55 sm:flex-row">
          <span>© {new Date().getFullYear()} Backend Engineer</span>
          <span>
            Summarized from public engineering blogs and talks. Not affiliated
            with the companies profiled.
          </span>
        </div>
      </footer>
    </main>
  );
}
