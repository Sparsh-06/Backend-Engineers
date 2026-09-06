"use client";

import { useState } from "react";

type Props = {
  titleHint: string;
};

function slugify(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ImageUploadField({ titleHint }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [filename, setFilename] = useState("");
  const [filenameTouched, setFilenameTouched] = useState(false);

  function handleFile(file: File | null) {
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
    if (file && !filenameTouched) {
      setFilename(slugify(titleHint));
    }
  }

  return (
    <div>
      <label className="block text-sm font-semibold">Hero image (optional)</label>
      <p className="mt-0.5 text-xs text-black/50">
        Upload the PNG already rendered through the topic-image pipeline - this doesn&rsquo;t generate one.
      </p>
      <div className="mt-1 flex items-start gap-4">
        <input
          type="file"
          name="image"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
          className="text-sm"
        />
        {previewUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Preview" className="h-16 w-auto rounded-md border border-black/15" />
        )}
      </div>
      <input
        className="mt-2 w-full rounded-md border border-black/20 px-3 py-2 font-mono text-sm"
        name="imageFilename"
        value={filename}
        onChange={(e) => {
          setFilenameTouched(true);
          setFilename(e.target.value);
        }}
        placeholder="descriptive-filename (no extension)"
      />
    </div>
  );
}
