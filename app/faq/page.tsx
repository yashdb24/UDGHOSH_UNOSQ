import React from "react";
import { Metadata } from "next";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { TextReveal } from "@/components/animations/TextReveal";

export const metadata: Metadata = {
  title: "FAQs | UNOSQ '26",
  description: "Find answers to all your questions about the Udghosh National Open Science Quiz 2025.",
};

const FAQ_ITEMS: AccordionItem[] = [
  {
    id: "cost",
    title: "Is the exam free of cost?",
    content: "No. The Registration Fee for UNOSQ is ₹130 per participant including all taxes.",
  },
  {
    id: "procedure",
    title: "What is the registration procedure?",
    content: "If your school participates as a contingent, then the school has to register as a contingent on the UNOSQ Website, collect data and registration fees from the students and send them to us. If the students participate by themselves individually, then they have to register directly on the UNOSQ website.",
  },
  {
    id: "phases",
    title: "In how many phases will the exam be conducted?",
    content: "The exam is conducted in 2 phases and registration is open till 15th August.",
  },
  {
    id: "mode",
    title: "How will the exam be conducted?",
    content: "Online mode.",
  },
  {
    id: "qualify",
    title: "How many students will be qualified for Phase 2?",
    content: "100 students from each pool.",
  },
  {
    id: "type",
    title: "Will the exam be subjective or objective?",
    content: "Objective MCQ questions.",
  },
  {
    id: "medium",
    title: "In which medium will the exam be conducted?",
    content: "English and Hindi.",
  },
  {
    id: "pools",
    title: "How many pools are there?",
    content: (
      <div className="space-y-2">
        <p>There are 4 Pools based on your class:</p>
        <ul className="list-disc pl-5 space-y-1 text-brand-orange-text font-semibold">
          <li>Pool LITTLE CHAMPS - Class 5-6</li>
          <li>Pool SUPER NOVA - Class 7-8</li>
          <li>Pool THE TITANS - Class 9-10</li>
          <li>Pool ELITE EXPLORERS - Class 11-12</li>
        </ul>
      </div>
    ),
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24 relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-orange/5 to-transparent pointer-events-none" />
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 -left-40 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-3xl px-6 relative z-10">
        <div className="mb-12 text-center">
          <TextReveal
            as="h1"
            text="Frequently Asked Questions"
            className="font-space-grotesk text-4xl font-extrabold text-text-primary md:text-5xl lg:text-6xl mb-4"
          />
          <p className="text-lg text-text-secondary font-inter">
            Everything you need to know about participating in UNOSQ '26.
          </p>
        </div>

        <div className="bg-white/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-[#ECEAF5] shadow-sm">
          <Accordion items={FAQ_ITEMS} defaultExpanded={["cost"]} />
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-text-secondary font-inter mb-4">Still have questions?</p>
          <a
            href="mailto:contact@unosq.org"
            className="inline-flex items-center gap-2 rounded-full border border-[#ECEAF5] bg-white px-6 py-3 font-inter text-sm font-semibold text-text-primary shadow-sm transition-all hover:border-brand-orange hover:text-brand-orange-text"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
