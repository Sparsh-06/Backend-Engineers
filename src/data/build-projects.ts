export type BuildProject = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  timeEstimate: string;
  stack: string[];
  keywords: string[];
  whatYoullBuild: string[];
  relatedTopicSlugs: string[];
};

export const buildProjects: BuildProject[] = [
  {
    slug: "rate-limiter",
    title: "Build a rate limiter",
    tagline: "Stop one client from taking down your API for everyone else",
    description:
      "A token-bucket rate limiter from scratch in Node.js - the same core idea behind every 'too many requests' response you've ever hit, built so you actually understand the trade-offs instead of just importing a library.",
    difficulty: "Beginner",
    timeEstimate: "45-60 min",
    stack: ["Node.js", "Redis"],
    keywords: [
      "how to build a rate limiter",
      "token bucket algorithm explained",
      "rate limiting node js",
      "build rate limiter from scratch",
      "sliding window vs token bucket",
      "redis rate limiter",
      "api rate limiting tutorial",
      "how does rate limiting work",
      "distributed rate limiter",
      "leaky bucket vs token bucket",
    ],
    whatYoullBuild: [
      "An in-memory token-bucket limiter you can reason about line by line",
      "A Redis-backed version that works correctly across multiple server instances",
      "A real understanding of why 'just count requests' breaks under real traffic",
    ],
    relatedTopicSlugs: ["latency-vs-throughput", "idempotency", "backend-components"],
  },
  {
    slug: "url-shortener",
    title: "Build a URL shortener",
    tagline: "The 'simple' system design interview question that isn't simple once you scale it",
    description:
      "A working URL shortener - short code generation, redirects, and the collision and race-condition problems that only show up once more than one request hits the system at the same time.",
    difficulty: "Beginner",
    timeEstimate: "45-60 min",
    stack: ["Node.js", "PostgreSQL"],
    keywords: [
      "how to build a url shortener",
      "url shortener system design",
      "base62 encoding explained",
      "url shortener tutorial node js",
      "how does bit.ly work",
      "short url collision handling",
      "url shortener database design",
      "build tinyurl clone",
      "unique id generation backend",
      "url shortener race condition",
    ],
    whatYoullBuild: [
      "A short-code generator using base62 encoding, and why that beats random strings",
      "A redirect endpoint that actually handles the read-heavy traffic pattern this system has",
      "A fix for the exact race condition that shows up the first time two requests collide on the same code",
    ],
    relatedTopicSlugs: ["idempotency", "json-and-serialization", "what-is-an-api"],
  },
  {
    slug: "realtime-chat-server",
    title: "Build a real-time chat server",
    tagline: "What actually happens underneath every WebSocket-powered app",
    description:
      "A minimal real-time chat server over WebSockets - connection state, broadcasting to a room, and what changes the moment you need more than one server process handling connections.",
    difficulty: "Intermediate",
    timeEstimate: "60-90 min",
    stack: ["Node.js", "WebSockets", "Redis Pub/Sub"],
    keywords: [
      "how to build a chat server",
      "websocket server node js tutorial",
      "real-time chat architecture",
      "websocket vs http explained",
      "how does websocket broadcasting work",
      "scaling websockets across servers",
      "redis pub sub websocket",
      "build a chat app backend",
      "websocket connection state",
      "real-time messaging system design",
    ],
    whatYoullBuild: [
      "A raw WebSocket server that tracks connected clients and rooms without a framework hiding the mechanics",
      "Message broadcasting to everyone in a room, and why that's harder than it sounds under memory pressure",
      "The exact problem that appears the moment you run two server instances, and how Redis Pub/Sub fixes it",
    ],
    relatedTopicSlugs: ["nodejs-event-loop", "sync-vs-async", "backend-components"],
  },
];

export function getBuildProject(slug: string) {
  return buildProjects.find((project) => project.slug === slug);
}
