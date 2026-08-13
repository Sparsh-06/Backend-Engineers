"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  MarkerType,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  type Connection,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/base.css";

import {
  getComponentTypeDef,
  isValidCanvasConnection,
  type CanvasComponentType,
} from "@/data/canvas-component-types";
import { getCanvasPreset } from "@/data/canvas-presets";
import { CANVAS_TYPE_COLORS } from "@/data/canvas-colors";
import { runSimulation, TRAFFIC_STEPS_RPS } from "@/lib/canvas/simulation";
import { decodeGraph, encodeGraph, fromGraph, toGraph } from "@/lib/canvas/serialize";
import { clearDraft, loadDraft, saveDraft } from "@/lib/canvas/storage";
import type { CanvasFlowEdge, CanvasFlowNode, CanvasNodeData } from "@/lib/canvas/types";

import CanvasNode from "@/modules/components/canvas/flow-node";
import CanvasEdge from "@/modules/components/canvas/flow-edge";
import CanvasPalette, { CANVAS_DND_MIME } from "@/modules/components/canvas/palette";
import InspectorPanel from "@/modules/components/canvas/inspector-panel";
import SimulationPanel from "@/modules/components/canvas/simulation-panel";
import PresetsGallery from "@/modules/components/canvas/presets-gallery";
import ShareBar from "@/modules/components/canvas/share-bar";
import CanvasControls from "@/modules/components/canvas/canvas-controls";

const nodeTypes = { canvasNode: CanvasNode };
const edgeTypes = { canvasEdge: CanvasEdge };
const defaultEdgeOptions = {
  type: "canvasEdge" as const,
  markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16, color: "rgba(0,0,0,0.35)" },
};

const DEFAULT_TRAFFIC_INDEX = 3; // 1000 req/s

function closestTrafficIndex(value: number): number {
  let closestIndex = 0;
  let closestDiff = Infinity;
  TRAFFIC_STEPS_RPS.forEach((step, index) => {
    const diff = Math.abs(step - value);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIndex = index;
    }
  });
  return closestIndex;
}

