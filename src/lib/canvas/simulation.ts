import { getComponentTypeDef, TIER_MULTIPLIER, type CanvasComponentType } from "@/data/canvas-component-types";
import { getTechnologyDef } from "@/data/canvas-technologies";
import type {
  CanvasConsistencyNote,
  CanvasFlowEdge,
  CanvasFlowNode,
  CanvasNodeSimResult,
  CanvasSimulationResult,
  CapacityStatus,
} from "./types";

/** Discrete traffic levels the slider steps through - matches Simulator's index-driven range input. */
export const TRAFFIC_STEPS_RPS = [50, 200, 500, 1000, 2500, 5000, 10000, 25000] as const;

/** Fallback $/mo when a node has no technology picked - keeps the 3 existing presets meaningful. */
const DEFAULT_COST_PER_INSTANCE: Partial<Record<CanvasComponentType, number>> = {
  cdn: 15,
  "load-balancer": 15,
  "app-server": 20,
  cache: 10,
  queue: 15,
  database: 25,
};

/** Fallback added latency (ms) when a node has no technology picked. */
const DEFAULT_LATENCY_MS: Partial<Record<CanvasComponentType, number>> = {
  cdn: 6,
  "load-balancer": 2,
  "app-server": 5,
  cache: 1,
  queue: 3,
  database: 6,
};

/** Flat, illustrative cost of one network hop (edge traversal), in ms. */
const NETWORK_HOP_MS = 2;

function topologicalOrder(nodes: CanvasFlowNode[], incoming: Map<string, CanvasFlowEdge[]>, outgoing: Map<string, CanvasFlowEdge[]>) {
  const inDegree = new Map(nodes.map((node) => [node.id, (incoming.get(node.id) ?? []).length]));
  const queue = nodes.filter((node) => inDegree.get(node.id) === 0).map((node) => node.id);
  const order: string[] = [];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const id = queue.shift()!;
    if (visited.has(id)) continue;
    visited.add(id);
    order.push(id);
    for (const edge of outgoing.get(id) ?? []) {
      const remaining = (inDegree.get(edge.target) ?? 0) - 1;
      inDegree.set(edge.target, remaining);
      if (remaining <= 0 && !visited.has(edge.target)) queue.push(edge.target);
    }
  }

  // Nodes left unvisited only happen if the graph has a cycle (the adjacency
  // rules in canvas-component-types.ts mostly prevent this) - append them so
  // every node still gets a simulation result, using whatever upstream
  // traffic has already been resolved rather than failing the whole run.
  for (const node of nodes) {
    if (!visited.has(node.id)) order.push(node.id);
  }

  return order;
}

function estimateMonthlyCost(nodes: CanvasFlowNode[]): number {
  return nodes.reduce((sum, node) => {
    const def = getComponentTypeDef(node.data.type);
    if (!def.isCapacityBearing) return sum;
    const techDef = getTechnologyDef(node.data.technology);
    const perInstance = techDef?.costPerInstanceMonthly ?? DEFAULT_COST_PER_INSTANCE[node.data.type] ?? 0;
    return sum + perInstance * TIER_MULTIPLIER[node.data.tier] * node.data.instances;
  }, 0);
}

/**
 * Worst-case (max) cumulative latency from any client node to every other
 * node, via a single forward pass over the already-computed topological
 * `order` - reuses that ordering rather than a fresh traversal, since the
 * graph is a DAG under the adjacency rules in canvas-component-types.ts.
 */
function estimateLatencyBudget(
  nodes: CanvasFlowNode[],
  incoming: Map<string, CanvasFlowEdge[]>,
  outgoing: Map<string, CanvasFlowEdge[]>,
  order: string[],
): { estimatedLatencyMs: number; latencyCriticalPath: string[] } {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const best: Record<string, number> = {};
  const bestFrom: Record<string, string | null> = {};

  for (const id of order) {
    const node = nodeById.get(id);
    if (!node) continue;
    const techDef = getTechnologyDef(node.data.technology);
    const ownLatency =
      node.data.type === "client" ? 0 : (techDef?.latencyMs ?? DEFAULT_LATENCY_MS[node.data.type] ?? 0);
    const incomingEdges = incoming.get(id) ?? [];

    if (incomingEdges.length === 0) {
      best[id] = ownLatency;
      bestFrom[id] = null;
      continue;
    }

    let maxUpstream = -Infinity;
    let from: string | null = null;
    for (const edge of incomingEdges) {
      const upstream = (best[edge.source] ?? 0) + NETWORK_HOP_MS;
      if (upstream > maxUpstream) {
        maxUpstream = upstream;
        from = edge.source;
      }
    }
    best[id] = maxUpstream + ownLatency;
    bestFrom[id] = from;
  }

  const leafIds = nodes.filter((node) => (outgoing.get(node.id)?.length ?? 0) === 0).map((node) => node.id);
  const estimatedLatencyMs = leafIds.length > 0 ? Math.max(...leafIds.map((id) => best[id] ?? 0)) : 0;
  const criticalLeaf = leafIds.find((id) => (best[id] ?? 0) === estimatedLatencyMs) ?? null;

  const latencyCriticalPath: string[] = [];
  let cursor = criticalLeaf;
  while (cursor) {
    latencyCriticalPath.unshift(cursor);
    cursor = bestFrom[cursor] ?? null;
  }

  return { estimatedLatencyMs, latencyCriticalPath };
}

