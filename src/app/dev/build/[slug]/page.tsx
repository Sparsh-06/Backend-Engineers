import { notFound } from "next/navigation";
import BuildProjectForm from "@/modules/layouts/author/build-project-form";
import { getBuildProject } from "@/data/build-projects";
import { topicGroupsFlat } from "@/data/topics";
import { readBuildProjectMdxBody } from "@/lib/dev-authoring/build-project-writer";
import type { BuildProjectDraft } from "@/lib/dev-authoring/types";
import { updateBuildProject } from "./actions";

export default async function EditBuildProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getBuildProject(slug);
  if (!project) notFound();

  const initialData: BuildProjectDraft = {
    ...project,
    bodyMarkdown: readBuildProjectMdxBody(slug) ?? "",
  };

  const topicOptions = topicGroupsFlat.map((t) => ({ slug: t.slug, title: t.title }));

  return <BuildProjectForm action={updateBuildProject} initialData={initialData} topicOptions={topicOptions} />;
}
