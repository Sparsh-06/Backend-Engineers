// Screenshots an HTML file's #canvas element to a PNG.
// Usage: node scripts/topic-image/render.mjs [input-html] [output-path]
// - 0 args: renders canvas.html -> output.png (default single-author loop)
// - 1 arg:  renders canvas.html -> <arg> (existing usage, still supported)
// - 2 args: renders <arg1> -> <arg2> (parallel/multi-agent usage - point at
//   your own scratch HTML file so concurrent renders don't collide)

import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));

const [arg1, arg2] = process.argv.slice(2);
const htmlPath = arg2 ? path.resolve(arg1) : path.join(dir, "canvas.html");
const outputPath = path.resolve(arg2 ?? arg1 ?? path.join(dir, "output.png"));

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
await page.goto(`file://${htmlPath}`);
const canvas = page.locator("#canvas");
await canvas.screenshot({ path: outputPath });
await browser.close();

console.log(`Saved ${outputPath}`);
