"use client";

import React from "react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Trophy, School, Clock, Users, ArrowRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { TextReveal } from "@/components/animations/TextReveal";
import { CountUp } from "@/components/animations/CountUp";

import { TornEdge } from "@/components/ui/TornEdge";
import { FloatingPaperElements } from "@/components/ui/FloatingPaperElements";
import { DecorativeIcon } from "@/components/ui/DecorativeIcons";
import Image from "next/image";

export function About() {
  const shouldReduceMotion = useReducedMotion();

  const staggerCardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="about" className="relative w-full overflow-hidden bg-white py-32 md:py-36">
      <FloatingPaperElements variant="birds" count={4} />
      
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 -z-10 opacity-5 pointer-events-none w-1/2 h-full max-w-2xl">
        <Image src="/assets/about_us.svg" alt="Background" fill className="object-cover object-right" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 md:px-12 lg:flex-row lg:gap-24 relative z-10">
        <DecorativeIcon icon="openBook" className="top-10 left-10" size={48} rotation={-15} color="#4229d5" opacity={0.15} />
        <DecorativeIcon icon="pencil" className="bottom-20 left-1/2" size={40} rotation={25} color="#ff7c00" opacity={0.15} />
        {/* Left Column */}
        <div className="flex flex-1 flex-col justify-center">
          <div className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
            01 / ABOUT
          </div>
          
          <TextReveal
            as="h2"
            text="More Than Just a Quiz."
            className="mb-8 font-space-grotesk text-5xl font-bold tracking-tight text-text-primary md:text-[4rem] leading-tight"
            gradientWords={["a", "Quiz."]}
            gradientClass="bg-gradient-to-br from-brand-purple to-brand-blue bg-clip-text text-transparent"
          />

          <div className="flex max-w-xl flex-col gap-6 text-text-secondary font-inter text-base md:text-lg leading-[1.7]">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              UNOSQ — Udghosh National Open School Quiz — is India's premier open quiz competition for school students from Classes 5 to 12, organized by Udghosh, Asia's largest college sports festival hosted annually at IIT Kanpur.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              It is a celebration of intellect and sportsmanship, offering participants the chance to interact with academic luminaries and celebrated sports personalities through specially curated seminars, workshops, and exclusive Pronite passes.
            </motion.p>
          </div>

          <motion.a
            href="#phases"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="group mt-10 inline-flex items-center gap-2 font-inter text-sm font-semibold text-brand-orange-text"
          >
            Learn about the phases
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* Right Column: Stat Cards */}
        <div className="flex flex-1 items-center justify-center lg:justify-end">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid w-full max-w-[540px] grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6"
          >
            {/* Card 1 */}
            <motion.div variants={staggerCardVariants}>
              <div className="group flex flex-col items-start gap-6 p-8 rounded-2xl bg-soft-orange shadow-card border border-brand-orange/10 hover:shadow-card-hover transition-all duration-300">
                <Trophy className="h-8 w-8 text-brand-orange-text transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <div className="font-space-grotesk text-[3.5rem] font-extrabold leading-none text-brand-orange-text">
                    <CountUp to={5000} suffix="+" />
                  </div>
                  <div className="mt-2 font-inter text-sm font-medium text-text-secondary">Students Reached</div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={staggerCardVariants}>
              <div className="group flex flex-col items-start gap-6 p-8 rounded-2xl bg-soft-blue shadow-card border border-brand-blue/10 hover:shadow-card-hover transition-all duration-300 lg:mt-8">
                <School className="h-8 w-8 text-brand-blue transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <div className="font-space-grotesk text-[3.5rem] font-extrabold leading-none text-brand-blue">
                    <CountUp to={100} suffix="+" />
                  </div>
                  <div className="mt-2 font-inter text-sm font-medium text-text-secondary">Schools Participated</div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={staggerCardVariants}>
              <div className="group flex flex-col items-start gap-6 p-8 rounded-2xl bg-soft-purple shadow-card border border-brand-purple/10 hover:shadow-card-hover transition-all duration-300">
                <Clock className="h-8 w-8 text-brand-purple transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <div className="font-space-grotesk text-[3.5rem] font-extrabold leading-none text-brand-purple">
                    <CountUp to={5} suffix="+" />
                  </div>
                  <div className="mt-2 font-inter text-sm font-medium text-text-secondary">Years of Legacy</div>
                </div>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={staggerCardVariants}>
              <div className="group flex flex-col items-start gap-6 p-8 rounded-2xl bg-soft-gold shadow-card border border-brand-gold/10 hover:shadow-card-hover transition-all duration-300 lg:mt-8">
                <Users className="h-8 w-8 text-brand-gold transition-transform duration-300 group-hover:scale-110" />
                <div>
                  <div className="font-space-grotesk text-[3.5rem] font-extrabold leading-none text-brand-gold">
                    <CountUp to={25} suffix="+" />
                  </div>
                  <div className="mt-2 font-inter text-sm font-medium text-text-secondary">Expert Mentors</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <TornEdge top={false} fillColor="#FFFFFF" />
    </section>
  );
}
