"use client";

import React, { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { splitTextToWords } from "@/lib/utils";
import { wordRevealVariants, staggerContainerVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  as?: React.ElementType;
  gradientWords?: string[];
  gradientClass?: string;
}

export function TextReveal({
  text,
  className,
  as = "h2",
  gradientWords = [],
  gradientClass = "bg-gradient-to-br from-brand-orange via-brand-violet to-brand-blue bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]",
}: TextRevealProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = as as any;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();

  const words = splitTextToWords(text);

  if (shouldReduceMotion) {
    return (
      <Component className={className}>
        {words.map((word, i) => (
          <span
            key={i}
            className={cn("mr-[0.25em]", gradientWords.includes(word) && gradientClass)}
          >
            {word}
          </span>
        ))}
      </Component>
    );
  }

  // Safe mapping to prevent recreating component during render
  const MotionComponent = as === "h1" ? motion.h1 : as === "h3" ? motion.h3 : as === "p" ? motion.p : motion.h2;

  return (
    <MotionComponent
      ref={ref}
      variants={staggerContainerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2 mr-[0.25em]">
          <motion.span
            variants={wordRevealVariants}
            className={cn(
              "inline-block",
              gradientWords.includes(word.replace(/[^a-zA-Z0-9]/g, "")) && gradientClass
            )}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
}
