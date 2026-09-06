"use client";

import { useActionState, useMemo, useState } from "react";
import { TOPIC_GROUPS } from "@/lib/dev-authoring/types";
import type { VisualDraft, CreateTopicState } from "@/lib/dev-authoring/types";
import KeywordInput from "@/modules/components/author/keyword-input";
import GroupPhaseSelect from "@/modules/components/author/group-phase-select";
import ImageUploadField from "@/modules/components/author/image-upload-field";
import BodyEditor from "@/modules/components/author/body-editor";
import VisualPicker from "@/modules/components/author/visuals/visual-picker";

const initialState: CreateTopicState = { status: "idle" };

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type TopicFormInitialData = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  groupSlug: string;
  bodyMarkdown: string;
  publish: boolean;
  heroVisual: VisualDraft | null;
  poolVisuals: (VisualDraft & { id: string })[];
  existingImage?: string;
};

type Props = {
  mode: "create" | "edit";
  action: (prevState: CreateTopicState, formData: FormData) => Promise<CreateTopicState>;
  initialData?: TopicFormInitialData;
};

export default function TopicForm({ mode, action, initialData }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [description, setDescription] = useState(initialData?.description ?? "");
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords ?? []);
  const [groupSlug, setGroupSlug] = useState<string>(initialData?.groupSlug ?? TOPIC_GROUPS[0].slug);
  const [bodyMarkdown, setBodyMarkdown] = useState(initialData?.bodyMarkdown ?? "");
  const [publish, setPublish] = useState(initialData?.publish ?? false);
  const [heroVisual, setHeroVisual] = useState<VisualDraft | null>(initialData?.heroVisual ?? null);
  const [poolVisuals, setPoolVisuals] = useState<(VisualDraft & { id: string })[]>(
    initialData?.poolVisuals ?? [],
  );

  const phase = useMemo(() => TOPIC_GROUPS.find((g) => g.slug === groupSlug)?.phase ?? "", [groupSlug]);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold">{mode === "create" ? "New topic" : `Edit: ${initialData?.title}`}</h1>
      <p className="mt-1 text-sm text-black/60">
        Writes a real <code className="rounded bg-black/5 px-1 py-0.5">.mdx</code> file and{" "}
        {mode === "create" ? "appends to" : "patches"}{" "}
        <code className="rounded bg-black/5 px-1 py-0.5">topics.ts</code> - review the diff and commit
        yourself, nothing is pushed automatically.
      </p>

      {state.status === "ok" && (
        <div className="mt-4 rounded-lg border border-green-600/30 bg-green-50 px-4 py-3 text-sm text-green-800">
          {state.message}
        </div>
      )}
      {state.status === "error" && (
        <div className="mt-4 rounded-lg border border-red-600/30 bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </div>
      )}

      <form action={formAction} className="mt-6 space-y-6">
        {mode === "edit" && initialData && (
          <>
            <input type="hidden" name="originalSlug" value={initialData.slug} />
            <input type="hidden" name="wasPublished" value={initialData.publish ? "on" : ""} />
          </>
        )}

        <div>
          <label className="block text-sm font-semibold">Title</label>
          <input
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
            name="title"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Slug</label>
          <input
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2 font-mono text-sm"
            name="slug"
            value={slug}
            onChange={(e) => {
              setSlugTouched(true);
              setSlug(slugify(e.target.value));
            }}
            required
          />
          {mode === "edit" && slug !== initialData?.slug && (
            <p className="mt-1 text-xs text-amber-700">
              Renaming from &ldquo;{initialData?.slug}&rdquo; - the old .mdx file will be removed and a new
              one written.
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
            name="description"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <KeywordInput keywords={keywords} onChange={setKeywords} />
        <input type="hidden" name="keywordsJson" value={JSON.stringify(keywords)} />

        <GroupPhaseSelect groupSlug={groupSlug} phase={phase} onGroupChange={setGroupSlug} />

        <BodyEditor value={bodyMarkdown} onChange={setBodyMarkdown} />
        <input type="hidden" name="bodyMarkdown" value={bodyMarkdown} />

        {initialData?.existingImage && (
          <p className="text-xs text-black/50">
            Current image: <code className="rounded bg-black/5 px-1 py-0.5">{initialData.existingImage}</code>{" "}
            - upload a new one below only if you want to replace it.
          </p>
        )}
        <ImageUploadField titleHint={title} />

        <VisualPicker
          heroVisual={heroVisual}
          onHeroChange={setHeroVisual}
          poolVisuals={poolVisuals}
          onPoolChange={setPoolVisuals}
        />
        <input type="hidden" name="heroVisualJson" value={heroVisual ? JSON.stringify(heroVisual) : ""} />
        <input type="hidden" name="poolVisualsJson" value={JSON.stringify(poolVisuals)} />

        <label className="flex items-center gap-2 text-sm font-semibold">
          <input
            type="checkbox"
            name="publish"
            checked={publish}
            onChange={(e) => setPublish(e.target.checked)}
          />
          Publish immediately (unchecked = draft, matches <code>publishedTopicSlugs</code>)
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff4d00] disabled:opacity-50"
        >
          {isPending ? "Saving..." : mode === "create" ? "Create topic" : "Save changes"}
        </button>
      </form>
    </div>
  );
}
