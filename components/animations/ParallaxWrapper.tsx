"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ParallaxWrapperProps {
  children: React.ReactNode;
  offset?: number; // e.g. 50 means moves 50px up/down on scroll
  className?: string;
  speed?: number; // Adjusts the intensity of the parallax
}

export function ParallaxWrapper({
  children,
  offset = 50,
  className,
  speed = 1,
}: ParallaxWrapperProps) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset * speed, offset * speed]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
