import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { topicGroupsFlat } from "@/data/topics";
import { architectureProfiles } from "@/data/architecture-profiles";
import { architectureDeepDives } from "@/data/architecture-deep-dives";
import { buildProjects } from "@/data/build-projects";

/**
 * Real file mtime for a piece of MDX content, falling back to `now` only if
 * the file can't be found - so `lastModified` reflects when a lesson or
 * project actually changed instead of claiming every page changed on every
 * build, which trains crawlers to stop trusting the signal.
 *
 * The directory is inlined as a literal at each call site (not passed through
 * a parameter) so Next's file tracer can statically prove the access is
 * scoped to that one subfolder, instead of conservatively bundling the whole
 * project into the deployment output.
 */
function topicMtime(slug: string): Date {
	for (const ext of [".mdx", ".md"]) {
		const filePath = path.join(process.cwd(), "src/content/topics", `${slug}${ext}`);
		if (fs.existsSync(filePath)) return fs.statSync(filePath).mtime;
	}
	return new Date();
}

function buildProjectMtime(slug: string): Date {
	for (const ext of [".mdx", ".md"]) {
		const filePath = path.join(process.cwd(), "src/content/build", `${slug}${ext}`);
		if (fs.existsSync(filePath)) return fs.statSync(filePath).mtime;
	}
	return new Date();
}

function architectureProfilesMtime(): Date {
	const filePath = path.join(process.cwd(), "src/data", "architecture-profiles.ts");
	return fs.existsSync(filePath) ? fs.statSync(filePath).mtime : new Date();
}

function architectureDeepDivesMtime(): Date {
	const filePath = path.join(process.cwd(), "src/data", "architecture-deep-dives.ts");
	return fs.existsSync(filePath) ? fs.statSync(filePath).mtime : new Date();
}

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://www.backendengineer.in";
	const now = new Date();

	const corePages = ["", "/topics", "/build", "/concepts", "/architecture", "/cloud", "/blog"];
	const coreEntries = corePages.map((path, index) => ({
		url: `${baseUrl}${path}`,
		lastModified: now,
		changeFrequency: index === 0 ? ("weekly" as const) : ("monthly" as const),
		priority: index === 0 ? 1 : 0.8,
	}));

	const topicEntries = topicGroupsFlat.map((topic) => ({
		url: `${baseUrl}/topics/${topic.slug}`,
		lastModified: topicMtime(topic.slug),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	// Architecture profiles and deep dives live as entries inside shared data
	// files rather than one file each, so the file's own mtime is the closest
	// real signal available - still far more accurate than "now" on every build.
	const profilesMtime = architectureProfilesMtime();
	const deepDivesMtime = architectureDeepDivesMtime();

	const architectureEntries = architectureProfiles.map((profile) => ({
		url: `${baseUrl}/architecture/${profile.slug}`,
		lastModified: profilesMtime,
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));
	const deepDiveEntries = architectureDeepDives.map((deepDive) => ({
		url: `${baseUrl}/architecture/${deepDive.companySlug}/${deepDive.slug}`,
		lastModified: deepDivesMtime,
		changeFrequency: "monthly" as const,
		priority: 0.65,
	}));

	const buildEntries = buildProjects.map((project) => ({
		url: `${baseUrl}/build/${project.slug}`,
		lastModified: buildProjectMtime(project.slug),
		changeFrequency: "monthly" as const,
		priority: 0.75,
	}));

	return [...coreEntries, ...topicEntries, ...architectureEntries, ...deepDiveEntries, ...buildEntries];
}
