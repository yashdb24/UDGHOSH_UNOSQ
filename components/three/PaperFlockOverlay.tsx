"use client";

import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PaperModel } from "./PaperModel";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import { useScrollProgress } from "@/lib/useScrollProgress";

interface FlockPieceConfig {
  url: string;
  color?: string;
  scale: number;
  /** Control points in a roughly -1..1 normalized viewport space (x/y), scaled to world units at render time. */
  points: [number, number, number][];
  /** Portion of *whole-page* scroll progress (0-1) during which this piece is in flight. */
  range: [number, number];
  spinSpeed: number;
  rotationOffset?: [number, number, number];
  textureUrl?: string;
}

const PIECES: FlockPieceConfig[] = [
  {
    url: "/models/paper-craft/paper-airplane.glb",
    scale: 3.6,
    range: [0, 0.28],
    spinSpeed: -0.6,
    points: [
      [-1.35, 0.4, -1],
      [-0.55, 0.0, -0.5],
      [0.5, -0.5, 0],
      [1.4, -1.1, 0.5],
    ],
  },
  {
    url: "/models/paper-craft/origami-crane.glb",
    scale: 4.4,
    range: [0.24, 0.55],
    spinSpeed: 0.35,
    rotationOffset: [Math.PI, 0, 0], // Flip right-side up
    points: [
      [1.35, 0.45, -1],
      [0.55, 0.0, -0.3],
      [-0.45, -0.5, 0.2],
      [-1.4, -1.1, 0.6],
    ],
  },
  {
    url: "/models/paper-craft/paper-boat.glb",
    scale: 19.2,
    range: [0.5, 0.8],
    spinSpeed: 0.2,
    points: [
      [-1.4, 0.5, -0.8],
      [-0.5, 0.0, -0.2],
      [0.5, -0.6, 0.3],
      [1.4, -1.2, 0.7],
    ],
  },
  {
    url: "/models/paper-craft/crumpled-paper.glb",
    color: "#F5F0E6",
    scale: 2.7,
    range: [0.72, 1],
    spinSpeed: 0.9,
    textureUrl: "/models/paper-craft/crumpled-texture.png",
    points: [
      [1.35, 0.45, -1],
      [0.45, 0.0, -0.4],
      [-0.5, -0.6, 0.1],
      [-1.35, -1.2, 0.6],
    ],
  },
];

function FlockPiece({
  config,
  progress,
}: {
  config: FlockPieceConfig;
  progress: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const curve = useMemo(
    () =>
      new THREE.CatmullRomCurve3(
        config.points.map(([x, y, z]) => new THREE.Vector3(x, y, z))
      ),
    [config.points]
  );

  useFrame((state) => {
    if (!ref.current) return;
    const [start, end] = config.range;
    const local = THREE.MathUtils.clamp((progress.current - start) / (end - start), 0, 1);
    const visible = local > 0.001 && local < 0.999;
    ref.current.visible = visible;
    if (!visible) return;

    const eased = THREE.MathUtils.smoothstep(local, 0, 1);
    const point = curve.getPointAt(eased);
    const tangent = curve.getTangentAt(eased);

    ref.current.position.set(
      (point.x * viewport.width) / 2,
      (point.y * viewport.height) / 2,
      point.z
    );

    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = Math.atan2(tangent.y, tangent.x) + Math.sin(t * 1.5) * 0.15 + (config.rotationOffset?.[2] || 0);
    // Use absolute time for spin to avoid frame-rate dependency, and apply static offset correctly.
    ref.current.rotation.y = (t * config.spinSpeed) + (config.rotationOffset?.[1] || 0);
    ref.current.rotation.x = config.rotationOffset?.[0] || 0;
  });

  return (
    <group ref={ref} visible={false}>
      <PaperModel url={config.url} color={config.color} scale={config.scale} textureUrl={config.textureUrl} />
    </group>
  );
}

/**
 * Fixed, transparent, full-viewport canvas layered over the whole page.
 * Each paper piece flies its own arc timed to a slice of total scroll
 * progress, so a different model "arrives" as its section of the page
 * comes up. Pointer-events are disabled throughout so it never blocks
 * clicks/taps on real content underneath.
 */
export function PaperFlockOverlay() {
  const reduced = usePrefersReducedMotion();
  const progress = useScrollProgress();

  if (reduced) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 hidden md:block">
      <Canvas
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={1.8} />
        <directionalLight position={[3, 4, 5]} intensity={2.5} color="#ffffff" />
        <Suspense fallback={null}>
          {PIECES.map((piece, i) => (
            <FlockPiece key={i} config={piece} progress={progress} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
