"use client";

import React, { useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

interface PaperModelProps {
  url: string;
  /** Optional flat retint so scavenged models read as one consistent "paper" family. */
  color?: string;
  scale?: number;
  textureUrl?: string;
}

export function PaperModel({ url, color, scale = 1, textureUrl }: PaperModelProps) {
  const { scene } = useGLTF(url);
  const texture = textureUrl ? useTexture(textureUrl) : null;
  if (texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  }

  const cloned = useMemo(() => {
    const clone = scene.clone(true);
    if (color || texture) {
      clone.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: color || "#FFFFFF",
            map: texture || null,
            roughness: 0.85,
            metalness: 0.02,
          });
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });
    }
    return clone;
  }, [scene, color, texture]);

  return <primitive object={cloned} scale={scale} />;
}

// Preload the pieces the Hero needs immediately so the entrance doesn't pop in empty.
useGLTF.preload("/models/paper-craft/paper-airplane.glb");
useGLTF.preload("/models/paper-craft/crumpled-paper.glb");
