import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap { const baseUrl = "https://backendengineers.dev"; return ["", "/concepts", "/architecture", "/cloud", "/blog"].map((path, index) => ({ url: `${baseUrl}${path}`, lastModified: new Date(), changeFrequency: index === 0 ? "weekly" : "monthly", priority: index === 0 ? 1 : 0.8 })); }
