"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { TextReveal } from "@/components/animations/TextReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { POOLS } from "@/lib/constants";
import { FileText, Download } from "lucide-react";

export function SamplePapers() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="resources" className="relative w-full bg-white py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 md:px-12">
        <div className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
          06 / RESOURCES
        </div>

        <TextReveal
          as="h2"
          text="Practice Before You Compete."
          className="mb-20 text-center font-space-grotesk text-4xl font-bold tracking-tight text-text-primary md:text-[3.5rem]"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {POOLS.map((pool) => (
            <motion.div key={pool.id} variants={itemVariants}>
              <div
                className="flex flex-col p-8 rounded-2xl bg-white shadow-card border border-[#ECEAF5] hover:shadow-card-hover transition-all duration-300"
                style={{ borderTop: `4px solid ${pool.hex}` }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <FileText className="h-8 w-8" style={{ color: pool.hex }} />
                  <div
                    className="rounded-full px-3 py-1 font-inter text-[10px] font-semibold uppercase tracking-widest"
                    style={{
                      color: pool.hex,
                      backgroundColor: `${pool.hex}1A`,
                      border: `1px solid ${pool.hex}33`,
                    }}
                  >
                    {pool.badge}
                  </div>
                </div>

                <h3 className="mb-6 font-space-grotesk text-2xl font-bold text-text-primary">
                  {pool.name}
                </h3>

                <a
                  href="#"
                  download
                  className="group mt-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-inter text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  style={{ backgroundColor: pool.hex }}
                >
                  <Download size={16} />
                  <span>Download PDF</span>
                  {/* REPLACE WITH ACTUAL PDF LINK */}
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
