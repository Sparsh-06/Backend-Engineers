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

  // Try to load rich markdown content — null if no .md file exists yet
  const markdown = await getTopicContent(slug);

  const relatedTopics = group.topics
    .filter((relatedTopic) => relatedTopic.slug !== topic.slug)
    .slice(0, 3)
    .map((relatedTopic) => ({
      slug: relatedTopic.slug,
      title: relatedTopic.title,
      description: relatedTopic.description,
    }));

  const markdownToc: TocEntry[] = markdown?.toc ?? [];
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: siteName, item: "https://www.backendengineer.in" },
      { "@type": "ListItem", position: 2, name: "Topics", item: "https://www.backendengineer.in/topics" },
      { "@type": "ListItem", position: 3, name: topic.title, item: `https://www.backendengineer.in/topics/${slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
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
        content={markdown?.content ?? null}
        markdownToc={markdownToc}
      />
    </>
  );
}
