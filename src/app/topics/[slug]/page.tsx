import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TopicDetail from "@/modules/layouts/topic-detail";
import { getTopicBySlug, getTopicGroupBySlug, topicGroupsFlat } from "@/data/topics";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return topicGroupsFlat.map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return {
      title: "Topic not found",
    };
  }

  return {
    title: `${topic.title} | Backend Engineering Topics`,
    description: `${topic.description} Explore the topic within the ${topic.groupTitle.toLowerCase()} learning path.`,
    keywords: topic.keywords,
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

  const relatedTopics = group.topics
    .filter((relatedTopic) => relatedTopic.slug !== topic.slug)
    .slice(0, 3)
    .map((relatedTopic) => ({
      slug: relatedTopic.slug,
      title: relatedTopic.title,
      description: relatedTopic.description,
    }));

  return (
    <TopicDetail
      slug={topic.slug}
      title={topic.title}
      description={topic.description}
      phase={topic.phase}
      keywords={topic.keywords}
      groupTitle={group.title}
      groupDescription={group.description}
      intro={group.intro}
      groupSlug={group.slug}
      groupTopics={group.topics}
      relatedTopics={relatedTopics}
      visual={topic.visual}
    />
  );
}
