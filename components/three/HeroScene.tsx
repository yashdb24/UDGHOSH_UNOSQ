"use client";

import React from "react";
import { Environment } from "@react-three/drei";
import { HeroPaperScene } from "./HeroPaperScene";

export function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.5} color="#ff7c00" />
      <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#1677ff" />
      <HeroPaperScene />
      <Environment preset="city" />
    </>
  );
}
