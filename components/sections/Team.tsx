"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/animations/TextReveal";
import { GlassCard } from "@/components/ui/GlassCard";
import { TEAM } from "@/lib/constants";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Team() {
  return (
    <section id="team" className="relative w-full bg-bg-secondary py-24 md:py-32">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 md:px-12">
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
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#ECEAF5] bg-white shadow-card transition-shadow hover:shadow-card-hover"
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
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-3xl"
        >
          <div className="flex flex-col items-center p-12 text-center md:p-16 rounded-2xl bg-white shadow-card border border-[#ECEAF5]">
            <h3 className="mb-10 font-space-grotesk text-3xl font-semibold text-text-primary md:text-[2.5rem]">
              Get in Touch
            </h3>

            <div className="mb-12 flex flex-col gap-6 text-left">
              <a
                href="mailto:unosq.udghosh@gmail.com"
                className="group flex items-center gap-4 transition-colors"
              >
                <Mail className="h-[18px] w-[18px] shrink-0 text-brand-orange-text" />
                <span className="font-inter text-lg text-brand-blue group-hover:underline">
                  unosq.udghosh@gmail.com
                </span>
              </a>
              <a
                href="tel:+918619757403"
                className="group flex items-center gap-4 transition-colors"
              >
                <Phone className="h-[18px] w-[18px] shrink-0 text-brand-orange-text" />
                <span className="font-inter text-lg text-text-secondary group-hover:text-text-primary">
                  +91 8619757403
                </span>
              </a>
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
