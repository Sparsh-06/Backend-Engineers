import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.backendengineer.in"),
  title: {
    default: "Backend Engineer — Backend Engineering, Made Clear",
    template: "%s | Backend Engineer",
  },
  description:
    "Master complex backend engineering, cloud architecture, and distributed systems with clear, visual breakdowns and step-by-step technical guides.",
  keywords: [
    // Core Engineering & Architecture
    "Backend Engineering",
    "Backend Development",
    "Software Architecture",
    "System Design",
    "Distributed Systems",
    "Microservices Architecture",
    "Monolith to Microservices",
    "Cloud Architecture",
    "System Design Interview",
    "System Design Cheatsheet",
    
    // API & Protocols
    "API Design",
    "REST API",
    "GraphQL vs REST",
    "gRPC Architecture",
    "WebSockets",
    "Server-Sent Events",
    "HTTP2 vs HTTP3",
    "API Gateway",
    "Reverse Proxy",
    
    // Scaling & Infrastructure
    "High Availability",
    "Horizontal Scaling",
    "Load Balancing Algorithms",
    "Rate Limiting",
    "Circuit Breaker Pattern",
    "Consistent Hashing",
    "Distributed Caching",
    "Redis Caching Strategies",
    "Message Queues",
    "Apache Kafka",
    "RabbitMQ",
    "Event-Driven Architecture",
    
    // Databases & Storage
    "Database Sharding",
    "Database Replication",
    "SQL vs NoSQL",
    "PostgreSQL Indexing",
    "B-Tree Indexes",
    "ACID vs BASE",
    "Database Connection Pooling",
    "Redis Data Structures",
    
    // Runtimes & Cloud
    "Node.js Event Loop",
    "Node.js Architecture",
    "Golang Concurrency",
    "Goroutines",
    "FastAPI Backend",
    "Docker Containers",
    "Kubernetes Basics",
    "AWS Infrastructure",
    "Serverless Architecture",
    "Distributed Tracing",
  ],
  icons: {
    icon: "/favicon.png?v=2",
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
  openGraph: {
    type: "website",
    siteName: "Backend Engineer",
    title: "Backend Engineer — Backend Engineering, Made Clear",
    description: "Visual guides, system maps, and field notes for backend engineers.",
    url: "https://www.backendengineer.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Engineer — Backend Engineering, Made Clear",
    description: "Visual guides, system maps, and field notes for backend engineers.",
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        {children}

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-4PE3VQL597"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4PE3VQL597');
          `}
        </Script>
      </body>
    </html>
  );
}