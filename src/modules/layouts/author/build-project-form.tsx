"use client";

import { useActionState, useState } from "react";
import type { BuildProjectDraft } from "@/lib/dev-authoring/types";
import KeywordInput from "@/modules/components/author/keyword-input";
import BodyEditor from "@/modules/components/author/body-editor";

type State = { status: "idle" | "ok" | "error"; message?: string };
const initialState: State = { status: "idle" };

function StringListRepeater({
  items,
  onChange,
  label,
}: {
  items: string[];
  onChange: (items: string[]) => void;
  label: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold">{label}</label>
      <div className="mt-1 space-y-1.5">
        {items.map((item, index) => (
          <div key={index} className="flex gap-1.5">
            <input
              className="flex-1 rounded-md border border-black/20 px-2 py-1 text-sm"
              value={item}
              onChange={(e) => {
                const next = items.slice();
                next[index] = e.target.value;
                onChange(next);
              }}
            />
            <button type="button" className="text-xs text-black/40 hover:text-red-600" onClick={() => onChange(items.filter((_, i) => i !== index))}>
              remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="mt-2 text-xs font-semibold text-black/60 hover:text-black" onClick={() => onChange([...items, ""])}>
        + add
      </button>
    </div>
  );
}

type Props = {
  action: (prevState: State, formData: FormData) => Promise<State>;
  initialData: BuildProjectDraft;
  topicOptions: { slug: string; title: string }[];
};

export default function BuildProjectForm({ action, initialData, topicOptions }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const [title, setTitle] = useState(initialData.title);
  const [tagline, setTagline] = useState(initialData.tagline);
  const [description, setDescription] = useState(initialData.description);
  const [difficulty, setDifficulty] = useState(initialData.difficulty);
  const [timeEstimate, setTimeEstimate] = useState(initialData.timeEstimate);
  const [stack, setStack] = useState(initialData.stack);
  const [keywords, setKeywords] = useState(initialData.keywords);
  const [whatYoullBuild, setWhatYoullBuild] = useState(initialData.whatYoullBuild);
  const [relatedTopicSlugs, setRelatedTopicSlugs] = useState(initialData.relatedTopicSlugs);
  const [bodyMarkdown, setBodyMarkdown] = useState(initialData.bodyMarkdown);

  function toggleRelatedTopic(slug: string) {
    setRelatedTopicSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold">Edit build project: {initialData.title}</h1>
      <p className="mt-1 text-sm text-black/60">
        Patches <code className="rounded bg-black/5 px-1 py-0.5">build-projects.ts</code> and its paired{" "}
        <code className="rounded bg-black/5 px-1 py-0.5">.mdx</code> file - title/description/keywords/
        difficulty are kept in sync between both.
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
        <input type="hidden" name="originalSlug" value={initialData.slug} />

        <div>
          <label className="block text-sm font-semibold">Slug</label>
          <input
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2 font-mono text-sm"
            name="slug"
            defaultValue={initialData.slug}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Title</label>
          <input
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Tagline</label>
          <input
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
            name="tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Description</label>
          <textarea
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
            name="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold">Difficulty</label>
            <select
              className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
              name="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as BuildProjectDraft["difficulty"])}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold">Time estimate</label>
            <input
              className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
              name="timeEstimate"
              value={timeEstimate}
              onChange={(e) => setTimeEstimate(e.target.value)}
              required
            />
          </div>
        </div>

        <KeywordInput keywords={stack} onChange={setStack} />
        <input type="hidden" name="stackJson" value={JSON.stringify(stack)} />
        <p className="-mt-4 text-xs text-black/50">Stack (reusing the tag input for a simple string list).</p>

        <KeywordInput keywords={keywords} onChange={setKeywords} />
        <input type="hidden" name="keywordsJson" value={JSON.stringify(keywords)} />

        <StringListRepeater items={whatYoullBuild} onChange={setWhatYoullBuild} label="What you'll build" />
        <input type="hidden" name="whatYoullBuildJson" value={JSON.stringify(whatYoullBuild)} />

        <div>
          <label className="block text-sm font-semibold">Related topics</label>
          <div className="mt-1 grid gap-1.5 sm:grid-cols-2">
            {topicOptions.map((topic) => (
              <label key={topic.slug} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={relatedTopicSlugs.includes(topic.slug)}
                  onChange={() => toggleRelatedTopic(topic.slug)}
                />
                {topic.title}
              </label>
            ))}
          </div>
          <input type="hidden" name="relatedTopicSlugsJson" value={JSON.stringify(relatedTopicSlugs)} />
        </div>

        <BodyEditor value={bodyMarkdown} onChange={setBodyMarkdown} />
        <input type="hidden" name="bodyMarkdown" value={bodyMarkdown} />

        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ff4d00] disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
