import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/modules/components/common/navbar";
import SiteFooter from "@/modules/components/common/site-footer";
import CanvasWorkspace from "@/modules/layouts/canvas/canvas-workspace";

export const metadata: Metadata = {
  title: "System Design Canvas - Build and Stress-Test Architectures",
  description:
    "Drag components onto a canvas, wire them into a system, and run a load simulation that shows exactly where it breaks and why - a load balancer, cache, or database becoming a bottleneck or a single point of failure.",
  keywords: [
    "system design canvas",
    "interactive system design tool",
    "architecture diagram builder",
    "load balancer simulation",
    "single point of failure diagram",
    "system design practice tool",
    "backend architecture simulator",
    "drag and drop architecture diagram",
    "capacity planning visualizer",
    "system design interview practice",
  ],
  alternates: { canonical: "/canvas" },
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
    title: "System Design Canvas - Build and Stress-Test Architectures",
    description:
      "Drag components onto a canvas, connect them, and simulate load to see exactly where a system breaks.",
    url: "/canvas",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Design Canvas - Build and Stress-Test Architectures",
    description: "Drag components onto a canvas and simulate load to see exactly where a system breaks.",
  },
};

const canvasSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "System Design Canvas",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  description:
    "An interactive drag-and-drop tool for assembling backend architectures and simulating load to find bottlenecks and single points of failure.",
  url: "https://www.backendengineer.in/canvas",
  isPartOf: {
    "@type": "WebSite",
    name: "Backend Engineer",
    url: "https://www.backendengineer.in",
  },
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function CanvasPage() {
  return (
    <main className="relative min-h-screen xl:h-screen xl:overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(canvasSchema) }}
      />
      <Navbar />

      {/* Small/medium screens: the canvas needs real room to work, so it's
          desktop-only for now. This is a full, real page here instead — not
          a dead end. */}
      <section className="px-5 pb-16 pt-32 sm:px-8 xl:hidden">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">Canvas</p>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[.98] tracking-[-.05em] sm:text-5xl">
            Build a system. Break it on purpose.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-black/60">
            Drag out a load balancer, app servers, a cache, a database - wire
            them together the way you would in a real design - then turn up
            the traffic and watch which piece gives out first, and why.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-black/50">
            The canvas is a drag-and-drop workspace that needs real screen
            space to be usable, so it&rsquo;s built for larger screens right
            now. Open this page on a laptop or desktop to build.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/build"
              className="rounded-full bg-black px-5 py-2.5 text-xs font-semibold text-[#EEE9E3] transition hover:bg-[#ff4d00]"
            >
              Explore Build it projects →
            </Link>
            <Link
              href="/topics"
              className="rounded-full border border-black/15 px-5 py-2.5 text-xs font-semibold text-black/60 transition hover:border-black/40 hover:text-black"
            >
              Browse topics →
            </Link>
          </div>
        </div>
      </section>
      <div className="xl:hidden">
        <SiteFooter note="Every capacity number here is illustrative - a teaching model, not a queueing-theory simulator." />
      </div>

      <div className="hidden h-full xl:block">
        <CanvasWorkspace
          header={
            <div className="rounded-2xl border border-black/15 bg-white/80 p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_20px_rgba(0,0,0,0.06)] backdrop-blur-md">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">Canvas</p>
              {/* Not an h1 - the page's one real h1 is in the xl:hidden
                  section above (same content, richer copy, always in the
                  static HTML for crawlers); this is a compact visual
                  restatement for the floating desktop card, laid out here
                  (inside the client tree) so it stacks via flex gap with the
                  palette below it instead of a guessed pixel offset. */}
              <p className="mt-1.5 text-lg font-semibold leading-[1.15] tracking-[-.03em] text-black">
                Build a system. Break it on purpose.
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-black/55">
                Wire up a load balancer, app servers, a cache, a database — then turn up the traffic and see
                what gives out first.
              </p>
            </div>
          }
        />
      </div>
    </main>
  );
}
