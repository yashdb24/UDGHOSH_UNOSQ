"use client";

import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface PaperModelProps {
  url: string;
  /** Optional flat retint so scavenged models read as one consistent "paper" family. */
  color?: string;
  scale?: number;
}

export function PaperModel({ url, color, scale = 1 }: PaperModelProps) {
  const { scene } = useGLTF(url);

  const cloned = useMemo(() => {
    const clone = scene.clone(true);
    if (color) {
      clone.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color,
            roughness: 0.85,
            metalness: 0.02,
          });
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });
    }
    return clone;
  }, [scene, color]);

  return <primitive object={cloned} scale={scale} />;
}

// Preload the pieces the Hero needs immediately so the entrance doesn't pop in empty.
useGLTF.preload("/models/paper-craft/paper-airplane.glb");
useGLTF.preload("/models/paper-craft/crumpled-paper.glb");
