"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { TextReveal } from "@/components/animations/TextReveal";
import { REGISTER_HREF } from "@/lib/constants";
import { ParallaxWrapper } from "@/components/animations/ParallaxWrapper";
import { TornEdge } from "@/components/ui/TornEdge";
import { FloatingPaperElements } from "@/components/ui/FloatingPaperElements";

export function FinalCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-white">
      <FloatingPaperElements variant="clouds" count={5} />
      {/* Background Elements */}
      <ParallaxWrapper offset={100} speed={0.4} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.08)_0%,transparent_60%)]" />
      </ParallaxWrapper>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange"></span>
          </span>
          <span className="font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
            Registration Open Now
          </span>
        </motion.div>

        <div className="mb-6 flex flex-col items-center">
          <TextReveal
            as="h2"
            text="Ready to Prove"
            className="font-space-grotesk text-[clamp(3.5rem,6vw,5rem)] font-extrabold leading-[1.1] tracking-tight text-text-primary"
          />
          <TextReveal
            as="h2"
            text="You're the Sharpest?"
            className="font-space-grotesk text-[clamp(3.5rem,6vw,5rem)] font-extrabold leading-[1.1] tracking-tight"
            gradientWords={["Sharpest?"]}
            gradientClass="bg-gradient-to-br from-brand-purple to-brand-blue bg-clip-text text-transparent"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 font-inter text-lg text-text-secondary md:text-[1.1rem]"
        >
          Join 5000+ students. Compete nationally. Win big.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <a
            href={REGISTER_HREF}
            className="inline-flex rounded-full bg-brand-orange px-14 py-5 font-inter text-[1.125rem] font-semibold text-white shadow-[0_3px_0_#C25200] transition-all duration-150 hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#C25200]"
          >
            Register Now — Free
          </a>

          <span className="mt-6 font-inter text-xs font-medium tracking-wide text-text-muted">
            Registration closes soon · No entry fee · Open nationwide
          </span>
        </motion.div>
      </div>
      <TornEdge top={false} fillColor="#FFFFFF" />
    </section>
  );
}
