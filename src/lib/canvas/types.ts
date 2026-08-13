import type { Node, Edge } from "@xyflow/react";
import type { CanvasComponentType, CanvasNodeTier } from "@/data/canvas-component-types";

export interface CanvasNodeData extends Record<string, unknown> {
  type: CanvasComponentType;
  instances: number;
  tier: CanvasNodeTier;
  hitRatio?: number;
  label?: string;
  /** Technology id (see canvas-technologies.ts) - absent means role defaults apply. */
  technology?: string;
  /** Injected per render from the current simulation pass - not part of persisted state. */
  simResult?: CanvasNodeSimResult;
}

export type CanvasFlowNode = Node<CanvasNodeData, "canvasNode">;

export interface CanvasEdgeData extends Record<string, unknown> {
  /** Injected per render - the simulation status of the node this edge feeds into. */
  targetStatus?: CapacityStatus;
}

export type CanvasFlowEdge = Edge<CanvasEdgeData, "canvasEdge">;

export type CapacityStatus = "good" | "warn" | "bad";

export interface CanvasNodeSimResult {
  incomingRps: number;
  outgoingRps: number;
  effectiveCapacityRps: number;
  utilization: number;
  status: CapacityStatus;
  isSpof: boolean;
  spofReason?: string;
}

export interface CanvasConsistencyNote {
  nodeId: string;
  message: string;
}

export interface CanvasSimulationResult {
  trafficRps: number;
  nodes: Record<string, CanvasNodeSimResult>;
  bottleneckNodeIds: string[];
  spofNodeIds: string[];
  overallStatus: CapacityStatus;
  summary: string;
  estimatedMonthlyCost: number;
  /** Worst-case end-to-end latency across all client-to-leaf paths. */
  estimatedLatencyMs: number;
  /** Node ids along the path that produced estimatedLatencyMs. */
  latencyCriticalPath: string[];
  consistencyNotes: CanvasConsistencyNote[];
}
