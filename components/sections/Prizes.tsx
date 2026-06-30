"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { TextReveal } from "@/components/animations/TextReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Headphones, Shirt, Ticket } from "lucide-react";
import { TornEdge } from "@/components/ui/TornEdge";
import { DecorativeIcon } from "@/components/ui/DecorativeIcons";
import Image from "next/image";

export function Prizes() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="prizes" className="relative w-full bg-bg-secondary py-32 md:py-36">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 md:px-12">
        <div className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
          05 / REWARDS
        </div>

        <TextReveal
          as="h2"
          text="Winners Take Everything."
          className="mb-16 text-center font-space-grotesk text-5xl font-bold tracking-tight text-text-primary md:text-[4rem]"
          gradientWords={["Everything."]}
          gradientClass="bg-gradient-to-br from-brand-purple to-brand-blue bg-clip-text text-transparent"
        />

        {/* Top Prize Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-16 flex w-full max-w-3xl flex-col items-center justify-center overflow-hidden rounded-[20px] border border-brand-gold/30 bg-soft-gold p-12 text-center md:p-16 shadow-card"
        >
          <DecorativeIcon icon="trophy" className="absolute top-10 left-10" size={48} rotation={-15} color="#f59337" opacity={0.3} />
          <DecorativeIcon icon="medal" className="absolute bottom-10 right-10" size={40} rotation={20} color="#ff7c00" opacity={0.3} />
          <DecorativeIcon icon="ribbon" className="absolute top-16 right-16" size={32} rotation={-10} color="#4229d5" opacity={0.2} />
          <DecorativeIcon icon="podium" className="absolute bottom-12 left-16" size={40} rotation={10} color="#1677ff" opacity={0.2} />
          
          <div className="mb-6 relative w-24 h-24 sm:w-32 sm:h-32">
            <Image src="/assets/Trophy_icon.svg" alt="Trophy" fill className="object-contain" />
          </div>
          <h3 className="mb-4 font-space-grotesk text-[clamp(4rem,8vw,6rem)] font-extrabold leading-none tracking-tight text-brand-gold">
            ₹50,000+
          </h3>
          <p className="font-inter text-lg text-text-secondary md:text-[1.1rem]">
            in prizes, gadgets, and merchandise
          </p>
        </motion.div>

        {/* Prize Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="mb-20 grid w-full grid-cols-1 gap-12 sm:grid-cols-3"
        >
          <motion.div variants={itemVariants}>
            <div className="flex h-full flex-col items-start rounded-2xl bg-soft-blue p-8 shadow-card border border-brand-blue/10 hover:shadow-card-hover transition-all duration-300">
              <Headphones className="mb-6 h-8 w-8 text-brand-blue" />
              <h4 className="mb-3 font-space-grotesk text-xl font-bold text-text-primary">
                Premium Gadgets
              </h4>
              <p className="font-inter text-sm leading-relaxed text-text-secondary">
                Top performers in each pool win cutting-edge tech.
              </p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex h-full flex-col items-start rounded-2xl bg-soft-purple p-8 shadow-card border border-brand-purple/10 hover:shadow-card-hover transition-all duration-300">
              <Shirt className="mb-6 h-8 w-8 text-brand-purple" />
              <h4 className="mb-3 font-space-grotesk text-xl font-bold text-text-primary">
                Udghosh Merch
              </h4>
              <p className="font-inter text-sm leading-relaxed text-text-secondary mb-4">
                Exclusive Udghosh-branded hoodies, bags, and collectibles.
              </p>
              <div className="relative w-full h-24 rounded-lg overflow-hidden mt-auto">
                <Image src="/assets/merch.jpg" alt="Udghosh Merch" fill className="object-cover" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex h-full flex-col items-start rounded-2xl bg-soft-orange p-8 shadow-card border border-brand-orange/10 hover:shadow-card-hover transition-all duration-300">
              <Ticket className="mb-6 h-8 w-8 text-brand-orange-text" />
              <h4 className="mb-3 font-space-grotesk text-xl font-bold text-text-primary">
                Udghosh Pronite Passes
              </h4>
              <p className="font-inter text-sm leading-relaxed text-text-secondary">
                Access to Udghosh '25's legendary pro-night events at IIT Kanpur campus.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Bonus Perks Strip */}
        <div className="w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-4"
          >
            {[
              "Certificates of Merit",
              "Talks with Sports Legends",
              "Interactive Workshops",
              "Academic Luminaries Q&A",
              "Exposure on IIT Kanpur's National Platform",
            ].map((perk, i) => (
              <div
                key={i}
                className="rounded-full border border-[#ECEAF5] bg-white px-5 py-2.5 font-inter text-[13.6px] font-medium text-text-muted transition-all duration-300 hover:border-brand-orange hover:bg-soft-orange hover:text-brand-orange-text shadow-sm"
              >
                {perk}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <TornEdge top={false} fillColor="#FFFFFF" />
    </section>
  );
}
