"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

function TrophyModel() {
  const group = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();
  const { scene } = useGLTF("/models/trophy.glb");

  const cloned = useMemo(() => {
    return scene.clone(true);
  }, [scene]);

  useFrame((_, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.32;
  });

  return (
    <group ref={group}>
      <primitive object={cloned} scale={1.2} position={[0, -0.2, 0]} />
    </group>
  );
}

export function PrizeTrophyScene() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[3, 5, 4]} intensity={2.5} color="#fff5eb" />
      <directionalLight position={[-3, -2, -3]} intensity={1.0} color="#4229d5" />
      <Float speed={reduced ? 0 : 1.1} rotationIntensity={0} floatIntensity={reduced ? 0 : 0.55}>
        <TrophyModel />
      </Float>
    </>
  );
}

useGLTF.preload("/models/trophy.glb");
