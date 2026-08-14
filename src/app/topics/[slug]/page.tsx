import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopicDetail from "@/modules/layouts/topic-detail";
import { getTopicBySlug, getTopicGroupBySlug, topicGroupsFlat } from "@/data/topics";
import { getTopicContent, type TocEntry } from "@/lib/markdown";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return topicGroupsFlat.map((topic) => ({ slug: topic.slug }));
}

const siteName = "Backend Engineer";

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  const markdown = await getTopicContent(slug);

  if (!topic) {
    return { title: "Topic not found" };
  }

  // Prefer frontmatter from the markdown file if it exists,
  // fall back to the topics.ts metadata
  const title = markdown?.frontmatter.title ?? topic.title;
  const description = markdown?.frontmatter.description ?? topic.description;
  const keywords = markdown?.frontmatter.keywords ?? topic.keywords;
  const canonical = `/topics/${slug}`;

  return {
    title: `${title} | ${siteName}`,
    description: `${description} Part of the ${topic.groupTitle.toLowerCase()} learning path.`,
    keywords,
    alternates: {
      canonical,
    },
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

export default async function TopicPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const group = getTopicGroupBySlug(topic.groupSlug);

  if (!group) {
    notFound();
  }

  // Try to load rich markdown content - null if no .md file exists yet.
  // `topic.visuals` is the pool that inline `<Visual id="..." />` tags draw from.
  const markdown = await getTopicContent(slug, topic.visuals ?? []);

  const relatedTopics = group.topics
    .filter((relatedTopic) => relatedTopic.slug !== topic.slug)
    .slice(0, 3)
    .map((relatedTopic) => ({
      slug: relatedTopic.slug,
      title: relatedTopic.title,
      description: relatedTopic.description,
    }));

  const markdownToc: TocEntry[] = markdown?.toc ?? [];
  const pageUrl = `https://www.backendengineer.in/topics/${slug}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteName, item: "https://www.backendengineer.in" },
      { "@type": "ListItem", position: 2, name: "Topics", item: "https://www.backendengineer.in/topics" },
      { "@type": "ListItem", position: 3, name: topic.title, item: pageUrl },
    ],
  };

  const articleTitle = markdown?.frontmatter.title ?? topic.title;
  const articleDescription = markdown?.frontmatter.description ?? topic.description;
  const articleImage = markdown?.frontmatter.image ?? topic.image;
  const dateModified = markdown?.lastModified ?? "2026-08-05T00:00:00.000Z";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: articleTitle,
    description: articleDescription,
    url: pageUrl,
    ...(articleImage ? { image: `https://www.backendengineer.in${articleImage}` } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    inLanguage: "en",
    datePublished: dateModified,
    dateModified,
    author: { "@type": "Organization", name: siteName, url: "https://www.backendengineer.in" },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: "https://www.backendengineer.in",
      logo: { "@type": "ImageObject", url: "https://www.backendengineer.in/favicon.png" },
    },
    isPartOf: {
      "@type": "CreativeWorkSeries",
      name: group.title,
      url: `https://www.backendengineer.in/topics#${group.slug}`,
    },
    keywords: (markdown?.frontmatter.keywords ?? topic.keywords).join(", "),
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
      <TopicDetail
        slug={topic.slug}
        title={markdown?.frontmatter.title ?? topic.title}
        description={markdown?.frontmatter.description ?? topic.description}
        phase={topic.phase}
        keywords={markdown?.frontmatter.keywords ?? topic.keywords}
        groupTitle={group.title}
        groupDescription={group.description}
        intro={group.intro}
        groupSlug={group.slug}
        groupTopics={group.topics}
        relatedTopics={relatedTopics}
        visual={topic.visual}
        image={articleImage}
        content={markdown?.content ?? null}
        markdownToc={markdownToc}
      />
    </>
  );
}
