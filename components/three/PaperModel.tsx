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

const DUMMY_TEXTURE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

export function PaperModel({ url, color, scale = 1, textureUrl }: PaperModelProps) {
  const { scene } = useGLTF(url);
  // Always call useTexture, use a 1x1 transparent dummy if no URL provided to satisfy Rules of Hooks
  const texture = useTexture(textureUrl || DUMMY_TEXTURE);

  const cloned = useMemo(() => {
    const clone = scene.clone(true);
    if (color || textureUrl) {
      clone.traverse((child: any) => {
        if (child.isMesh) {
          // Clone material to avoid mutating shared GLTF cache
          const mat = child.material.clone();
          
          if (color) {
            mat.color = new THREE.Color(color);
          }
          
          // Only apply texture if a real textureUrl was provided
          if (textureUrl && texture) {
            // Clone texture to avoid mutating the shared Drei cache (fixes immutability lint error)
            const clonedTexture = texture.clone();
            clonedTexture.wrapS = THREE.RepeatWrapping;
            clonedTexture.wrapT = THREE.RepeatWrapping;
            clonedTexture.needsUpdate = true;
            mat.map = clonedTexture;
          }
          
          // Basic paper material settings
          mat.roughness = 0.9;
          mat.metalness = 0.1;
          mat.side = THREE.DoubleSide;
          child.material = mat;
        }
      });
    }
    return clone;
  }, [scene, color, texture, textureUrl]);

  return <primitive object={cloned} scale={scale} />;
}

// Preload the pieces the Hero needs immediately so the entrance doesn't pop in empty.
useGLTF.preload("/models/paper-craft/paper-airplane.glb");
useGLTF.preload("/models/paper-craft/crumpled-paper.glb");
