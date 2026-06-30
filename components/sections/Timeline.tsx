"use client";

import React, { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE } from "@/lib/constants";
import { TextReveal } from "@/components/animations/TextReveal";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";
import { DecorativeIcon } from "@/components/ui/DecorativeIcons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Timeline() {
  const containerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || !containerRef.current || !lineRef.current) return;

    // Line drawing animation
    const lineAnim = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.5, // Smooth scrub
        },
      }
    );

    // Node entrance animations based on line progress
    const nodeAnims = nodesRef.current.map((node, index) => {
      if (!node) return null;
      
      const isLeft = index % 2 === 0;
      // On mobile, all cards come from the right
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      const xOffset = isMobile ? 60 : isLeft ? -60 : 60;

      return gsap.fromTo(
        node,
        { opacity: 0, x: xOffset },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: node,
            start: "top 60%", // Triggers when node reaches 60% of viewport
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      lineAnim.kill();
      nodeAnims.forEach((anim) => anim?.kill());
    };
  }, [shouldReduceMotion]);

  return (
    <section id="timeline" ref={containerRef} className="relative w-full overflow-hidden bg-brand-blue/[0.02] py-32 md:py-36">
      {/* Tiled Background */}
      <div 
        className="absolute left-0 top-0 h-full w-full z-0 opacity-[0.15] pointer-events-none mix-blend-multiply" 
        style={{ 
          backgroundImage: "url('/elements/background-removed (5).png')", 
          backgroundRepeat: "repeat",
          backgroundSize: "600px",
          backgroundPosition: "top center"
        }} 
      />

      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 md:px-12 relative z-10">
        <div className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
          04 / TIMELINE
        </div>

        <TextReveal
          as="h2"
          text="Mark Your Calendar."
          className="mb-24 text-center font-space-grotesk text-5xl font-bold tracking-tight text-text-primary md:text-[4rem]"
          gradientWords={["Calendar."]}
          gradientClass="bg-gradient-to-br from-brand-purple to-brand-blue bg-clip-text text-transparent"
        />

        <div className="relative flex w-full max-w-4xl flex-col">
          {/* The animated vertical line */}
          <div className="absolute bottom-0 left-6 top-0 w-[2px] origin-top md:left-1/2 md:-ml-[1px]">
            {/* Background line track */}
            <div className="absolute inset-0 bg-[#ECEAF5]" />
            {/* Animated fill line */}
            <div
              ref={lineRef}
              className="absolute inset-0 origin-top bg-gradient-to-b from-brand-blue via-brand-purple to-brand-orange"
            />
          </div>

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-12 md:gap-24">
            {TIMELINE.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    nodesRef.current[index] = el;
                  }}
                  className={cn(
                    "relative flex w-full items-center",
                    isLeft ? "md:justify-start" : "md:justify-end"
                  )}
                >
                  {/* The dot on the line */}
                  <div
                    className={cn(
                      "absolute left-6 top-1/2 z-10 h-4 w-4 -translate-x-[7px] -translate-y-1/2 rounded-full border-[3px] border-white md:left-1/2 md:-translate-x-[7px]",
                      shouldReduceMotion && "opacity-100"
                    )}
                    style={{
                      backgroundColor: item.color,
                      boxShadow: `0 0 12px ${item.color}4D`,
                    }}
                  />

                  {/* Card Content */}
                  <div
                    className={cn(
                      "flex w-full flex-col pl-16 md:w-[45%] md:pl-0",
                      isLeft ? "md:pr-16" : "md:pl-16"
                    )}
                  >
                    <div
                      className={cn(
                        "group relative flex flex-col overflow-hidden rounded-2xl border border-[#ECEAF5] bg-white p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2 sm:p-8",
                        item.title === "Felicitation at IIT Kanpur" && "border-brand-purple/20 bg-soft-purple"
                      )}
                    >
                      <div className="mb-4 flex items-center justify-between">
                        <span className="font-inter text-xs font-semibold tracking-widest text-text-muted">
                          {item.date}
                        </span>
                        <div
                          className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-inter text-[10px] font-semibold uppercase tracking-widest"
                          style={{
                            color: item.color,
                            backgroundColor: `${item.color}1A`,
                            border: `1px solid ${item.color}33`,
                          }}
                        >
                          {item.status.toLowerCase() === "completed" && (
                             <DecorativeIcon icon="checkmark" size={12} color={item.color} opacity={1} className="static" />
                          )}
                          <span>{item.status}</span>
                        </div>
                      </div>

                      <h3 className="mb-2 flex items-center gap-3 font-space-grotesk text-xl font-bold text-text-primary sm:text-2xl">
                        {item.title}
                        {item.title === "Winners Announced" && (
                          <Trophy className="h-5 w-5 text-brand-gold" />
                        )}
                      </h3>
                      
                      <p className="font-inter text-sm text-text-secondary sm:text-base">
                        {item.description}
                      </p>

                      {/* Connector Line (Desktop) */}
                      <div
                        className={cn(
                          "absolute top-1/2 hidden h-[2px] w-16 -translate-y-1/2 bg-[#ECEAF5] md:block",
                          isLeft ? "-right-16" : "-left-16"
                        )}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
