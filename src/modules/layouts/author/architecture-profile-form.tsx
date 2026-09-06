"use client";

import { useActionState, useState } from "react";
import type { ArchitectureProfileDraft } from "@/lib/dev-authoring/types";
import KeywordInput from "@/modules/components/author/keyword-input";

type State = { status: "idle" | "ok" | "error"; message?: string };
const initialState: State = { status: "idle" };

function TechStackRepeater({
  items,
  onChange,
}: {
  items: ArchitectureProfileDraft["techStack"];
  onChange: (items: ArchitectureProfileDraft["techStack"]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold">Tech stack</label>
      <div className="mt-1 space-y-2">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-8 gap-1.5">
            <input
              className="col-span-2 rounded-md border border-black/20 px-2 py-1 text-sm"
              placeholder="Name"
              value={item.name}
              onChange={(e) => {
                const next = items.slice();
                next[index] = { ...item, name: e.target.value };
                onChange(next);
              }}
            />
            <input
              className="col-span-2 rounded-md border border-black/20 px-2 py-1 text-sm"
              placeholder="Category"
              value={item.category}
              onChange={(e) => {
                const next = items.slice();
                next[index] = { ...item, category: e.target.value };
                onChange(next);
              }}
            />
            <input
              className="col-span-3 rounded-md border border-black/20 px-2 py-1 text-sm"
              placeholder="What it's for"
              value={item.whatItsFor}
              onChange={(e) => {
                const next = items.slice();
                next[index] = { ...item, whatItsFor: e.target.value };
                onChange(next);
              }}
            />
            <button
              type="button"
              className="text-xs text-black/40 hover:text-red-600"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-2 text-xs font-semibold text-black/60 hover:text-black"
        onClick={() => onChange([...items, { name: "", category: "", whatItsFor: "" }])}
      >
        + add tech
      </button>
    </div>
  );
}

function ApproachRepeater({
  items,
  onChange,
}: {
  items: ArchitectureProfileDraft["approach"];
  onChange: (items: ArchitectureProfileDraft["approach"]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold">Approach</label>
      <div className="mt-1 space-y-2">
        {items.map((item, index) => (
          <div key={index} className="rounded-md border border-black/15 p-3 space-y-2">
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-md border border-black/20 px-2 py-1 text-sm"
                placeholder="Heading"
                value={item.heading}
                onChange={(e) => {
                  const next = items.slice();
                  next[index] = { ...item, heading: e.target.value };
                  onChange(next);
                }}
              />
              <button
                type="button"
                className="text-xs text-black/40 hover:text-red-600"
                onClick={() => onChange(items.filter((_, i) => i !== index))}
              >
                remove
              </button>
            </div>
            <textarea
              className="w-full rounded-md border border-black/20 px-2 py-1 text-sm"
              rows={3}
              placeholder="Body"
              value={item.body}
              onChange={(e) => {
                const next = items.slice();
                next[index] = { ...item, body: e.target.value };
                onChange(next);
              }}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-2 text-xs font-semibold text-black/60 hover:text-black"
        onClick={() => onChange([...items, { heading: "", body: "" }])}
      >
        + add approach section
      </button>
    </div>
  );
}

type Props = {
  action: (prevState: State, formData: FormData) => Promise<State>;
  initialData: ArchitectureProfileDraft;
};

export default function ArchitectureProfileForm({ action, initialData }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const [company, setCompany] = useState(initialData.company);
  const [logo, setLogo] = useState(initialData.logo);
  const [tagline, setTagline] = useState(initialData.tagline);
  const [problem, setProblem] = useState(initialData.problem);
  const [scaleContext, setScaleContext] = useState(initialData.scaleContext);
  const [seoKeywords, setSeoKeywords] = useState(initialData.seoKeywords);
  const [techStack, setTechStack] = useState(initialData.techStack);
  const [approach, setApproach] = useState(initialData.approach);
  const [microservicesNote, setMicroservicesNote] = useState(initialData.microservicesNote);
  const [takeaway, setTakeaway] = useState(initialData.takeaway);
  const [sources, setSources] = useState(initialData.sources);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold">Edit architecture profile: {initialData.company}</h1>
      <p className="mt-1 text-sm text-black/60">
        Patches <code className="rounded bg-black/5 px-1 py-0.5">architecture-profiles.ts</code> directly - no
        MDX file involved. Title/description on the live page are derived from tagline + problem, so those two
        fields are the real SEO surface.
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

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold">Company</label>
            <input
              className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold">Logo path</label>
            <input
              className="mt-1 w-full rounded-md border border-black/20 px-3 py-2 font-mono text-sm"
              name="logo"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold">Slug</label>
          <input
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2 font-mono text-sm"
            name="slug"
            defaultValue={initialData.slug}
            required
          />
        </div>

        <div className="rounded-md border border-orange-300/60 bg-orange-50/50 p-3 space-y-3">
          <p className="text-xs font-semibold uppercase text-orange-700">SEO-load-bearing fields</p>
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
            <label className="block text-sm font-semibold">Problem</label>
            <textarea
              className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
              name="problem"
              rows={3}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              required
            />
          </div>
          <KeywordInput keywords={seoKeywords} onChange={setSeoKeywords} />
          <input type="hidden" name="seoKeywordsJson" value={JSON.stringify(seoKeywords)} />
        </div>

        <div>
          <label className="block text-sm font-semibold">Scale context</label>
          <textarea
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
            name="scaleContext"
            rows={3}
            value={scaleContext}
            onChange={(e) => setScaleContext(e.target.value)}
            required
          />
        </div>

        <TechStackRepeater items={techStack} onChange={setTechStack} />
        <input type="hidden" name="techStackJson" value={JSON.stringify(techStack)} />

        <ApproachRepeater items={approach} onChange={setApproach} />
        <input type="hidden" name="approachJson" value={JSON.stringify(approach)} />

        <div>
          <label className="block text-sm font-semibold">Microservices note</label>
          <textarea
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
            name="microservicesNote"
            rows={3}
            value={microservicesNote}
            onChange={(e) => setMicroservicesNote(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Takeaway</label>
          <textarea
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
            name="takeaway"
            rows={3}
            value={takeaway}
            onChange={(e) => setTakeaway(e.target.value)}
            required
          />
        </div>

        <KeywordInput keywords={sources} onChange={setSources} />
        <input type="hidden" name="sourcesJson" value={JSON.stringify(sources)} />
        <p className="-mt-4 text-xs text-black/50">Sources (reusing the tag input - each entry is a URL/citation string).</p>

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
