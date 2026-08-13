import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";
import type { CanvasComponentType, CanvasNodeTier } from "@/data/canvas-component-types";
import type { CanvasFlowEdge, CanvasFlowNode } from "./types";

const KNOWN_TYPES: CanvasComponentType[] = [
  "client",
  "cdn",
  "load-balancer",
  "app-server",
  "cache",
  "queue",
  "database",
];
const KNOWN_TIERS: CanvasNodeTier[] = ["small", "medium", "large"];

export interface CanvasGraphNodeV1 {
  id: string;
  type: CanvasComponentType;
  x: number;
  y: number;
  instances: number;
  tier: CanvasNodeTier;
  hitRatio?: number;
  label?: string;
  technology?: string;
}

export interface CanvasGraphEdgeV1 {
  id: string;
  source: string;
  target: string;
}

export interface CanvasGraphV1 {
  v: 1;
  nodes: CanvasGraphNodeV1[];
  edges: CanvasGraphEdgeV1[];
  traffic: number;
  meta?: { presetSlug?: string };
}

export function toGraph(
  nodes: CanvasFlowNode[],
  edges: CanvasFlowEdge[],
  traffic: number,
  presetSlug?: string,
): CanvasGraphV1 {
  return {
    v: 1,
    nodes: nodes.map((node) => ({
      id: node.id,
      type: node.data.type,
      x: Math.round(node.position.x),
      y: Math.round(node.position.y),
      instances: node.data.instances,
      tier: node.data.tier,
      hitRatio: node.data.hitRatio,
      label: node.data.label,
      technology: node.data.technology,
    })),
    edges: edges.map((edge) => ({ id: edge.id, source: edge.source, target: edge.target })),
    traffic,
    meta: presetSlug ? { presetSlug } : undefined,
  };
}

export function fromGraph(graph: CanvasGraphV1): {
  nodes: CanvasFlowNode[];
  edges: CanvasFlowEdge[];
  traffic: number;
} {
  return {
    nodes: graph.nodes.map((node) => ({
      id: node.id,
      type: "canvasNode",
      position: { x: node.x, y: node.y },
      data: {
        type: node.type,
        instances: node.instances,
        tier: node.tier,
        hitRatio: node.hitRatio,
        label: node.label,
        technology: node.technology,
      },
    })),
    edges: graph.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      type: "canvasEdge",
    })),
    traffic: graph.traffic,
  };
}

export function encodeGraph(graph: CanvasGraphV1): string {
  return compressToEncodedURIComponent(JSON.stringify(graph));
}

/** Never throws - returns null for anything malformed so callers can fall back silently. */
export function decodeGraph(raw: string): CanvasGraphV1 | null {
  try {
    const decompressed = decompressFromEncodedURIComponent(raw);
    if (!decompressed) return null;
    const parsed = JSON.parse(decompressed) as unknown;
    if (!isValidGraph(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function isValidGraph(value: unknown): value is CanvasGraphV1 {
  if (!value || typeof value !== "object") return false;
  const graph = value as Partial<CanvasGraphV1>;
  if (graph.v !== 1) return false;
  if (!Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) return false;
  if (typeof graph.traffic !== "number") return false;
  return graph.nodes.every(
    (node) =>
      node &&
      typeof node.id === "string" &&
      KNOWN_TYPES.includes(node.type) &&
      typeof node.x === "number" &&
      typeof node.y === "number" &&
      typeof node.instances === "number" &&
      KNOWN_TIERS.includes(node.tier),
  );
}
