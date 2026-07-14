"use client";

import { useEffect, useState } from "react";

/**
 * Mirrors framer-motion's useReducedMotion() but usable inside R3F components
 * (useFrame callbacks), where framer-motion's hook isn't reliable since it's
 * outside React's render/commit cycle in the same way.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => 
    typeof window !== 'undefined' ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}
