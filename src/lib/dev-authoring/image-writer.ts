import fs from "fs";
import path from "path";

const EXT_BY_MIME: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

function slugifyFilename(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Saves an already-rendered hero image (uploaded through the form) to
 * public/topics/<slug>/, using a user-provided descriptive filename rather
 * than the browser's original filename - real export/screenshot filenames
 * ("Screenshot 2026-08-21.png") don't match the site's descriptive-filename
 * convention every existing image already follows.
 */
export async function saveTopicImage(input: { slug: string; file: File; filename: string }): Promise<string> {
  const ext = EXT_BY_MIME[input.file.type];
  if (!ext) {
    throw new Error(`Unsupported image type: ${input.file.type || "unknown"}`);
  }

  const safeName = slugifyFilename(input.filename) || "hero";
  const dir = path.join(process.cwd(), "public/topics", input.slug);
  fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `${safeName}.${ext}`);
  const buffer = Buffer.from(await input.file.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  return `/topics/${input.slug}/${safeName}.${ext}`;
}

export function topicImageDir(slug: string): string {
  return path.join(process.cwd(), "public/topics", slug);
}
