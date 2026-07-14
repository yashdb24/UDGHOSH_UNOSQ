"use client";

import React from "react";
import Image from "next/image";

const SPONSORS = [
  { name: "GradeMe AI", src: "/assets/grademe_ai_logo.jpg" },
];

export function SponsorTicker() {
  return (
    <div className="flex h-auto md:h-20 w-full flex-col md:flex-row items-center justify-center border-y border-brand-blue/5 bg-bg-secondary overflow-hidden py-4 md:py-0">
      {/* Left Label */}
      <div className="flex items-center px-6 md:px-12 z-10 shrink-0 bg-bg-secondary md:border-r border-brand-blue/5 h-full mb-4 md:mb-0">
        <span className="font-inter text-xs font-semibold tracking-widest text-text-muted uppercase whitespace-nowrap">
          Supported By
        </span>
      </div>

      {/* Ticker Track */}
      <div className="flex w-full max-w-[1000px] overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-bg-secondary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-bg-secondary to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-[marquee_30s_linear_infinite] items-center min-w-max hover:[animation-play-state:paused]">
          {/* Double the list for seamless looping (x4 total since we translate -50%) */}
          {[...SPONSORS, ...SPONSORS, ...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
            <div key={idx} className="group mx-6 md:mx-8 flex w-32 md:w-40 shrink-0 items-center justify-center">
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={120}
                height={40}
                className="object-contain h-[32px] md:h-[40px] w-full filter grayscale-[0.8] opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
