"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks whole-page scroll progress (0 -> 1) in a ref so it can be read
 * inside useFrame every tick without triggering a React re-render.
 * Lenis (see LenisProvider) drives the page via native window.scrollTo,
 * so a plain native scroll listener stays in sync with it for free.
 */
export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const getMax = () =>
      Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

    const onScroll = () => {
      progress.current = Math.min(Math.max(window.scrollY / getMax(), 0), 1);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}
