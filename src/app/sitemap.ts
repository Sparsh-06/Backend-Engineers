import type { MetadataRoute } from "next";
import { topicGroupsFlat } from "@/data/topics";

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

	return [...coreEntries, ...topicEntries];
}
