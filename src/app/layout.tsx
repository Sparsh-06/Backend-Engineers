import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.backendengineer.in"),
  title: { default: "Backend Engineer — Backend Engineering, Made Clear", template: "%s | Backend Engineer" },
  description: "Master complex backend engineering, cloud architecture, and distributed systems with clear, visual breakdowns and step-by-step technical guides.",
  keywords: [
    "Backend Engineering",
    "System Design Guides",
    "Cloud Architecture Diagrams",
    "Distributed Systems Explained",
    "Microservices Architecture",
    "Scalability Patterns",
    "Database Sharding Explained",
  ],
  icons: {
    icon: '/favicon.png?v=2',
  },
  authors: [{ name: "Backend Engineer", url: "https://www.backendengineer.in" }],
  creator: "Sparsh Sharma",
  publisher: "Sparsh Sharma",
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
  openGraph: { type: "website", siteName: "Backend Engineer", title: "Backend Engineer — Backend Engineering, Made Clear", description: "Visual guides, system maps, and field notes for backend engineers.", url: "https://www.backendengineer.in" },
  twitter: { card: "summary_large_image", title: "Backend Engineer — Backend Engineering, Made Clear", description: "Visual guides, system maps, and field notes for backend engineers." },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <head>
        <link rel="icon" href="/favicon.png?v=2" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
