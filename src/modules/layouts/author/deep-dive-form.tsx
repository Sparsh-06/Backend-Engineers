"use client";

import { useActionState, useState } from "react";
import type { DeepDiveDraft } from "@/lib/dev-authoring/types";
import KeywordInput from "@/modules/components/author/keyword-input";

type State = { status: "idle" | "ok" | "error"; message?: string };
const initialState: State = { status: "idle" };

function KeyTermsRepeater({
  items,
  onChange,
}: {
  items: DeepDiveDraft["keyTermsUsed"];
  onChange: (items: DeepDiveDraft["keyTermsUsed"]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold">Key terms used</label>
      <div className="mt-1 space-y-1.5">
        {items.map((item, index) => (
          <div key={index} className="flex gap-1.5">
            <input
              className="w-40 rounded-md border border-black/20 px-2 py-1 text-sm"
              placeholder="Term"
              value={item.term}
              onChange={(e) => {
                const next = items.slice();
                next[index] = { ...item, term: e.target.value };
                onChange(next);
              }}
            />
            <input
              className="flex-1 rounded-md border border-black/20 px-2 py-1 text-sm"
              placeholder="Definition"
              value={item.definition}
              onChange={(e) => {
                const next = items.slice();
                next[index] = { ...item, definition: e.target.value };
                onChange(next);
              }}
            />
            <button type="button" className="text-xs text-black/40 hover:text-red-600" onClick={() => onChange(items.filter((_, i) => i !== index))}>
              remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="mt-2 text-xs font-semibold text-black/60 hover:text-black" onClick={() => onChange([...items, { term: "", definition: "" }])}>
        + add term
      </button>
    </div>
  );
}

function PipelineRepeater({
  items,
  onChange,
}: {
  items: DeepDiveDraft["pipeline"];
  onChange: (items: DeepDiveDraft["pipeline"]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold">Pipeline stages</label>
      <div className="mt-1 space-y-1.5">
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-8 gap-1.5">
            <input
              className="col-span-2 rounded-md border border-black/20 px-2 py-1 text-sm"
              placeholder="Label"
              value={item.label}
              onChange={(e) => {
                const next = items.slice();
                next[index] = { ...item, label: e.target.value };
                onChange(next);
              }}
            />
            <input
              className="col-span-3 rounded-md border border-black/20 px-2 py-1 text-sm"
              placeholder="Detail"
              value={item.detail}
              onChange={(e) => {
                const next = items.slice();
                next[index] = { ...item, detail: e.target.value };
                onChange(next);
              }}
            />
            <input
              className="col-span-2 rounded-md border border-black/20 px-2 py-1 text-sm"
              placeholder="Stat (optional)"
              value={item.stat ?? ""}
              onChange={(e) => {
                const next = items.slice();
                next[index] = { ...item, stat: e.target.value || undefined };
                onChange(next);
              }}
            />
            <button type="button" className="text-xs text-black/40 hover:text-red-600" onClick={() => onChange(items.filter((_, i) => i !== index))}>
              remove
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="mt-2 text-xs font-semibold text-black/60 hover:text-black" onClick={() => onChange([...items, { label: "", detail: "" }])}>
        + add stage
      </button>
    </div>
  );
}

function SectionsRepeater({
  items,
  onChange,
}: {
  items: DeepDiveDraft["sections"];
  onChange: (items: DeepDiveDraft["sections"]) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold">Sections</label>
      <p className="mt-0.5 text-xs text-black/50">Separate paragraphs within a section with a blank line.</p>
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
              <button type="button" className="text-xs text-black/40 hover:text-red-600" onClick={() => onChange(items.filter((_, i) => i !== index))}>
                remove
              </button>
            </div>
            <textarea
              className="w-full rounded-md border border-black/20 px-2 py-1 text-sm"
              rows={5}
              placeholder="Paragraph one.&#10;&#10;Paragraph two."
              value={item.body.join("\n\n")}
              onChange={(e) => {
                const next = items.slice();
                next[index] = { ...item, body: e.target.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) };
                onChange(next);
              }}
            />
          </div>
        ))}
      </div>
      <button type="button" className="mt-2 text-xs font-semibold text-black/60 hover:text-black" onClick={() => onChange([...items, { heading: "", body: [] }])}>
        + add section
      </button>
    </div>
  );
}

type Props = {
  action: (prevState: State, formData: FormData) => Promise<State>;
  initialData: DeepDiveDraft;
  companyOptions: { slug: string; company: string }[];
};

export default function DeepDiveForm({ action, initialData, companyOptions }: Props) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  const [companySlug, setCompanySlug] = useState(initialData.companySlug);
  const [title, setTitle] = useState(initialData.title);
  const [tagline, setTagline] = useState(initialData.tagline);
  const [seoKeywords, setSeoKeywords] = useState(initialData.seoKeywords);
  const [intro, setIntro] = useState(initialData.intro);
  const [keyTermsUsed, setKeyTermsUsed] = useState(initialData.keyTermsUsed);
  const [pipeline, setPipeline] = useState(initialData.pipeline);
  const [sections, setSections] = useState(initialData.sections);
  const [takeaway, setTakeaway] = useState(initialData.takeaway);
  const [sourceTitle, setSourceTitle] = useState(initialData.sourceTitle);
  const [sourceAuthors, setSourceAuthors] = useState(initialData.sourceAuthors);
  const [sourceUrl, setSourceUrl] = useState(initialData.sourceUrl);
  const [sourceNote, setSourceNote] = useState(initialData.sourceNote);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold">Edit deep dive: {initialData.title}</h1>
      <p className="mt-1 text-sm text-black/60">
        Patches <code className="rounded bg-black/5 px-1 py-0.5">architecture-deep-dives.ts</code>, found by
        companySlug + slug. No MDX file involved.
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
        <input type="hidden" name="originalCompanySlug" value={initialData.companySlug} />
        <input type="hidden" name="originalSlug" value={initialData.slug} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold">Company</label>
            <select
              className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
              name="companySlug"
              value={companySlug}
              onChange={(e) => setCompanySlug(e.target.value)}
            >
              {companyOptions.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.company}
                </option>
              ))}
            </select>
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

        <KeywordInput keywords={seoKeywords} onChange={setSeoKeywords} />
        <input type="hidden" name="seoKeywordsJson" value={JSON.stringify(seoKeywords)} />

        <div>
          <label className="block text-sm font-semibold">Intro</label>
          <textarea
            className="mt-1 w-full rounded-md border border-black/20 px-3 py-2"
            name="intro"
            rows={4}
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            required
          />
        </div>

        <KeyTermsRepeater items={keyTermsUsed} onChange={setKeyTermsUsed} />
        <input type="hidden" name="keyTermsUsedJson" value={JSON.stringify(keyTermsUsed)} />

        <PipelineRepeater items={pipeline} onChange={setPipeline} />
        <input type="hidden" name="pipelineJson" value={JSON.stringify(pipeline)} />

        <SectionsRepeater items={sections} onChange={setSections} />
        <input type="hidden" name="sectionsJson" value={JSON.stringify(sections)} />

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

        <div className="rounded-md border border-orange-300/60 bg-orange-50/50 p-3 space-y-3">
          <p className="text-xs font-semibold uppercase text-orange-700">
            Citation - the whole credibility bar for this content type
          </p>
          <input
            className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
            name="sourceTitle"
            placeholder="Source title"
            value={sourceTitle}
            onChange={(e) => setSourceTitle(e.target.value)}
            required
          />
          <KeywordInput keywords={sourceAuthors} onChange={setSourceAuthors} />
          <input type="hidden" name="sourceAuthorsJson" value={JSON.stringify(sourceAuthors)} />
          <input
            className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
            name="sourceUrl"
            placeholder="Source URL"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            required
          />
          <textarea
            className="w-full rounded-md border border-black/20 px-3 py-2 text-sm"
            name="sourceNote"
            rows={2}
            placeholder="Source note (attribution/credit text)"
            value={sourceNote}
            onChange={(e) => setSourceNote(e.target.value)}
            required
          />
        </div>

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
