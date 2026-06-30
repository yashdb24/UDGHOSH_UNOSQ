import React from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from 'framer-motion';

interface TornEdgeProps {
  fillColor?: string;
  className?: string;
  top?: boolean;
}

export function TornEdge({ fillColor = "#FFFFFF", className, top = false }: TornEdgeProps) {
  const shouldReduceMotion = useReducedMotion();

  // Create a somewhat irregular/jagged path for the paper tear
  const pathD = top
    ? "M0,40 L0,15 L40,30 L80,10 L120,35 L160,5 L200,25 L240,15 L280,35 L320,10 L360,28 L400,12 L440,35 L480,8 L520,25 L560,15 L600,32 L640,10 L680,28 L720,15 L760,35 L800,8 L840,25 L880,12 L920,30 L960,15 L1000,35 L1040,10 L1080,28 L1120,12 L1160,30 L1200,15 L1200,40 Z"
    : "M0,0 L0,25 L40,10 L80,30 L120,5 L160,35 L200,15 L240,25 L280,5 L320,30 L360,12 L400,28 L440,5 L480,32 L520,15 L560,25 L600,8 L640,30 L680,12 L720,25 L760,5 L800,32 L840,15 L880,28 L920,10 L960,25 L1000,5 L1040,30 L1080,12 L1120,28 L1160,10 L1200,25 L1200,0 Z";

  return (
    <div
      className={cn(
        "absolute left-0 right-0 z-10 w-full overflow-hidden pointer-events-none drop-shadow-[0_8px_12px_rgba(0,0,0,0.08)]",
        top ? "top-0 -translate-y-[99%] rotate-180" : "bottom-0 translate-y-[99%]",
        className
      )}
      style={{ height: "40px" }}
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={pathD} fill={fillColor} />
        {/* Subtle noise overlay specifically inside the path to give paper texture */}
        {!shouldReduceMotion && (
          <path d={pathD} fill="url(#paper-texture)" style={{ mixBlendMode: 'multiply', opacity: 0.15 }} />
        )}
        <defs>
          <pattern id="paper-texture" patternUnits="userSpaceOnUse" width="1200" height="200">
            <image href="/elements/crushed_paper_background.png" x="0" y="0" width="1200" height="200" preserveAspectRatio="none" />
          </pattern>
        </defs>
      </svg>
    </div>
  );
}
