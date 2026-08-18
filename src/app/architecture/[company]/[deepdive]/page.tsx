import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DeepDiveDetail from "@/modules/layouts/deep-dive";
import { getArchitectureProfile } from "@/data/architecture-profiles";
import { getDeepDive, architectureDeepDives } from "@/data/architecture-deep-dives";

type Params = { company: string; deepdive: string };

const siteName = "Backend Engineer";

export function generateStaticParams() {
  return architectureDeepDives.map((d) => ({ company: d.companySlug, deepdive: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { company, deepdive } = await params;
  const deepDive = getDeepDive(company, deepdive);
  const profile = getArchitectureProfile(company);

  if (!deepDive || !profile) {
    return { title: "Deep dive not found" };
  }

  const title = deepDive.title;
  const description = deepDive.tagline;
  const canonical = `/architecture/${company}/${deepdive}`;

  return {
    title,
    description,
    keywords: deepDive.seoKeywords,
    alternates: { canonical },
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
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
      title: `${title} | ${siteName}`,
      description,
      type: "article",
      siteName,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteName}`,
      description,
    },
  };
}

export default async function DeepDivePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { company, deepdive } = await params;
  const deepDive = getDeepDive(company, deepdive);
  const profile = getArchitectureProfile(company);

  if (!deepDive || !profile) {
    notFound();
  }

  const pageUrl = `https://www.backendengineer.in/architecture/${company}/${deepdive}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteName, item: "https://www.backendengineer.in" },
      { "@type": "ListItem", position: 2, name: "How they scaled it", item: "https://www.backendengineer.in/architecture" },
      { "@type": "ListItem", position: 3, name: profile.company, item: `https://www.backendengineer.in/architecture/${company}` },
      { "@type": "ListItem", position: 4, name: deepDive.title, item: pageUrl },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: deepDive.title,
    description: deepDive.tagline,
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    inLanguage: "en",
    author: { "@type": "Organization", name: siteName, url: "https://www.backendengineer.in" },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: "https://www.backendengineer.in",
      logo: { "@type": "ImageObject", url: "https://www.backendengineer.in/favicon.png" },
    },
    keywords: deepDive.seoKeywords.join(", "),
    isBasedOn: {
      "@type": "CreativeWork",
      name: deepDive.sourceTitle,
      url: deepDive.sourceUrl,
      author: deepDive.sourceAuthors.map((name) => ({ "@type": "Person", name })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <DeepDiveDetail
        deepDive={deepDive}
        companyName={profile.company}
        companySlug={company}
        companyLogo={profile.logo}
      />
    </>
  );
}