function createNodeId(type: CanvasComponentType): string {
  return `${type}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function buildDefaultNode(type: CanvasComponentType, position: { x: number; y: number }): CanvasFlowNode {
  const def = getComponentTypeDef(type);
  return {
    id: createNodeId(type),
    type: "canvasNode",
    position,
    data: {
      type,
      instances: def.defaultInstances,
      tier: "medium",
      hitRatio: def.defaultHitRatio,
    },
  };
}

interface InitialCanvasState {
  nodes: CanvasFlowNode[];
  edges: CanvasFlowEdge[];
  trafficIndex: number;
  linkBroken: boolean;
}

const EMPTY_INITIAL_STATE: InitialCanvasState = {
  nodes: [],
  edges: [],
  trafficIndex: DEFAULT_TRAFFIC_INDEX,
  linkBroken: false,
};

/**
 * Pure, called from each field's useState lazy initializer rather than from
 * an effect - cheap enough (small JSON parse) to recompute per field without
 * a memoization layer, and it keeps the hydration read path free of setState.
 */
function resolveInitialState(searchParams: ReturnType<typeof useSearchParams>): InitialCanvasState {
  const presetSlug = searchParams.get("preset");
  if (presetSlug) {
    const preset = getCanvasPreset(presetSlug);
    if (preset) {
      const hydrated = fromGraph(preset.graph);
      return {
        nodes: hydrated.nodes,
        edges: hydrated.edges,
        trafficIndex: closestTrafficIndex(hydrated.traffic),
        linkBroken: false,
      };
    }
  }

  const data = searchParams.get("d");
  if (data) {
    const decoded = decodeGraph(data);
    if (decoded) {
      const hydrated = fromGraph(decoded);
      return {
        nodes: hydrated.nodes,
        edges: hydrated.edges,
        trafficIndex: closestTrafficIndex(hydrated.traffic),
        linkBroken: false,
      };
    }
    const draft = loadDraft();
    if (draft) {
      const hydrated = fromGraph(draft);
      return {
        nodes: hydrated.nodes,
        edges: hydrated.edges,
        trafficIndex: closestTrafficIndex(hydrated.traffic),
        linkBroken: true,
      };
    }
    return { ...EMPTY_INITIAL_STATE, linkBroken: true };
  }

  const draft = loadDraft();
  if (draft) {
    const hydrated = fromGraph(draft);
    return {
      nodes: hydrated.nodes,
      edges: hydrated.edges,
      trafficIndex: closestTrafficIndex(hydrated.traffic),
      linkBroken: false,
    };
  }

  return EMPTY_INITIAL_STATE;
}

type Props = {
  header?: ReactNode;
};

export default function CanvasWorkspaceInner({ header }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { screenToFlowPosition } = useReactFlow();

  // Resolved once, via lazy useState initializers below - precedence is
  // ?preset= > ?d= > localStorage draft > empty. Reading from an initializer
  // (rather than setState inside an effect) avoids the extra render pass.
  const [nodes, setNodes] = useState<CanvasFlowNode[]>(() => resolveInitialState(searchParams).nodes);
  const [edges, setEdges] = useState<CanvasFlowEdge[]>(() => resolveInitialState(searchParams).edges);
  const [trafficIndex, setTrafficIndex] = useState(() => resolveInitialState(searchParams).trafficIndex);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [linkBroken, setLinkBroken] = useState(() => resolveInitialState(searchParams).linkBroken);

  // A hydrated preset or shared link immediately becomes the new draft, so
  // continuing to edit autosaves from that point rather than a stale one.
  // This only writes to localStorage - no setState - so it's a legitimate
  // effect rather than something to compute during render.
  useEffect(() => {
    const presetSlug = searchParams.get("preset");
    if (presetSlug) {
      const preset = getCanvasPreset(presetSlug);
      if (preset) {
        const hydrated = fromGraph(preset.graph);
        saveDraft(toGraph(hydrated.nodes, hydrated.edges, hydrated.traffic, preset.slug));
      }
      return;
    }
    const data = searchParams.get("d");
    if (data) {
      const decoded = decodeGraph(data);
      if (decoded) {
        const hydrated = fromGraph(decoded);
        saveDraft(toGraph(hydrated.nodes, hydrated.edges, hydrated.traffic));
      }
    }
    // Intentionally runs once on mount, mirroring ServiceExplorer's searchParams-sync effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Debounced localStorage autosave, decoupled from the URL share link.
  useEffect(() => {
    const timeout = setTimeout(() => {
      saveDraft(toGraph(nodes, edges, TRAFFIC_STEPS_RPS[trafficIndex]));
    }, 800);
    return () => clearTimeout(timeout);
  }, [nodes, edges, trafficIndex]);

  const simulation = useMemo(
    () => runSimulation(nodes, edges, TRAFFIC_STEPS_RPS[trafficIndex]),
    [nodes, edges, trafficIndex],
  );

  const displayNodes = useMemo(
    () => nodes.map((node) => ({ ...node, data: { ...node.data, simResult: simulation.nodes[node.id] } })),
    [nodes, simulation],
  );

  const displayEdges = useMemo(
    () =>
      edges.map((edge) => ({
        ...edge,
        data: { ...edge.data, targetStatus: simulation.nodes[edge.target]?.status },
      })),
    [edges, simulation],
  );

  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? null;

  const onNodesChange = useCallback((changes: NodeChange<CanvasFlowNode>[]) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange<CanvasFlowEdge>[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onNodesDelete = useCallback((deleted: CanvasFlowNode[]) => {
    const deletedIds = new Set(deleted.map((node) => node.id));
    setEdges((eds) => eds.filter((edge) => !deletedIds.has(edge.source) && !deletedIds.has(edge.target)));
    setSelectedNodeId((current) => (current && deletedIds.has(current) ? null : current));
  }, []);

  const onSelectionChange = useCallback(({ nodes: selected }: { nodes: CanvasFlowNode[] }) => {
    setSelectedNodeId(selected[0]?.id ?? null);
  }, []);

  const isValidConnection = useCallback(
    (connection: Connection | CanvasFlowEdge) => {
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);
      if (!sourceNode || !targetNode) return false;
      const duplicate = edges.some(
        (edge) => edge.source === connection.source && edge.target === connection.target,
      );
      if (duplicate) return false;
      return isValidCanvasConnection(sourceNode.data.type, targetNode.data.type);
    },
    [nodes, edges],
  );

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) =>
      addEdge<CanvasFlowEdge>(
        { ...connection, id: `e-${connection.source}-${connection.target}-${Date.now().toString(36)}` },
        eds,
      ),
    );
  }, []);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData(CANVAS_DND_MIME) as CanvasComponentType;
      if (!type) return;
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      setNodes((nds) => [...nds, buildDefaultNode(type, position)]);
    },
    [screenToFlowPosition],
  );

  const handleAddFromPalette = useCallback((type: CanvasComponentType) => {
    setNodes((nds) => {
      const index = nds.length;
      const position = { x: 80 + (index % 4) * 220, y: 80 + Math.floor(index / 4) * 160 };
      return [...nds, buildDefaultNode(type, position)];
    });
  }, []);

  const updateNodeData = useCallback((id: string, patch: Partial<CanvasNodeData>) => {
    setNodes((nds) => nds.map((node) => (node.id === id ? { ...node, data: { ...node.data, ...patch } } : node)));
  }, []);

  const deleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== id));
    setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    setSelectedNodeId((current) => (current === id ? null : current));
  }, []);

  const loadPreset = useCallback(
    (slug: string) => {
      const preset = getCanvasPreset(slug);
      if (!preset) return;
      const hydrated = fromGraph(preset.graph);
      setNodes(hydrated.nodes);
      setEdges(hydrated.edges);
      setTrafficIndex(closestTrafficIndex(hydrated.traffic));
      setSelectedNodeId(null);
      setLinkBroken(false);
      router.replace(`/canvas?preset=${slug}`, { scroll: false });
    },
    [router],
  );

  const handleCopyLink = useCallback(async () => {
    const graph = toGraph(nodes, edges, TRAFFIC_STEPS_RPS[trafficIndex]);
    const encoded = encodeGraph(graph);
    const url = `${window.location.origin}/canvas?d=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard permission denied - the URL still lands in the address bar below.
    }
    router.replace(`/canvas?d=${encoded}`, { scroll: false });
  }, [nodes, edges, trafficIndex, router]);

  const handleReset = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setTrafficIndex(DEFAULT_TRAFFIC_INDEX);
    setSelectedNodeId(null);
    setLinkBroken(false);
    clearDraft();
    router.replace("/canvas", { scroll: false });
  }, [router]);

  return (
    <div className="relative h-full w-full">
      <ReactFlow
        nodes={displayNodes}
        edges={displayEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        isValidConnection={isValidConnection}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        onDrop={onDrop}
        onDragOver={onDragOver}
        deleteKeyCode={["Backspace", "Delete"]}
        proOptions={{ hideAttribution: true }}
        minZoom={0.3}
        maxZoom={1.5}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(0,0,0,0.08)" />
        <MiniMap
          nodeColor={(node: Node) => CANVAS_TYPE_COLORS[(node.data as CanvasNodeData).type] ?? "#999"}
          maskColor="rgba(238,233,227,0.6)"
          pannable
          zoomable
          className="!border !border-black/10 !bg-white !shadow-sm"
          style={{ width: 140, height: 100 }}
        />
      </ReactFlow>

      {/* Floating chrome over the full-bleed canvas - the wrapper stays
          click-through so empty canvas space is still draggable/pannable;
          each panel opts back in to pointer events individually. */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="pointer-events-auto absolute left-4 top-24 bottom-20 flex w-64 flex-col gap-4 overflow-y-auto sm:left-6 sm:w-72">
          {header}
          <CanvasPalette onAdd={handleAddFromPalette} />
          <InspectorPanel node={selectedNode} onChange={updateNodeData} onDelete={deleteNode} />
        </div>

        <div className="pointer-events-auto absolute right-4 top-24 bottom-32 flex w-64 flex-col gap-4 overflow-y-auto sm:right-6 sm:w-72">
          <SimulationPanel
            trafficIndex={trafficIndex}
            onTrafficIndexChange={setTrafficIndex}
            simulation={simulation}
            nodes={nodes}
          />
          <ShareBar onCopyLink={handleCopyLink} onReset={handleReset} />
          <PresetsGallery onSelect={loadPreset} />
        </div>

        <div className="pointer-events-auto absolute left-4 bottom-4 z-20 sm:left-6">
          <CanvasControls onReset={handleReset} />
        </div>

        {linkBroken && (
          <div className="pointer-events-auto absolute left-1/2 top-24 z-20 max-w-sm -translate-x-1/2 rounded-xl border border-[#ff4d00]/40 bg-[#EEE9E3]/95 px-3 py-2 text-center text-[12px] font-medium text-[#ff4d00] shadow-sm">
            That share link looks broken - starting fresh.
          </div>
        )}

        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="pointer-events-auto max-w-sm rounded-2xl border border-dashed border-black/20 bg-white/85 p-5 text-center shadow-sm backdrop-blur">
              <p className="text-sm font-semibold text-black">Start building.</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-black/55">
                Drag a component from the left, or load a preset on the right.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
