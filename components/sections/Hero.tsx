"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { TextReveal } from "@/components/animations/TextReveal";
import { CountUp } from "@/components/animations/CountUp";
import { REGISTER_HREF } from "@/lib/constants";
import { TornEdge } from "@/components/ui/TornEdge";
import { FloatingPaperElements } from "@/components/ui/FloatingPaperElements";
import { DecorativeIcon } from "@/components/ui/DecorativeIcons";
import Image from "next/image";

// Canvas needs the browser (WebGL context), so it's excluded from SSR.
const Scene3D = dynamic(() => import("@/components/three/Scene3D").then((m) => m.Scene3D), { ssr: false });
const HeroScene = dynamic(() => import("@/components/three/HeroScene").then((m) => m.HeroScene), { ssr: false });

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-bg-primary pt-20"
      onMouseMove={handleMouseMove}
    >
      {/* FULL SCREEN 3D SCENE (Hidden on Mobile to save GPU and prevent overlay bugs) */}
      <div className="absolute inset-0 z-30 pointer-events-none hidden md:block">
        <Scene3D cameraPosition={[0, 0, 8]}>
          <HeroScene />
        </Scene3D>
      </div>

      <FloatingPaperElements variant="mixed" count={6} />
      {/* Main Content */}
      <div className="relative z-20 flex w-full max-w-7xl flex-col-reverse items-center justify-between px-6 pt-12 md:flex-row md:items-center lg:px-12">

        {/* Left Column (Text & CTAs) */}
        <div className="flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left">

          {/* Row 1: Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-soft-orange px-4 py-1.5 border border-brand-orange/20">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange"></span>
              </span>
              <span className="font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
                IIT Kanpur × Udghosh &apos;26
              </span>
            </div>
          </motion.div>

          {/* Row 2: Headline */}
          <div className="mb-6 flex flex-col items-center md:items-start">
            <TextReveal
              as="h1"
              text="UNOSQ &apos;26"
              className="font-space-grotesk text-[clamp(4.5rem,8vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-text-primary"
            />
            <TextReveal
              as="h1"
              text="Unleash Your Mind."
              className="font-space-grotesk text-[clamp(4.5rem,8vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.04em]"
              gradientWords={["Unleash", "Your", "Mind."]}
              gradientClass="bg-gradient-to-br from-brand-purple to-brand-blue bg-clip-text text-transparent"
            />
          </div>

          {/* Row 3: Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 max-w-[480px] font-inter text-lg text-text-secondary md:text-xl"
          >
            India's Premier Open Quiz for School Students
          </motion.p>

          {/* Row 4: CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 flex flex-col items-center gap-4 sm:flex-row md:items-start"
          >
            <a
              href={REGISTER_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full bg-brand-orange px-8 py-3.5 font-inter text-base font-semibold text-white shadow-[0_3px_0_#C25200] transition-all duration-150 hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#C25200]"
            >
              Register Now — It's Free
            </a>
            <a
              href="#resources"
              className="rounded-full border-[1.5px] border-[#ECEAF5] bg-white px-8 py-3.5 font-inter text-base font-semibold text-text-primary transition-all duration-300 hover:border-brand-orange hover:text-brand-orange-text shadow-sm"
            >
              View Sample Papers
            </a>
          </motion.div>

          {/* Row 5: Stat Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:justify-start"
          >
            <div className="flex flex-col items-center md:items-start">
              <CountUp to={5000} suffix="+" className="font-space-grotesk text-3xl font-extrabold text-text-primary md:text-4xl" />
              <span className="mt-1 font-inter text-xs font-semibold uppercase tracking-widest text-text-muted">
                Students
              </span>
            </div>
            <div className="hidden h-10 w-px bg-text-muted/20 md:block" />
            <div className="flex flex-col items-center md:items-start">
              <CountUp to={100} suffix="+" className="font-space-grotesk text-3xl font-extrabold text-text-primary md:text-4xl" />
              <span className="mt-1 font-inter text-xs font-semibold uppercase tracking-widest text-text-muted">
                Schools
              </span>
            </div>
            <div className="hidden h-10 w-px bg-text-muted/20 md:block" />
            <div className="flex flex-col items-center md:items-start">
              <CountUp to={5} suffix="+" className="font-space-grotesk text-3xl font-extrabold text-text-primary md:text-4xl" />
              <span className="mt-1 font-inter text-xs font-semibold uppercase tracking-widest text-text-muted">
                Years
              </span>
            </div>
          </motion.div>
        </div>

        {/* Right Column (Illustration) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 flex w-full items-center justify-center md:mb-0 md:w-1/2 relative"
        >
          {/* Mouse-follow glow effect background */}
          <motion.div
            className="pointer-events-none absolute inset-0 -z-20 opacity-30 transition-opacity duration-300"
            style={{
              background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 124, 0, 0.15), transparent 40%)",
            }}
          />

          <div className="relative flex aspect-square w-full max-w-[450px] items-center justify-center">
            {/* Visual (Circular Mask) */}
            <div className="relative z-10 aspect-square w-[75%] overflow-hidden rounded-full border-4 border-white shadow-xl bg-white p-4">
              <Image src="/assets/hero.svg" alt="UNOSQ Student" fill className="object-contain" />
            </div>

            {/* Orbiting / Scattered Doodle Accents */}
            <DecorativeIcon icon="lightbulb" className="absolute -top-4 -left-4 z-20 drop-shadow-md" size={56} rotation={-12} color="#ff7c00" opacity={0.9} />
            <DecorativeIcon icon="starburst" className="absolute top-12 -right-8 z-20 drop-shadow-md" size={40} rotation={15} color="#f59337" opacity={0.9} />
            <DecorativeIcon icon="questionBubble" className="absolute bottom-8 -left-12 z-20 drop-shadow-md" size={48} rotation={-5} color="#4229d5" opacity={0.9} />
            <DecorativeIcon icon="pencil" className="absolute -bottom-6 right-0 z-20 drop-shadow-md" size={44} rotation={45} color="#1677ff" opacity={0.9} />
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 z-20"
      >
        <div className="relative h-10 w-[2px] overflow-hidden bg-text-muted/20">
          <motion.div
            animate={{
              y: ["-100%", "200%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-brand-orange"
          />
        </div>
        <span className="font-inter text-[10px] font-semibold uppercase tracking-widest text-text-muted">
          Scroll
        </span>
      </motion.div>
      <TornEdge top={false} fillColor="#FFFFFF" />
    </section>
  );
}
