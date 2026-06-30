"use client";

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface FloatingElementsProps {
  variant?: 'birds' | 'clouds' | 'mixed';
  count?: number;
  className?: string;
}

const BIRD_SVG = (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40">
    {/* Geometric Origami Bird */}
    <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M50 20 L80 50 L50 65 L50 20 Z" fill="currentColor" fillOpacity="0.4" />
    <path d="M20 50 L50 80 L50 65 L20 50 Z" fill="currentColor" fillOpacity="0.3" />
    <path d="M80 50 L95 30 L65 45 L80 50 Z" fill="currentColor" fillOpacity="0.5" />
    <path d="M20 50 L5 30 L35 45 L20 50 Z" fill="currentColor" fillOpacity="0.5" />
  </svg>
);

const CLOUD_SVG = (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30">
    {/* Geometric Cloud */}
    <path d="M20 50 A 15 15 0 0 1 20 20 A 20 20 0 0 1 55 10 A 15 15 0 0 1 80 20 A 15 15 0 0 1 80 50 Z" fill="currentColor" />
  </svg>
);

export function FloatingPaperElements({ variant = 'mixed', count = 5, className = "" }: FloatingElementsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate deterministic elements based on count
  const elements = Array.from({ length: count }).map((_, i) => {
    const isBird = variant === 'birds' || (variant === 'mixed' && i % 2 === 0);
    const size = isBird ? 40 + (i * 5) % 20 : 60 + (i * 10) % 40; // Birds 40-60px, Clouds 60-100px
    const left = 5 + (i * 20) % 85; // Distributed across width
    const top = 10 + (i * 15) % 75; // Distributed across height
    const delay = (i * 0.7) % 3;
    const duration = 3 + (i % 2); // 3s to 4s based on tata extraction
    const colorClass = ["text-brand-orange", "text-brand-blue", "text-brand-purple"][i % 3];

    return (
      <motion.div
        key={i}
        className={`absolute z-0 pointer-events-none ${colorClass}`}
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: isBird ? size : size * 0.6,
        }}
        initial={{ y: 0, rotate: isBird ? -5 + (i % 10) : 0 }}
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: ["-15px", "15px", "-15px"],
              }
        }
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: "easeInOut", // Matched from Tata's `3s ease-in-out`
        }}
      >
        {isBird ? BIRD_SVG : CLOUD_SVG}
      </motion.div>
    );
  });

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      {elements}
    </div>
  );
}
