import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import SiteFooter from "@/modules/components/common/site-footer";
import { architectureProfiles } from "@/data/architecture-profiles";

export const metadata: Metadata = {
  title: "How They Scaled It - Real Tech Stacks Explained",
  description:
    "Pick a company to see how it actually architected its systems to scale - real tech stacks, microservices, and the specific engineering decisions behind them, based on their own public engineering writing.",
  keywords: [
    "how big tech companies scale",
    "real world system architecture",
    "big tech system design",
    "netflix tech stack",
    "uber tech stack",
    "discord tech stack",
    "stripe tech stack",
    "what tech stack do big companies use",
    "backend architecture case studies",
  ],
  alternates: { canonical: "/architecture" },
  authors: [{ name: "Sparsh Sharma" }],
  creator: "Sparsh Sharma",
  publisher: "Backend Engineer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "How They Scaled It - Real Tech Stacks Explained",
    description:
      "Pick a company to see how it actually architected its systems to scale - real tech stacks and the engineering decisions behind them.",
    url: "/architecture",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "How They Scaled It - Real Tech Stacks Explained",
    description: "Pick a company to see how it actually architected its systems to scale.",
  },
};

export default function ArchitecturePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Navbar />
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
            How they scaled it
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[.94] tracking-[-.065em] sm:text-7xl">
            Pick a company. See what&rsquo;s actually running underneath it.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-black/60">
            Real tech stacks and architecture decisions from well-known
            platforms, based on what their own engineering teams have
            published - not speculation about what they &ldquo;probably&rdquo;
            do.
          </p>
        </div>
      </section>

      <section className="border-t border-black/10 px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {architectureProfiles.map((profile) => (
            <Link
              key={profile.slug}
              href={`/architecture/${profile.slug}`}
              className="group flex min-h-56 flex-col rounded-[1.75rem] border border-black/15 bg-white/35 p-7 transition hover:-translate-y-1 hover:bg-white sm:p-9"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-black/45">
                  {profile.techStack.length} technologies covered
                </p>
                <div className="flex h-8 w-22 shrink-0 items-center justify-end">
                  <Image
                    src={profile.logo}
                    alt=""
                    aria-hidden="true"
                    width={88}
                    height={32}
                    style={{ width: "auto" }}
                    className="h-full max-h-8 max-w-full object-contain object-right opacity-80 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>
              </div>
              <h2 className="mt-6 text-3xl font-semibold leading-[1.05] tracking-[-.045em]">
                {profile.company}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#ff4d00]">
                {profile.tagline}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-black/60">
                {profile.problem}
              </p>
              <div className="mt-auto flex items-center justify-between border-t border-black/10 pt-5 text-xs font-semibold uppercase tracking-wider">
                <span>See the tech stack</span>
                <span className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter
        note={
          <>
            Summarized from public engineering blogs and talks. Not
            affiliated with the companies profiled.
          </>
        }
      />
    </main>
  );
}
