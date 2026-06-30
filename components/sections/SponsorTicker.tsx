"use client";

import React from "react";
import Image from "next/image";

const SPONSORS = [
  { name: "ExtraMarks", src: "/assets/extramarks.png" },
  { name: "Physics Wallah", src: "/assets/physics_wallah.png" },
  { name: "SpeedExam", src: "/assets/speedexam.png" },
];

export function SponsorTicker() {
  return (
    <div className="flex h-20 w-full items-center border-y border-brand-blue/5 bg-bg-secondary overflow-hidden">
      {/* Left Label */}
      <div className="flex h-full items-center border-r border-brand-blue/5 bg-bg-secondary px-6 md:px-12 z-10 shrink-0">
        <span className="font-inter text-xs font-semibold tracking-widest text-text-muted uppercase">
          Supported By
        </span>
      </div>

      {/* Ticker Track */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex animate-[marquee_30s_linear_infinite] items-center whitespace-nowrap min-w-max pl-10 hover:[animation-play-state:paused]">
          {/* Double the list for seamless looping */}
          {[...SPONSORS, ...SPONSORS, ...SPONSORS].map((sponsor, idx) => (
            <div key={idx} className="group mx-10 flex shrink-0 items-center justify-center">
              <Image
                src={sponsor.src}
                alt={sponsor.name}
                width={120}
                height={40}
                className="object-contain h-[40px] w-auto filter grayscale-[0.8] opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
