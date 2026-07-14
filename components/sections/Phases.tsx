"use client";

import React from "react";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/animations/TextReveal";
import { TornEdge } from "@/components/ui/TornEdge";
import { DecorativeIcon } from "@/components/ui/DecorativeIcons";
import { FloatingPaperElements } from "@/components/ui/FloatingPaperElements";
import Image from "next/image";

const PhaseSpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1 border-b border-[#ECEAF5] py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
    <span className="font-inter text-xs font-semibold uppercase tracking-widest text-text-muted">
      {label}
    </span>
    <span className="font-inter text-[15.2px] font-medium text-text-secondary sm:text-right">
      {value}
    </span>
  </div>
);

export function Phases() {
  return (
    <section id="phases" className="relative w-full overflow-hidden bg-white py-32 md:py-36">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image src="/elements/4829.jpg" alt="Stadium sketch background" fill className="object-cover opacity-10 mix-blend-multiply" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 md:px-12 relative z-10">
        
        <FloatingPaperElements variant="sports" count={3} />

        <div className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
          03 / PHASES
        </div>
        
        <TextReveal
          as="h2"
          text="Two Phases. One Champion."
          className="mb-20 text-center font-space-grotesk text-5xl font-bold tracking-tight text-text-primary md:text-[4rem]"
          gradientWords={["One", "Champion."]}
          gradientClass="bg-gradient-to-br from-brand-purple to-brand-blue bg-clip-text text-transparent"
        />

        <div className="relative flex w-full flex-col gap-8 lg:flex-row lg:gap-16">
          {/* Phase 1 Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#ECEAF5] bg-white shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300"
          >
            {/* Left Accent Stripe */}
            <div className="absolute bottom-0 left-0 top-0 w-[6px] bg-brand-blue" />
            
            <div className="flex flex-1 flex-col p-8 sm:p-10 pl-10 sm:pl-12">
              <div className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-brand-blue">
                PHASE 1
              </div>
              <h3 className="mb-8 font-space-grotesk text-[2rem] font-bold leading-tight text-text-primary">
                Online National-Level Quiz
              </h3>
              
              <div className="mb-10 flex flex-col relative">
                <DecorativeIcon icon="stopwatch" className="absolute top-10 right-4" size={32} color="#1677ff" opacity={0.15} rotation={10} />
                <PhaseSpecRow label="Mode" value="Online" />
                <PhaseSpecRow label="Duration" value="90 Minutes" />
                <PhaseSpecRow label="Format" value="Objective MCQ" />
                <PhaseSpecRow label="Syllabus" value="Logical Reasoning, Verbal Ability, Quantitative Aptitude, Sports Trivia" />
                <PhaseSpecRow label="Special" value="Exclusive Talks & Exhibitions" />
                <PhaseSpecRow label="Qualification" value="Top 100 per Pool" />
              </div>

              <div className="mt-auto rounded-xl border border-brand-blue/10 bg-soft-blue px-6 py-5">
                <p className="font-inter text-[14.4px] font-semibold text-brand-blue">
                  → Top 100 qualify for the Final Round
                </p>
              </div>
            </div>
          </motion.div>

          {/* Divider 'THEN' for Desktop */}
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative flex h-full flex-col items-center justify-center">
              <div className="h-full w-px bg-[#ECEAF5]" />
              <div className="absolute flex h-12 w-12 items-center justify-center rounded-full border border-[#ECEAF5] bg-white font-inter text-[10px] font-semibold uppercase tracking-widest text-text-muted shadow-sm">
                THEN
              </div>
            </div>
          </div>

          {/* Phase 2 Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#ECEAF5] bg-white shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300"
          >
            {/* Left Accent Stripe */}
            <div className="absolute bottom-0 left-0 top-0 w-[6px] bg-brand-orange" />
            
            <div className="flex flex-1 flex-col p-8 sm:p-10 pl-10 sm:pl-12">
              <div className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
                PHASE 2 — FINALS
              </div>
              <h3 className="mb-8 font-space-grotesk text-[2rem] font-bold leading-tight text-text-primary">
                Advanced Challenge Round
              </h3>
              
              <div className="mb-10 flex flex-col relative">
                <DecorativeIcon icon="stopwatch" className="absolute top-10 right-4" size={32} color="#ff7c00" opacity={0.15} rotation={-10} />
                <PhaseSpecRow label="Mode" value="Online" />
                <PhaseSpecRow label="Duration" value="75 Minutes" />
                <PhaseSpecRow label="Difficulty" value="Significantly Higher" />
                <PhaseSpecRow label="Special" value="Exclusive Talks & Exhibitions" />
                <div className="relative w-full h-32 mt-4 rounded-xl overflow-hidden shadow-sm">
                  <Image src="/assets/felicitation.jpg" alt="Felicitation" fill className="object-cover" />
                </div>
                <PhaseSpecRow label="Selection" value="Top 3 Winners Per Pool" />
              </div>

              <div className="mt-auto rounded-xl border border-brand-orange/10 bg-soft-orange px-6 py-5">
                <p className="font-inter text-[14.4px] font-semibold text-brand-orange-text">
                  → Winners receive prizes worth ₹50,000+ & Pronite Passes
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <TornEdge top={false} fillColor="#FFFFFF" />
    </section>
  );
}
