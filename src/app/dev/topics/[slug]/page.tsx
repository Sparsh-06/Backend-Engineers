import { notFound } from "next/navigation";
import TopicForm, { type TopicFormInitialData } from "@/modules/layouts/author/topic-form";
import { updateTopic } from "../../new-topic/actions";
import { topicGroups, topicGroupsFlat } from "@/data/topics";
import { readTopicMdxBody } from "@/lib/dev-authoring/mdx-writer";

// Deliberately searches raw topicGroups (not the published-only
// topicGroupsFlat/getTopicBySlug helpers) so drafts are editable too.
function findAnyTopicBySlug(slug: string) {
  for (const group of topicGroups) {
    const topic = group.topics.find((t) => t.slug === slug);
    if (topic) return { topic, groupSlug: group.slug };
  }
  return undefined;
}

export default async function EditTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = findAnyTopicBySlug(slug);
  if (!found) notFound();

  const { topic, groupSlug } = found;

  const initialData: TopicFormInitialData = {
    slug: topic.slug,
    title: topic.title,
    description: topic.description,
    keywords: topic.keywords,
    groupSlug,
    bodyMarkdown: readTopicMdxBody(topic.slug) ?? "",
    // topicGroupsFlat is derived from the published-only filter, so
    // membership there is exactly "is this topic published" without
    // needing direct access to the unexported publishedTopicSlugs Set.
    publish: topicGroupsFlat.some((t) => t.slug === topic.slug),
    heroVisual: topic.visual ?? null,
    poolVisuals: (topic.visuals ?? []).filter((v): v is typeof v & { id: string } => Boolean(v.id)),
    existingImage: topic.image,
  };

  return <TopicForm mode="edit" action={updateTopic} initialData={initialData} />;
}
