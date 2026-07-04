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
    <section id="about" className="relative w-full overflow-hidden bg-brand-orange/[0.02] py-32 md:py-36">
      <FloatingPaperElements variant="birds" count={4} />
      
      {/* Background Graphic Left (Sepia Doodles) */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none mix-blend-multiply">
        <Image src="/elements/3610929.jpg" alt="Background Left" fill className="object-cover" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 md:px-12 lg:flex-row lg:gap-24 relative z-10">
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
        <div className="flex flex-1 items-center justify-center lg:justify-end relative">
          
          {/* Background Graphic Right (Science Frame) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-60 pointer-events-none w-[150%] h-[150%] max-w-[900px]">
            <Image src="/elements/science_background_website.png" alt="Background Right Frame" fill className="object-contain" />
          </div>

          {/* Backpack Accent */}
          <div className="absolute -bottom-10 -left-16 z-20 w-48 h-48 pointer-events-none drop-shadow-[0_16px_24px_rgba(0,0,0,0.15)]">
            <Image src="/elements/background-removed.png" alt="School Backpack" fill className="object-contain" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid w-full max-w-[540px] grid-cols-2 gap-10 relative z-10"
          >
            {/* Card 1 */}
            <motion.div variants={staggerCardVariants}>
              <div className="group flex h-full flex-col items-start gap-6 p-8 rounded-2xl bg-soft-orange shadow-card border border-brand-orange/10 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300">
                <Trophy className="h-8 w-8 text-brand-orange-text transition-transform duration-300 group-hover:scale-110" />
                <div className="mt-auto">
                  <div className="font-space-grotesk text-[3.5rem] font-extrabold leading-none text-brand-orange-text">
                    <CountUp to={5000} suffix="+" />
                  </div>
                  <div className="mt-2 font-inter text-sm font-medium text-text-secondary">Students Reached</div>
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={staggerCardVariants}>
              <div className="group flex h-full flex-col items-start gap-6 p-8 rounded-2xl bg-soft-blue shadow-card border border-brand-blue/10 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300">
                <School className="h-8 w-8 text-brand-blue transition-transform duration-300 group-hover:scale-110" />
                <div className="mt-auto">
                  <div className="font-space-grotesk text-[3.5rem] font-extrabold leading-none text-brand-blue">
                    <CountUp to={100} suffix="+" />
                  </div>
                  <div className="mt-2 font-inter text-sm font-medium text-text-secondary">Schools Participated</div>
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={staggerCardVariants}>
              <div className="group flex h-full flex-col items-start gap-6 p-8 rounded-2xl bg-soft-purple shadow-card border border-brand-purple/10 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300">
                <Clock className="h-8 w-8 text-brand-purple transition-transform duration-300 group-hover:scale-110" />
                <div className="mt-auto">
                  <div className="font-space-grotesk text-[3.5rem] font-extrabold leading-none text-brand-purple">
                    <CountUp to={5} suffix="+" />
                  </div>
                  <div className="mt-2 font-inter text-sm font-medium text-text-secondary">Years of Legacy</div>
                </div>
              </div>
            </motion.div>

            {/* Card 4 */}
            <motion.div variants={staggerCardVariants}>
              <div className="group flex h-full flex-col items-start gap-6 p-8 rounded-2xl bg-soft-gold shadow-card border border-brand-gold/10 hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300">
                <Users className="h-8 w-8 text-brand-gold transition-transform duration-300 group-hover:scale-110" />
                <div className="mt-auto">
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

      {/* Gallery Strip */}
      <div className="mt-32 w-full overflow-hidden flex gap-4 px-4 pb-12">
        {["galleryImage1", "GalleryImage2", "GalleryImage3", "GalleryImage4", "GalleryImage5"].map((img, i) => (
          <div key={i} className="relative h-48 w-72 shrink-0 rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-300 shadow-md">
            <Image src={`/assets/gallery/${img}.webp`} alt={`Gallery Image ${i + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      <TornEdge top={false} fillColor="#FFFFFF" />
    </section>
  );
}
