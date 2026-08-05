import type { Metadata } from "next";
import TopicsHub from "@/modules/layouts/topics";

export const metadata: Metadata = {
  title: "Backend Engineering Topics",
  description:
    "A searchable learning hub for backend engineering topics, system design, cloud infrastructure, databases, and observability.",
  keywords: [
    "backend engineering topics",
    "system design topics",
    "cloud infrastructure",
    "observability",
    "learning paths",
  ],
  alternates: { canonical: "/topics" },
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
    title: "Backend Engineering Topics",
    description:
      "A searchable learning hub for backend engineering topics, system design, cloud infrastructure, databases, and observability.",
    url: "/topics",
    siteName: "Backend Engineer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Engineering Topics",
    description:
      "A searchable learning hub for backend engineering topics, system design, cloud infrastructure, databases, and observability.",
  },
};

export default function TopicsPage() {
  return <TopicsHub />;
}
