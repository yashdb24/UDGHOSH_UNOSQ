"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export function TimelineNodeScene({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const reduced = usePrefersReducedMotion();

  useFrame(({ clock }) => {
    if (!meshRef.current || reduced) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 2.2) * 0.1;
    meshRef.current.scale.set(s, s, s);
  });

  return (
    <>
      <ambientLight intensity={0.9} />
      <pointLight position={[1, 1, 2]} intensity={2} color={color} />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.65} metalness={0.35} roughness={0.3} />
      </mesh>
    </>
  );
}
