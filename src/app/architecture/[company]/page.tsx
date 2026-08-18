import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompanyProfileDetail from "@/modules/layouts/company-profile";
import { architectureProfiles, getArchitectureProfile } from "@/data/architecture-profiles";
import { getDeepDivesForCompany } from "@/data/architecture-deep-dives";

type Params = { company: string };

const siteName = "Backend Engineer";

export function generateStaticParams() {
  return architectureProfiles.map((profile) => ({ company: profile.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { company } = await params;
  const profile = getArchitectureProfile(company);

  if (!profile) {
    return { title: "Profile not found" };
  }

  const title = `How ${profile.company} Scaled Its Backend`;
  const description = `${profile.tagline}. ${profile.problem}`;
  const canonical = `/architecture/${company}`;

  return {
    title,
    description,
    keywords: profile.seoKeywords,
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

export default async function CompanyProfilePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { company } = await params;
  const profile = getArchitectureProfile(company);

  if (!profile) {
    notFound();
  }

  const otherProfiles = architectureProfiles
    .filter((p) => p.slug !== profile.slug)
    .map((p) => ({ slug: p.slug, company: p.company, tagline: p.tagline, logo: p.logo }));
  const deepDives = getDeepDivesForCompany(profile.slug);

  const pageUrl = `https://www.backendengineer.in/architecture/${company}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteName, item: "https://www.backendengineer.in" },
      { "@type": "ListItem", position: 2, name: "How they scaled it", item: "https://www.backendengineer.in/architecture" },
      { "@type": "ListItem", position: 3, name: profile.company, item: pageUrl },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `How ${profile.company} scaled its backend`,
    description: `${profile.tagline}. ${profile.problem}`,
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    inLanguage: "en",
    about: profile.techStack.map((item) => item.name),
    author: { "@type": "Organization", name: siteName, url: "https://www.backendengineer.in" },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: "https://www.backendengineer.in",
      logo: { "@type": "ImageObject", url: "https://www.backendengineer.in/favicon.png" },
    },
    keywords: profile.seoKeywords.join(", "),
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
      <CompanyProfileDetail profile={profile} otherProfiles={otherProfiles} deepDives={deepDives} />
    </>
  );
}
