"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DecorativeIcon } from "@/components/ui/DecorativeIcons";
import { FloatingPaperElements } from "@/components/ui/FloatingPaperElements";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/animations/TextReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { TEAM } from "@/lib/constants";
import { Mail, Phone, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Team() {
  const [copied, setCopied] = useState<string | null>(null);

  return (
    <section id="team" className="relative w-full bg-brand-orange/[0.02] py-24 md:py-32">
      <FloatingPaperElements variant="mixed" count={4} />
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 md:px-12 relative z-10">
        <div className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
          07 / THE TEAM
        </div>

        <TextReveal
          as="h2"
          text="Meet the Minds Behind UNOSQ."
          className="mb-20 text-center font-space-grotesk text-4xl font-bold tracking-tight text-text-primary md:text-[3.5rem]"
        />

        {/* Team Cards */}
        <div className="mb-32 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#ECEAF5] bg-white shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-2"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              
              {/* Info Block */}
              <div className="absolute bottom-0 left-0 w-full translate-y-4 p-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="font-space-grotesk text-xl font-semibold text-text-primary">
                  {member.name}
                </div>
                <div className="mt-1 font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
                  {member.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Block */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl"
        >
          {/* Decorative Frame */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-20 pointer-events-none w-[110%] h-[120%]">
            <Image src="/elements/background-removed (3).png" alt="Decorative Frame" fill className="object-contain" />
          </div>

          <div className="flex flex-col items-center p-12 text-center md:p-16 rounded-2xl bg-white shadow-card border border-[#ECEAF5]">
            <h3 className="mb-10 font-space-grotesk text-3xl font-semibold text-text-primary md:text-[2.5rem]">
              Get in Touch
            </h3>

            <div className="mb-12 flex flex-col gap-6 text-left">
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText("unosq.udghosh@gmail.com");
                  setCopied("email");
                  setTimeout(() => setCopied(null), 2000);
                }}
                className="group flex items-center gap-4 transition-colors"
              >
                {copied === "email" ? (
                  <Check className="h-[18px] w-[18px] shrink-0 text-brand-green" />
                ) : (
                  <Mail className="h-[18px] w-[18px] shrink-0 text-brand-orange-text" />
                )}
                <span className="font-inter text-lg text-brand-blue group-hover:underline">
                  {copied === "email" ? "Copied to clipboard!" : "unosq.udghosh@gmail.com"}
                </span>
              </button>
              
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText("+91 8619757403");
                  setCopied("phone");
                  setTimeout(() => setCopied(null), 2000);
                }}
                className="group flex items-center gap-4 transition-colors"
              >
                {copied === "phone" ? (
                  <Check className="h-[18px] w-[18px] shrink-0 text-brand-green" />
                ) : (
                  <Phone className="h-[18px] w-[18px] shrink-0 text-brand-orange-text" />
                )}
                <span className="font-inter text-lg text-text-secondary group-hover:text-text-primary">
                  {copied === "phone" ? "Copied to clipboard!" : "+91 8619757403"}
                </span>
              </button>
              
              <div className="flex items-center gap-4">
                <MapPin className="h-[18px] w-[18px] shrink-0 text-brand-orange-text" />
                <span className="font-inter text-lg text-text-secondary">
                  IIT Kanpur, UP 208016
                </span>
              </div>
            </div>

            <a
              href="https://instagram.com/udghosh_iitk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-brand-orange px-8 py-3.5 font-inter text-base font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-brand-orange/90 hover:shadow-lg"
            >
              Follow Udghosh on Instagram
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
