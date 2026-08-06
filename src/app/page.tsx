import type { Metadata } from "next";
import Home from "@/modules/layouts/home";

export const metadata: Metadata = {
  title: "Backend Engineering",
  description:
    "A visual-first backend engineering platform covering concepts, cloud, architecture, and field notes with guides and interactive explainers.",
  keywords: [
    "backend engineering",
    "system design",
    "distributed systems",
    "cloud architecture",
    "technical guides",
    "backend engineer",
    "backend developer",
    "what is backend engineering",
    "learn backend engineering",
    "backend engineering for beginners",
    "backend roadmap",
    "system design interview prep",
    "client-server model",
    "how does a server work",
    "backend fundamentals",
    "software architecture",
    "API design",
    "database systems",
    "scalability",
    "backend engineering topics",
  ],
  alternates: { canonical: "/" },
  authors: [{ name: "Sparsh Sharma" }],
  creator: "Sparsh Sharma",
  publisher: "Backend Engineer",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Backend Engineering",
    description:
      "A visual-first backend engineering platform covering concepts, cloud, architecture, and field notes with guides and interactive explainers.",
    url: "/",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Engineering",
    description:
      "A visual-first backend engineering platform covering concepts, cloud, architecture, and field notes with guides and interactive explainers.",
  },
};

export default function Page() {
  return <Home />;
}
