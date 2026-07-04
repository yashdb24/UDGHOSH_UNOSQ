"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import { PaperModel } from "./PaperModel";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

const CRUMPLED_URL = "/models/paper-craft/crumpled-paper.glb";
const PLANE_URL = "/models/paper-craft/paper-airplane.glb";

/** A single scrap of paper that bursts outward and shrinks away, fired at the pop moment. */
function Scrap({ delay }: { delay: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!ref.current) return;
    const angle = Math.random() * Math.PI * 2;
    const dist = 0.8 + Math.random() * 1.2;

    gsap.fromTo(
      ref.current.position,
      { x: 0, y: 0, z: 0 },
      {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist + 0.3,
        z: (Math.random() - 0.5) * 0.6,
        duration: 0.9,
        delay,
        ease: "power3.out",
      }
    );
    gsap.fromTo(
      ref.current.scale,
      { x: 0.14, y: 0.14, z: 0.14 },
      { x: 0, y: 0, z: 0, duration: 0.9, delay, ease: "power2.in" }
    );
    gsap.to(ref.current.rotation, {
      x: Math.random() * 6,
      y: Math.random() * 6,
      duration: 0.9,
      delay,
      ease: "power1.out",
    });
  }, [delay]);

  return (
    <mesh ref={ref} scale={0}>
      <planeGeometry args={[0.18, 0.18]} />
      <meshStandardMaterial color="#FFFFFF" side={THREE.DoubleSide} roughness={0.9} />
    </mesh>
  );
}

export function HeroPaperScene() {
  const crumpledRef = useRef<THREE.Group>(null);
  const planeRef = useRef<THREE.Group>(null);
  const idleGroupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const reduced = usePrefersReducedMotion();
  const [showScraps, setShowScraps] = useState(false);
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    if (!crumpledRef.current || !planeRef.current) return;

    if (reduced) {
      // Skip the tumble show for reduced-motion users, land straight on the plane.
      gsap.set(crumpledRef.current.scale, { x: 0, y: 0, z: 0 });
      gsap.set(planeRef.current.scale, { x: 1, y: 1, z: 1 });
      setIdle(true);
      return;
    }

    const tl = gsap.timeline({ onComplete: () => setIdle(true) });

    // 1. Crumpled ball tumbles in.
    tl.fromTo(
      crumpledRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 0.65, ease: "back.out(2)" }
    ).to(
      crumpledRef.current.rotation,
      { x: "+=8", y: "+=10", duration: 0.9, ease: "power1.inOut" },
      "<"
    );

    // 2. It "pops" open into the paper airplane, with a burst of scraps.
    tl.add(() => setShowScraps(true), "-=0.15")
      .to(crumpledRef.current.scale, { x: 0, y: 0, z: 0, duration: 0.15, ease: "power2.in" }, "<")
      .fromTo(
        planeRef.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 0.4, ease: "back.out(2.4)" },
        "<-0.05"
      )
      .fromTo(
        planeRef.current.rotation,
        { x: 0.4, y: -1.2, z: 0.3 },
        { x: 0.35, y: -0.6, z: 0.15, duration: 0.5, ease: "power3.out" },
        "<"
      );

    return () => {
      tl.kill();
    };
  }, [reduced]);

  useFrame((_, delta) => {
    if (reduced || !idleGroupRef.current) return;
    idleGroupRef.current.rotation.y -= delta * 0.18;
    idleGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      idleGroupRef.current.rotation.x,
      pointer.y * 0.3,
      0.04
    );
    idleGroupRef.current.rotation.z = THREE.MathUtils.lerp(
      idleGroupRef.current.rotation.z,
      pointer.x * 0.15,
      0.04
    );
  });

  return (
    <group ref={idleGroupRef}>
      <Float
        speed={idle ? 1.6 : 0}
        rotationIntensity={idle ? 0.3 : 0}
        floatIntensity={idle ? 0.9 : 0}
      >
        <group ref={crumpledRef} scale={0}>
          <PaperModel url={CRUMPLED_URL} color="#F5F0E6" scale={3.5} textureUrl="/models/paper-craft/crumpled-texture.png" />
        </group>
        <group ref={planeRef} scale={0}>
          <group rotation={[0, Math.PI, 0]}>
            <PaperModel url={PLANE_URL} color="#FFFFFF" scale={5.0} />
          </group>
        </group>
      </Float>
      {showScraps &&
        Array.from({ length: 10 }).map((_, i) => <Scrap key={i} delay={i * 0.015} />)}
    </group>
  );
}
