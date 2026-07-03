"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type PoolShape = "icosahedron" | "octahedron" | "torus" | "box";

interface PoolAccentSceneProps {
  color: string;
  shape?: PoolShape;
}

/**
 * One faceted 3D shape per pool card. Shape varies by pool so all four cards
 * don't feel identical, color always comes from the pool's own hex so it
 * stays tied to the existing brand system rather than introducing new colors.
 */
export function PoolAccentScene({ color, shape = "icosahedron" }: PoolAccentSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const reduced = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (!meshRef.current || reduced) return;
    meshRef.current.rotation.x += delta * 0.28;
    meshRef.current.rotation.y += delta * 0.38;
  });

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[2, 3, 4]} intensity={1.3} color={color} />
      <directionalLight position={[-2, -1, -2]} intensity={0.4} color="#ffffff" />
      <mesh ref={meshRef}>
        {shape === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {shape === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {shape === "torus" && <torusGeometry args={[0.7, 0.28, 16, 32]} />}
        {shape === "box" && <boxGeometry args={[1.25, 1.25, 1.25]} />}
        <meshStandardMaterial color={color} metalness={0.45} roughness={0.25} />
      </mesh>
    </>
  );
}
