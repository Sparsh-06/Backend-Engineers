import type { CanvasGraphV1 } from "@/lib/canvas/serialize";

export interface CanvasPreset {
  slug: string;
  buildProjectSlug: string;
  title: string;
  tagline: string;
  graph: CanvasGraphV1;
}

export const canvasPresets: CanvasPreset[] = [
  {
    slug: "rate-limiter",
    buildProjectSlug: "rate-limiter",
    title: "Rate limiter",
    tagline: "See why a single Redis instance is the weak link.",
    graph: {
      v: 1,
      traffic: 1000,
      nodes: [
        { id: "client-1", type: "client", x: 40, y: 180, instances: 1, tier: "medium" },
        { id: "lb-1", type: "load-balancer", x: 320, y: 180, instances: 2, tier: "medium" },
        { id: "app-1", type: "app-server", x: 600, y: 180, instances: 3, tier: "medium" },
        {
          id: "cache-1",
          type: "cache",
          x: 880,
          y: 180,
          instances: 1,
          tier: "medium",
          hitRatio: 0,
          label: "Redis (counters)",
        },
      ],
      edges: [
        { id: "e1", source: "client-1", target: "lb-1" },
        { id: "e2", source: "lb-1", target: "app-1" },
        { id: "e3", source: "app-1", target: "cache-1" },
      ],
    },
  },
  {
    slug: "url-shortener",
    buildProjectSlug: "url-shortener",
    title: "URL shortener",
    tagline: "Read-heavy traffic, and one database that has to keep up.",
    graph: {
      v: 1,
      traffic: 2500,
      nodes: [
        { id: "client-1", type: "client", x: 40, y: 200, instances: 1, tier: "medium" },
        { id: "lb-1", type: "load-balancer", x: 300, y: 200, instances: 2, tier: "medium" },
        { id: "app-1", type: "app-server", x: 560, y: 200, instances: 2, tier: "medium" },
        {
          id: "cache-1",
          type: "cache",
          x: 820,
          y: 200,
          instances: 1,
          tier: "medium",
          hitRatio: 0.85,
          label: "Hot redirects",
        },
        { id: "db-1", type: "database", x: 1080, y: 200, instances: 1, tier: "medium" },
      ],
      edges: [
        { id: "e1", source: "client-1", target: "lb-1" },
        { id: "e2", source: "lb-1", target: "app-1" },
        { id: "e3", source: "app-1", target: "cache-1" },
        { id: "e4", source: "cache-1", target: "db-1" },
      ],
    },
  },
  {
    slug: "realtime-chat-server",
    buildProjectSlug: "realtime-chat-server",
    title: "Realtime chat server",
    tagline: "WebSocket servers and the broadcast fan-out behind them.",
    graph: {
      v: 1,
      traffic: 500,
      nodes: [
        { id: "client-1", type: "client", x: 40, y: 180, instances: 1, tier: "medium" },
        { id: "lb-1", type: "load-balancer", x: 320, y: 180, instances: 2, tier: "medium" },
        { id: "app-1", type: "app-server", x: 600, y: 180, instances: 2, tier: "medium", label: "WS servers" },
        {
          id: "queue-1",
          type: "queue",
          x: 880,
          y: 180,
          instances: 1,
          tier: "medium",
          label: "Redis Pub/Sub",
        },
      ],
      edges: [
        { id: "e1", source: "client-1", target: "lb-1" },
        { id: "e2", source: "lb-1", target: "app-1" },
        { id: "e3", source: "app-1", target: "queue-1" },
      ],
    },
  },
];

export function getCanvasPreset(slug: string) {
  return canvasPresets.find((preset) => preset.slug === slug);
}
