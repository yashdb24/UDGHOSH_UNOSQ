"use client";

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import Image from 'next/image';

interface FloatingElementsProps {
  variant?: 'birds' | 'clouds' | 'mixed' | 'sports';
  count?: number;
  className?: string;
}

const BIRD_SVG = (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-40 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
    <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M50 20 L80 50 L50 65 L50 20 Z" fill="currentColor" fillOpacity="0.4" />
    <path d="M20 50 L50 80 L50 65 L20 50 Z" fill="currentColor" fillOpacity="0.3" />
    <path d="M80 50 L95 30 L65 45 L80 50 Z" fill="currentColor" fillOpacity="0.5" />
    <path d="M20 50 L5 30 L35 45 L20 50 Z" fill="currentColor" fillOpacity="0.5" />
  </svg>
);

const CLOUD_SVG = (
  <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-30 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
    <path d="M20 50 A 15 15 0 0 1 20 20 A 20 20 0 0 1 55 10 A 15 15 0 0 1 80 20 A 15 15 0 0 1 80 50 Z" fill="currentColor" />
  </svg>
);

const REAL_CLOUD = (
  <Image src="/elements/9-Picsart-BackgroundRemover.png" alt="Cloud" width={100} height={60} className="w-full h-full object-contain opacity-60 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]" />
);

const SPORTS_BALLS = [
  "/elements/background-removed (1).png", // volleyball
  "/elements/background-removed (2).png", // soccer
  "/elements/10-Picsart-BackgroundRemover.png", // baseball
  "/elements/11-Picsart-BackgroundRemover.png", // basketball
];

export function FloatingPaperElements({ variant = 'mixed', count = 5, className = "" }: FloatingElementsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const elements = Array.from({ length: count }).map((_, i) => {
    let content;
    let size = 40;
    const left = 5 + (i * 20) % 85; 
    const top = 10 + (i * 15) % 75; 
    const delay = (i * 0.7) % 3;
    const duration = variant === 'clouds' ? 60 + (i * 10) % 30 : 3 + (i % 2); 
    const colorClass = ["text-brand-orange", "text-brand-blue", "text-brand-purple"][i % 3];
    let isBird = false;

    if (variant === 'sports') {
      const ballSrc = SPORTS_BALLS[i % SPORTS_BALLS.length];
      size = 32 + (i * 4) % 16; // 32-48px
      content = (
        <Image src={ballSrc} alt="Sports Ball" width={48} height={48} className="w-full h-full object-contain opacity-60 drop-shadow-[0_4px_6px_rgba(0,0,0,0.1)]" />
      );
    } else {
      isBird = variant === 'birds' || (variant === 'mixed' && i % 2 === 0);
      size = isBird ? 40 + (i * 5) % 20 : 60 + (i * 10) % 40; 
      
      if (isBird) {
        content = BIRD_SVG;
      } else {
        // Alternate between SVG cloud and Real cloud
        content = (i % 2 === 0) ? CLOUD_SVG : REAL_CLOUD;
      }
    }

    return (
      <motion.div
        key={i}
        className={`absolute z-0 pointer-events-none ${variant !== 'sports' ? colorClass : ''}`}
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: isBird ? size : size * 0.6,
        }}
        initial={{ y: 0, rotate: isBird || variant === 'sports' ? -15 + (i % 30) : 0 }}
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
          ease: "easeInOut",
        }}
      >
        {content}
      </motion.div>
    );
  });

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      {elements}
    </div>
  );
}
