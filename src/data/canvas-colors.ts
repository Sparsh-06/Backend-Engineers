import type { CanvasComponentType } from "./canvas-component-types";

/**
 * Muted, similarly-weighted hues so no role visually dominates a busy graph.
 * Orange (#ff4d00) is deliberately excluded - it stays reserved for status
 * signals (warn/bad) elsewhere on the canvas.
 */
export const CANVAS_TYPE_COLORS: Record<CanvasComponentType, string> = {
  client: "#6B7280",
  cdn: "#5B8A9A",
  "load-balancer": "#7C8C6B",
  "app-server": "#8A6FA0",
  cache: "#B08A4E",
  queue: "#5E7FA3",
  database: "#9B6B6B",
};
