"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TextReveal } from "@/components/animations/TextReveal";
import { DecorativeIcon } from "@/components/ui/DecorativeIcons";
import { FloatingPaperElements } from "@/components/ui/FloatingPaperElements";
import { FAQS } from "@/lib/constants";
import { Plus, X } from "lucide-react";
import { accordionVariants } from "@/lib/animations";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative w-full overflow-hidden bg-brand-orange/[0.02] py-24 md:py-32">
      
      {/* Corner Accent Graphic */}
      <div 
        className="absolute bottom-0 right-0 w-[400px] h-[400px] z-0 opacity-10 pointer-events-none mix-blend-multiply"
        style={{ WebkitMaskImage: "radial-gradient(circle at center, black 10%, transparent 60%)", maskImage: "radial-gradient(circle at center, black 10%, transparent 60%)" }}
      >
        <Image src="/elements/3681808.jpg" alt="FAQ Accent" fill className="object-cover object-[100%_100%]" />
      </div>
      <FloatingPaperElements variant="clouds" count={4} />
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 md:px-12 relative z-10">
        <div className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-brand-orange-text">
          08 / FAQs
        </div>

        <TextReveal
          as="h2"
          text="Got Questions?"
          className="mb-16 text-center font-space-grotesk text-4xl font-bold tracking-tight text-text-primary md:text-[3.5rem]"
          gradientWords={["Questions?"]}
          gradientClass="bg-gradient-to-br from-brand-purple to-brand-blue bg-clip-text text-transparent"
        />

        <div className="w-full">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={cn(
                  "border-b border-[#ECEAF5] transition-colors duration-300",
                  isOpen ? "bg-soft-orange/50" : "hover:bg-[#F8F7FB]"
                )}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between py-6 text-left px-4 group"
                >
                  <span className="font-inter text-base font-semibold text-text-primary pr-8 transition-colors duration-300 group-hover:text-brand-orange-text">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#ECEAF5] bg-white transition-all duration-300 shadow-sm",
                      isOpen ? "rotate-90 bg-soft-orange border-brand-orange/20" : ""
                    )}
                  >
                    {isOpen ? (
                      <X size={16} className="text-brand-orange-text" />
                    ) : (
                      <Plus size={16} className="text-text-muted" />
                    )}
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      variants={accordionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-4 pr-12 font-inter text-[15.2px] leading-relaxed text-text-secondary">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