/**
 * Exactly 3 rule-based checks, always computed regardless of traffic level -
 * orthogonal to bottleneck/SPOF. Deliberately not attempting graph-path
 * analysis (e.g. "some requests bypass the cache") - a documented non-goal
 * for this version, not an oversight.
 */
function detectConsistencyRisks(nodes: CanvasFlowNode[]): CanvasConsistencyNote[] {
  const notes: CanvasConsistencyNote[] = [];
  for (const node of nodes) {
    if (node.data.type === "cache") {
      notes.push({
        nodeId: node.id,
        message:
          "Caches need an invalidation strategy - stale data sticks around until something explicitly evicts or expires it.",
      });
    }
    if (node.data.type === "database" && node.data.instances >= 2) {
      notes.push({
        nodeId: node.id,
        message:
          "Multiple database instances aren't automatically in sync - this needs an explicit replication or sharding strategy.",
      });
    }
    if (node.data.type === "queue" && node.data.instances >= 2) {
      notes.push({
        nodeId: node.id,
        message:
          "Multiple queue instances/partitions mean ordering isn't guaranteed globally - pick partition keys deliberately if order matters.",
      });
    }
  }
  return notes;
}

export function runSimulation(
  nodes: CanvasFlowNode[],
  edges: CanvasFlowEdge[],
  trafficRps: number,
): CanvasSimulationResult {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const incoming = new Map<string, CanvasFlowEdge[]>(nodes.map((node) => [node.id, []]));
  const outgoing = new Map<string, CanvasFlowEdge[]>(nodes.map((node) => [node.id, []]));
  for (const edge of edges) {
    outgoing.get(edge.source)?.push(edge);
    incoming.get(edge.target)?.push(edge);
  }

  const order = topologicalOrder(nodes, incoming, outgoing);
  const edgeTraffic = new Map<string, number>();
  const results: Record<string, CanvasNodeSimResult> = {};

  for (const id of order) {
    const node = nodeById.get(id);
    if (!node) continue;
    const def = getComponentTypeDef(node.data.type);
    const incomingEdges = incoming.get(id) ?? [];
    const outgoingEdges = outgoing.get(id) ?? [];

    const incomingRps =
      node.data.type === "client"
        ? 0
        : incomingEdges.reduce((sum, edge) => sum + (edgeTraffic.get(edge.id) ?? 0), 0);

    const capacityMultiplier = getTechnologyDef(node.data.technology)?.capacityMultiplier ?? 1;
    const effectiveCapacityRps = def.isCapacityBearing
      ? def.baseCapacityRps * TIER_MULTIPLIER[node.data.tier] * node.data.instances * capacityMultiplier
      : Infinity;

    let rawOutgoing: number;
    if (node.data.type === "client") {
      rawOutgoing = trafficRps;
    } else if (def.supportsHitRatio) {
      const hitRatio = node.data.hitRatio ?? def.defaultHitRatio ?? 0;
      rawOutgoing = incomingRps * (1 - hitRatio);
    } else {
      rawOutgoing = incomingRps;
    }

    const outgoingRps = outgoingEdges.length > 0 ? rawOutgoing : 0;
    if (outgoingEdges.length > 0) {
      const share = outgoingRps / outgoingEdges.length;
      for (const edge of outgoingEdges) edgeTraffic.set(edge.id, share);
    }

    const utilization = effectiveCapacityRps === Infinity ? 0 : incomingRps / effectiveCapacityRps;

    let status: CapacityStatus;
    if (!def.isCapacityBearing) {
      status = "good";
    } else if (node.data.type === "queue") {
      status = utilization <= 1.0 ? "good" : utilization <= 1.5 ? "warn" : "bad";
    } else {
      status = utilization <= 0.7 ? "good" : utilization <= 1.0 ? "warn" : "bad";
    }

    const isSpof = def.supportsSpof && node.data.instances === 1 && incomingEdges.length > 0;

    results[id] = {
      incomingRps,
      outgoingRps,
      effectiveCapacityRps,
      utilization,
      status,
      isSpof,
      spofReason: isSpof ? "Only 1 instance - no failover if it goes down" : undefined,
    };
  }

  const bottleneckNodeIds = order.filter((id) => results[id]?.status === "bad");
  const spofNodeIds = order.filter((id) => results[id]?.isSpof);
  const hasWarn = order.some((id) => results[id]?.status === "warn");
  const overallStatus: CapacityStatus = bottleneckNodeIds.length > 0 ? "bad" : hasWarn ? "warn" : "good";

  const summary =
    nodes.length === 0
      ? "Add a few components to see how they hold up under load."
      : `${bottleneckNodeIds.length} node${bottleneckNodeIds.length === 1 ? "" : "s"} over capacity · ${spofNodeIds.length} single point${spofNodeIds.length === 1 ? "" : "s"} of failure`;

  const estimatedMonthlyCost = estimateMonthlyCost(nodes);
  const { estimatedLatencyMs, latencyCriticalPath } = estimateLatencyBudget(nodes, incoming, outgoing, order);
  const consistencyNotes = detectConsistencyRisks(nodes);

  return {
    trafficRps,
    nodes: results,
    bottleneckNodeIds,
    spofNodeIds,
    overallStatus,
    summary,
    estimatedMonthlyCost,
    estimatedLatencyMs,
    latencyCriticalPath,
    consistencyNotes,
  };
}
