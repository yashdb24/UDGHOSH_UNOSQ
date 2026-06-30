"use client";

import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { POOLS } from "@/lib/constants";
import { TextReveal } from "@/components/animations/TextReveal";
import { Button } from "@/components/ui/Button";
import { DecorativeIcon } from "@/components/ui/DecorativeIcons";

function PoolCard({ pool, index }: { pool: typeof POOLS[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          transformStyle: "preserve-3d",
          borderTop: `4px solid ${pool.hex}`,
        }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300"
      >
        {/* Glow behind card on hover */}
        <div
          className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at center, ${pool.hex}0D 0%, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col" style={{ transform: "translateZ(30px)" }}>
          <div className="mb-6 flex items-start justify-between">
            <div
              className="inline-flex rounded-full border px-3 py-1 font-inter text-xs font-semibold uppercase tracking-widest"
              style={{
                color: pool.hex,
                borderColor: `${pool.hex}4D`,
                backgroundColor: `${pool.hex}14`,
              }}
            >
              {pool.badge}
            </div>
            
            {/* Watermark Number */}
            <div
              className="absolute -right-4 -top-6 select-none font-space-grotesk text-[5rem] font-extrabold leading-none"
              style={{ color: `${pool.hex}1F` }}
            >
              {pool.number}
              <DecorativeIcon icon={index % 2 === 0 ? "checkmark" : "abcd"} className="absolute top-8 -left-4" size={24} color={pool.hex} opacity={0.3} rotation={15} />
            </div>
          </div>

          {/* Thumbnail Placeholder */}
          <div className="relative mb-6 h-28 w-full rounded-xl overflow-hidden bg-gray-100 animate-pulse flex items-center justify-center">
            <span className="text-gray-400 font-inter text-[10px] font-medium uppercase tracking-widest">Pool Photo</span>
          </div>

          <h3 className="mb-3 font-space-grotesk text-2xl font-bold text-text-primary">
            {pool.name}
          </h3>
          <p className="flex-1 font-inter text-[14.4px] leading-relaxed text-text-secondary">
            {pool.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Pools() {
  return (
    <section id="pools" className="relative w-full bg-bg-secondary py-32 md:py-36">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 text-center md:px-12">
        
        <div className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
          02 / POOLS
        </div>
        
        <TextReveal
          as="h2"
          text="Find Your Pool."
          className="mb-6 font-space-grotesk text-5xl font-bold tracking-tight text-text-primary md:text-[4rem]"
          gradientWords={["Pool."]}
          gradientClass="bg-gradient-to-br from-brand-purple to-brand-blue bg-clip-text text-transparent"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20 max-w-lg font-inter text-base text-text-secondary md:text-lg"
        >
          UNOSQ is open to all school students, Class 5 to 12, across India.
        </motion.p>

        <div className="mb-16 grid w-full grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {POOLS.map((pool, i) => (
            <PoolCard key={pool.id} pool={pool} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="#resources"
            className="inline-flex rounded-full border-[1.5px] border-text-muted bg-transparent px-8 py-3.5 font-inter text-base font-semibold text-text-primary transition-all duration-300 hover:border-brand-orange hover:text-brand-orange-text"
          >
            Download Sample Papers
          </a>
        </motion.div>
      </div>
    </section>
  );
}
