"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { TopicGroup } from "@/data/topics";
import TopicGroupSection from "@/modules/layouts/topics/topic-group-section";

function TopicResultsInner({ groups }: { groups: TopicGroup[] }) {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const normalizedQuery = query.trim().toLowerCase();

  const hasMatches = groups.some((group) =>
    group.topics.some((topic) =>
      [topic.title, topic.description, ...topic.keywords]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    ),
  );

  return (
    <>
      {!hasMatches && (
        <p className="border-t border-black/10 px-5 py-16 text-center text-sm text-black/45 sm:px-8 lg:px-12">
          No published topics match &ldquo;{query}&rdquo; yet.
        </p>
      )}
      {groups.map((group, index) => (
        <TopicGroupSection key={group.slug} group={group} index={index} query={query} />
      ))}
    </>
  );
}

export default function TopicResults({ groups }: { groups: TopicGroup[] }) {
  return (
    <Suspense fallback={null}>
      <TopicResultsInner groups={groups} />
    </Suspense>
  );
}
