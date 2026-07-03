"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

interface Scene3DProps {
  children: React.ReactNode;
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
  /** Set true for scenes that should keep listening to pointer move (e.g. Hero) */
  eventSource?: React.RefObject<HTMLElement>;
}

/**
 * Transparent Canvas wrapper used by every 3D accent on the site.
 * Keeps DPR capped for perf, background always transparent so it composites
 * over existing section backgrounds/gradients without a seam.
 */
export function Scene3D({
  children,
  cameraPosition = [0, 0, 5],
  fov = 45,
  className,
}: Scene3DProps) {
  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: cameraPosition, fov }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
