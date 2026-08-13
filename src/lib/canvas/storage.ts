import { decodeGraph, encodeGraph, type CanvasGraphV1 } from "./serialize";

const STORAGE_KEY = "be-canvas-draft-v1";

export function saveDraft(graph: CanvasGraphV1) {
  try {
    window.localStorage.setItem(STORAGE_KEY, encodeGraph(graph));
  } catch {
    // Private browsing / storage quota - autosave is a nice-to-have, fail silently.
  }
}

export function loadDraft(): CanvasGraphV1 | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return decodeGraph(raw);
  } catch {
    return null;
  }
}

export function clearDraft() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
