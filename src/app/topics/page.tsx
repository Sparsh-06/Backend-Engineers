import type { Metadata } from "next";
import TopicsHub from "@/modules/layouts/topics";
import { visibleTopicGroups } from "@/data/topics";

const siteName = "Backend Engineer";
const description =
  "A searchable learning hub for backend engineering - server and networking fundamentals, Node.js runtime internals, and protocols and API design, each explained in plain English with interactive visuals.";

export const metadata: Metadata = {
  title: "Backend Engineering Topics",
  description,
  keywords: [
    "backend engineering topics",
    "learn backend engineering",
    "backend engineering curriculum",
    "backend engineering for beginners",
    "system design topics",
    "node js internals explained",
    "http and networking basics",
    "backend engineering learning path",
    "what is a backend engineer",
    "client-server model explained",
    "protocols and apis explained",
    "backend fundamentals",
    "node js event loop explained",
    "rest vs graphql vs grpc",
    "backend engineering roadmap",
  ],
  alternates: { canonical: "/topics" },
  authors: [{ name: "Sparsh Sharma" }],
  creator: "Sparsh Sharma",
  publisher: siteName,
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
    description,
    url: "/topics",
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Engineering Topics",
    description,
  },
};

const topicsHubSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Backend Engineering Topics",
  description,
  url: "https://www.backendengineer.in/topics",
  isPartOf: {
    "@type": "WebSite",
    name: siteName,
    url: "https://www.backendengineer.in",
  },
  hasPart: visibleTopicGroups.map((group) => ({
    "@type": "ItemList",
    name: group.title,
    description: group.description,
    url: `https://www.backendengineer.in/topics#${group.slug}`,
    numberOfItems: group.topics.length,
    itemListElement: group.topics.map((topic, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: topic.title,
      url: `https://www.backendengineer.in/topics/${topic.slug}`,
    })),
  })),
};

export default function TopicsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(topicsHubSchema) }}
      />
      <TopicsHub />
    </>
  );
}
