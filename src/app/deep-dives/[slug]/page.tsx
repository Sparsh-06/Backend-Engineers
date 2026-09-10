import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DeepDiveDetail from "@/modules/layouts/deep-dives/deep-dive-detail";
import { howItWorksArticles, getHowItWorksArticle } from "@/data/how-it-works";
import { getHowItWorksContent } from "@/lib/markdown";
import { topicGroupsFlat } from "@/data/topics";

type Params = { slug: string };

const siteName = "Backend Engineer";

export function generateStaticParams() {
  return howItWorksArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getHowItWorksArticle(slug);

  if (!article) {
    return { title: "Article not found" };
  }

  const title = article.title;
  const fullTitle = `${title} | ${siteName}`;
  const canonical = `/deep-dives/${slug}`;

  return {
    title,
    description: article.description,
    keywords: article.keywords,
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
      title: fullTitle,
      description: article.description,
      type: "article",
      siteName,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: article.description,
    },
  };
}

export default async function DeepDivePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = getHowItWorksArticle(slug);

  if (!article) {
    notFound();
  }

  const markdown = await getHowItWorksContent(slug);

  if (!markdown) {
    notFound();
  }

  const relatedTopics = article.relatedTopicSlugs
    .map((topicSlug) => topicGroupsFlat.find((t) => t.slug === topicSlug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .map((t) => ({ slug: t.slug, title: t.title, description: t.description }));

  const otherArticles = howItWorksArticles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 4)
    .map((a) => ({ slug: a.slug, title: a.title, tagline: a.tagline, category: a.category }));

  const pageUrl = `https://www.backendengineer.in/deep-dives/${slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteName, item: "https://www.backendengineer.in" },
      { "@type": "ListItem", position: 2, name: "Deep dives", item: "https://www.backendengineer.in/deep-dives" },
      { "@type": "ListItem", position: 3, name: article.title, item: pageUrl },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    inLanguage: "en",
    datePublished: markdown.lastModified,
    dateModified: markdown.lastModified,
    author: { "@type": "Organization", name: siteName, url: "https://www.backendengineer.in" },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: "https://www.backendengineer.in",
      logo: { "@type": "ImageObject", url: "https://www.backendengineer.in/favicon.png" },
    },
    keywords: article.keywords.join(", "),
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
        article={article}
        content={markdown.content}
        toc={markdown.toc}
        relatedTopics={relatedTopics}
        otherArticles={otherArticles}
      />
    </>
  );
}
