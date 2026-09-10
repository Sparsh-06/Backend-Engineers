import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import SiteFooter from "@/modules/components/common/site-footer";
import { howItWorksArticles } from "@/data/how-it-works";

export const metadata: Metadata = {
  title: "Deep Dives - How Everyday Tech Actually Works",
  description:
    "How VPNs, cloud gaming, BitTorrent, and video streaming actually work - standalone explainers, same no-fluff style as the rest of this site.",
  keywords: [
    "how does a vpn work",
    "how does cloud gaming work",
    "how does bittorrent work",
    "how do search engines work",
    "how does video streaming work",
    "how does wifi work",
    "tech explainers",
    "systems engineering explained",
  ],
  alternates: { canonical: "/deep-dives" },
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
    title: "Deep Dives - How Everyday Tech Actually Works",
    description:
      "Standalone explainers for the systems behind things you use every day, explained the same way this site explains backend engineering.",
    url: "/deep-dives",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deep Dives - How Everyday Tech Actually Works",
    description: "Standalone explainers for the systems behind things you use every day.",
  },
};

function groupByCategory(articles: typeof howItWorksArticles) {
  const groups = new Map<string, typeof howItWorksArticles>();
  for (const article of articles) {
    if (!groups.has(article.category)) groups.set(article.category, []);
    groups.get(article.category)!.push(article);
  }
  return [...groups.entries()];
}

export default function DeepDivesPage() {
  const groups = groupByCategory(howItWorksArticles);

  return (
    <main className="overflow-hidden">
      <Navbar />
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
            Deep dives
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[.94] tracking-[-.065em] sm:text-7xl">
            How everyday tech actually works.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/60">
            Not curriculum lessons - standalone explainers for the systems
            behind things you already use, written the same way the rest of
            this site explains backend engineering. No fluff, real mechanics.
          </p>

          <div className="mt-16 grid gap-14">
            {groups.map(([category, articles]) => (
              <div key={category}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                  {category}
                </p>
                <div className="mt-5 grid gap-5 border-t border-black/15 pt-6 sm:grid-cols-2">
                  {articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/deep-dives/${article.slug}`}
                      className="group flex flex-col justify-between rounded-4xl border border-black/15 bg-white/35 p-7 transition hover:-translate-y-1 hover:bg-white"
                    >
                      <div>
                        <h2 className="text-xl font-semibold leading-tight tracking-tight">
                          {article.title}
                        </h2>
                        <p className="mt-3 text-sm leading-relaxed text-black/65">
                          {article.description}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 text-xs font-semibold uppercase tracking-wider">
                        <span>{article.tagline}</span>
                        <span className="shrink-0 text-black/40 transition group-hover:translate-x-1 group-hover:text-black">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter note="Backend engineering, cloud, and systems thinking in one place." />
    </main>
  );
}
