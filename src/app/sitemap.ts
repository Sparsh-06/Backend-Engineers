import type { MetadataRoute } from "next";
import { topicGroupsFlat } from "@/data/topics";
import { architectureProfiles } from "@/data/architecture-profiles";
import { architectureDeepDives } from "@/data/architecture-deep-dives";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://www.backendengineer.in";
	const corePages = ["", "/topics", "/concepts", "/architecture", "/cloud", "/blog"];
	const coreEntries = corePages.map((path, index) => ({
		url: `${baseUrl}${path}`,
		lastModified: new Date(),
		changeFrequency: index === 0 ? ("weekly" as const) : ("monthly" as const),
		priority: index === 0 ? 1 : 0.8,
	}));
	const topicEntries = topicGroupsFlat.map((topic) => ({
		url: `${baseUrl}/topics/${topic.slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));
	const architectureEntries = architectureProfiles.map((profile) => ({
		url: `${baseUrl}/architecture/${profile.slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));
	const deepDiveEntries = architectureDeepDives.map((deepDive) => ({
		url: `${baseUrl}/architecture/${deepDive.companySlug}/${deepDive.slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.65,
	}));

	return [...coreEntries, ...topicEntries, ...architectureEntries, ...deepDiveEntries];
}
