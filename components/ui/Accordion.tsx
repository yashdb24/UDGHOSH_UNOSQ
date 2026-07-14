"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultExpanded?: string[];
  allowMultiple?: boolean;
}

export function Accordion({ items, defaultExpanded = [], allowMultiple = false }: AccordionProps) {
  const [expandedIds, setExpandedIds] = useState<string[]>(defaultExpanded);

  const toggle = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((i) => i !== id));
    } else {
      if (allowMultiple) {
        setExpandedIds([...expandedIds, id]);
      } else {
        setExpandedIds([id]);
      }
    }
  };

  return (
    <div className="w-full space-y-4">
      {items.map((item) => {
        const isExpanded = expandedIds.includes(item.id);

        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-[#ECEAF5] bg-white shadow-sm transition-all hover:border-brand-purple/30"
          >
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
            >
              <span className="font-space-grotesk text-lg font-bold text-text-primary md:text-xl">
                {item.title}
              </span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="ml-4 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-brand-orange/10 text-brand-orange"
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-2 font-inter text-base text-text-secondary">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
