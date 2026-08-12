import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BuildDetail from "@/modules/layouts/build/build-detail";
import { buildProjects, getBuildProject } from "@/data/build-projects";
import { getBuildContent } from "@/lib/markdown";
import { topicGroupsFlat } from "@/data/topics";

type Params = { slug: string };

const siteName = "Backend Engineer";

export function generateStaticParams() {
  return buildProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getBuildProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  const title = `${project.title} | ${siteName}`;
  const canonical = `/build/${slug}`;

  return {
    title,
    description: project.description,
    keywords: project.keywords,
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
      title,
      description: project.description,
      type: "article",
      siteName,
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
    },
  };
}

export default async function BuildProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getBuildProject(slug);

  if (!project) {
    notFound();
  }

  const markdown = await getBuildContent(slug);

  if (!markdown) {
    notFound();
  }

  const relatedTopics = project.relatedTopicSlugs
    .map((topicSlug) => topicGroupsFlat.find((t) => t.slug === topicSlug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .map((t) => ({ slug: t.slug, title: t.title, description: t.description }));

  const otherProjects = buildProjects
    .filter((p) => p.slug !== project.slug)
    .map((p) => ({ slug: p.slug, title: p.title, tagline: p.tagline, difficulty: p.difficulty }));

  const pageUrl = `https://www.backendengineer.in/build/${slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteName, item: "https://www.backendengineer.in" },
      { "@type": "ListItem", position: 2, name: "Build it", item: "https://www.backendengineer.in/build" },
      { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    description: project.description,
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
    keywords: project.keywords.join(", "),
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
      <BuildDetail
        project={project}
        content={markdown.content}
        toc={markdown.toc}
        relatedTopics={relatedTopics}
        otherProjects={otherProjects}
      />
    </>
  );
}
