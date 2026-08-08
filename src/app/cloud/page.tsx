import type { Metadata } from "next";
import Navbar from "@/modules/components/common/navbar";
import ServiceExplorer from "@/modules/layouts/cloud/service-explorer";
import { cloudServiceCategories } from "@/data/cloud-services";

export const metadata: Metadata = {
  title: "AWS vs GCP vs Azure - Cloud Services Explained",
  description:
    "A plain-English reference mapping cloud services across AWS, GCP, and Azure - compute, storage, databases, caching, and more - organized by what each category of service actually does, not by vendor marketing names.",
  keywords: [
    "aws vs gcp vs azure",
    "cloud services comparison",
    "aws service equivalent in gcp",
    "aws service equivalent in azure",
    "s3 vs cloud storage vs blob storage",
    "ec2 vs compute engine vs virtual machines",
    "lambda vs cloud functions vs azure functions",
    "dynamodb vs firestore vs cosmos db",
    "cloud provider comparison for backend engineers",
    "what cloud service should I use",
    "cloud computing basics explained",
    "managed database services compared",
  ],
  alternates: { canonical: "/cloud" },
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
    title: "AWS vs GCP vs Azure - Cloud Services Explained",
    description:
      "A plain-English reference mapping cloud services across AWS, GCP, and Azure, organized by what each category of service actually does.",
    url: "/cloud",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWS vs GCP vs Azure - Cloud Services Explained",
    description:
      "A plain-English reference mapping cloud services across AWS, GCP, and Azure.",
  },
};

const cloudSchema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Cloud Services, Compared",
  url: "https://www.backendengineer.in/cloud",
  hasDefinedTerm: cloudServiceCategories.map((cat) => ({
    "@type": "DefinedTerm",
    name: cat.category,
    description: cat.whatItMeans,
    url: `https://www.backendengineer.in/cloud#${cat.slug}`,
  })),
};

export default function CloudPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cloudSchema) }}
      />
      <Navbar />
      <section className="px-5 pb-16 pt-36 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff4d00]">
            Cloud & platform
          </p>
          <h1 className="mt-5 max-w-4xl text-balance text-5xl font-semibold leading-[.94] tracking-[-.065em] sm:text-7xl">
            AWS, GCP, and Azure, mapped to what they actually do.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-black/60">
            Every provider names the same idea differently. This is a
            category-first reference - what a service actually is, then
            what each of the big three calls it.
          </p>
          <ServiceExplorer categories={cloudServiceCategories} />
        </div>
      </section>
      <footer className="border-t border-black/15 px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 text-xs font-medium text-black/55 sm:flex-row">
          <span>© {new Date().getFullYear()} Backend Engineer</span>
          <span>Backend engineering, cloud, and systems thinking in one place.</span>
        </div>
      </footer>
    </main>
  );
}
