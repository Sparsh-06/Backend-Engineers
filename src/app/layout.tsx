import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://backendengineers.dev"),
  title: { default: "B.Engineers — Backend Engineering, Made Clear", template: "%s | B.Engineers" },
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
  openGraph: { type: "website", siteName: "B.Engineers", title: "B.Engineers — Backend Engineering, Made Clear", description: "Visual guides, system maps, and field notes for backend engineers." },
  twitter: { card: "summary_large_image", title: "B.Engineers — Backend Engineering, Made Clear", description: "Visual guides, system maps, and field notes for backend engineers." },
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
