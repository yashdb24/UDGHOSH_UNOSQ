"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const GOLD = "#f59337";

function TrophyModel() {
  const group = useRef<THREE.Group>(null);
  const reduced = usePrefersReducedMotion();

  useFrame((_, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.32;
  });

  return (
    <group ref={group}>
      {/* Cup bowl */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.55, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.6]} />
        <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.2} side={THREE.DoubleSide} />
      </mesh>
      {/* Handles */}
      <mesh position={[-0.62, 0.55, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0.62, 0.55, 0]} rotation={[0, Math.PI, -Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.14, 0.5, 24]} />
        <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.35, 0.4, 0.18, 32]} />
        <meshStandardMaterial color="#1d1916" metalness={0.3} roughness={0.4} />
      </mesh>
    </group>
  );
}

export function PrizeTrophyScene() {
  const reduced = usePrefersReducedMotion();

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1.7} color="#fff5eb" />
      <directionalLight position={[-3, -2, -3]} intensity={0.45} color="#4229d5" />
      <Float speed={reduced ? 0 : 1.1} rotationIntensity={0} floatIntensity={reduced ? 0 : 0.55}>
        <TrophyModel />
      </Float>
    </>
  );
}
