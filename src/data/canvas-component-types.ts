import { getTechnologiesForType, type CanvasTechnologyDef } from "./canvas-technologies";

export type CanvasComponentType =
  | "client"
  | "cdn"
  | "load-balancer"
  | "app-server"
  | "cache"
  | "queue"
  | "database";

export type CanvasNodeTier = "small" | "medium" | "large";

export interface CanvasComponentTypeDef {
  type: CanvasComponentType;
  label: string;
  shortLabel: string;
  description: string;
  /** req/s a single "medium" tier instance can sustain. */
  baseCapacityRps: number;
  defaultInstances: number;
  maxInstances: number;
  /** false only for "client" - clients don't have a capacity ceiling to blow past. */
  isCapacityBearing: boolean;
  /** false for client/cdn - a lone instance of these isn't flagged as a single point of failure. */
  supportsSpof: boolean;
  supportsHitRatio: boolean;
  defaultHitRatio?: number;
  /** Directed adjacency: which types this node is allowed to connect out to. */
  validTargets: CanvasComponentType[];
  /** Populated below from canvas-technologies.ts - empty for roles with no meaningful tech variant (client). */
  technologies: CanvasTechnologyDef[];
}

export const TIER_MULTIPLIER: Record<CanvasNodeTier, number> = {
  small: 0.5,
  medium: 1,
  large: 2,
};

export const TIER_LABELS: Record<CanvasNodeTier, string> = {
  small: "Small",
  medium: "Medium",
  large: "Large",
};

const componentTypeShapes: Omit<CanvasComponentTypeDef, "technologies">[] = [
  {
    type: "client",
    label: "Client",
    shortLabel: "Client",
    description: "Where traffic originates - browsers, mobile apps, other services.",
    baseCapacityRps: Infinity,
    defaultInstances: 1,
    maxInstances: 1,
    isCapacityBearing: false,
    supportsSpof: false,
    supportsHitRatio: false,
    validTargets: ["cdn", "load-balancer", "app-server"],
  },
  {
    type: "cdn",
    label: "CDN",
    shortLabel: "CDN",
    description: "Edge caching for static or cacheable content, sitting in front of your origin.",
    baseCapacityRps: 20000,
    defaultInstances: 1,
    maxInstances: 1,
    isCapacityBearing: true,
    supportsSpof: false,
    supportsHitRatio: true,
    defaultHitRatio: 0.6,
    validTargets: ["load-balancer", "app-server"],
  },
  {
    type: "load-balancer",
    label: "Load Balancer",
    shortLabel: "LB",
    description: "Distributes incoming traffic evenly across app server instances.",
    baseCapacityRps: 8000,
    defaultInstances: 1,
    maxInstances: 6,
    isCapacityBearing: true,
    supportsSpof: true,
    supportsHitRatio: false,
    validTargets: ["app-server"],
  },
  {
    type: "app-server",
    label: "App Server",
    shortLabel: "App",
    description: "Runs your application logic - the CPU-bound tier that usually bottlenecks first.",
    baseCapacityRps: 300,
    defaultInstances: 2,
    maxInstances: 20,
    isCapacityBearing: true,
    supportsSpof: true,
    supportsHitRatio: false,
    validTargets: ["cache", "database", "queue", "app-server"],
  },
  {
    type: "cache",
    label: "Cache",
    shortLabel: "Cache",
    description: "In-memory read-through cache (e.g. Redis or Memcached) in front of the database.",
    baseCapacityRps: 5000,
    defaultInstances: 1,
    maxInstances: 6,
    isCapacityBearing: true,
    supportsSpof: true,
    supportsHitRatio: true,
    defaultHitRatio: 0.75,
    validTargets: ["database"],
  },
  {
    type: "queue",
    label: "Queue / Broker",
    shortLabel: "Queue",
    description: "Message queue or broker (e.g. Kafka, SQS, or Redis pub/sub) that decouples producers from consumers.",
    baseCapacityRps: 4000,
    defaultInstances: 1,
    maxInstances: 6,
    isCapacityBearing: true,
    supportsSpof: true,
    supportsHitRatio: false,
    validTargets: ["app-server", "database"],
  },
  {
    type: "database",
    label: "Database",
    shortLabel: "DB",
    description: "Persistent storage - the tier that's hardest and most expensive to scale horizontally.",
    baseCapacityRps: 400,
    defaultInstances: 1,
    maxInstances: 10,
    isCapacityBearing: true,
    supportsSpof: true,
    supportsHitRatio: false,
    validTargets: [],
  },
];

export const canvasComponentTypes: CanvasComponentTypeDef[] = componentTypeShapes.map((shape) => ({
  ...shape,
  technologies: getTechnologiesForType(shape.type),
}));

const typeIndex = new Map(canvasComponentTypes.map((def) => [def.type, def]));

export function getComponentTypeDef(type: CanvasComponentType): CanvasComponentTypeDef {
  const def = typeIndex.get(type);
  if (!def) throw new Error(`Unknown canvas component type: ${type}`);
  return def;
}

export function isValidCanvasConnection(
  source: CanvasComponentType,
  target: CanvasComponentType,
): boolean {
  if (source === target && source !== "app-server") return false;
  return getComponentTypeDef(source).validTargets.includes(target);
}
