"use client";

import { Suspense, type ReactNode } from "react";
import { ReactFlowProvider } from "@xyflow/react";
import CanvasWorkspaceInner from "./canvas-workspace-inner";

type Props = {
  header?: ReactNode;
};

export default function CanvasWorkspace({ header }: Props) {
  return (
    <Suspense fallback={<div className="h-full w-full animate-pulse bg-[#EEE9E3]" />}>
      <ReactFlowProvider>
        <CanvasWorkspaceInner header={header} />
      </ReactFlowProvider>
    </Suspense>
  );
}
