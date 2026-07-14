"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { SponsorTicker } from "@/components/sections/SponsorTicker";
import { TrustBar } from "@/components/sections/TrustBar";
import { PaperFlockOverlay } from "@/components/three/PaperFlockOverlay";

// Dynamically import sections below the fold to improve initial load performance
const About = dynamic(() => import("@/components/sections/About").then((mod) => mod.About), { ssr: false });
const Pools = dynamic(() => import("@/components/sections/Pools").then((mod) => mod.Pools), { ssr: false });
const Phases = dynamic(() => import("@/components/sections/Phases").then((mod) => mod.Phases), { ssr: false });
const Timeline = dynamic(() => import("@/components/sections/Timeline").then((mod) => mod.Timeline), { ssr: false });
const Prizes = dynamic(() => import("@/components/sections/Prizes").then((mod) => mod.Prizes), { ssr: false });
const SamplePapers = dynamic(() => import("@/components/sections/SamplePapers").then((mod) => mod.SamplePapers), { ssr: false });
const Team = dynamic(() => import("@/components/sections/Team").then((mod) => mod.Team), { ssr: false });
const FAQ = dynamic(() => import("@/components/sections/FAQ").then((mod) => mod.FAQ), { ssr: false });
const FinalCTA = dynamic(() => import("@/components/sections/FinalCTA").then((mod) => mod.FinalCTA), { ssr: false });
const Footer = dynamic(() => import("@/components/sections/Footer").then((mod) => mod.Footer), { ssr: false });

export default function Home() {
  return (
    <main>
      <PaperFlockOverlay />
      <Hero />
      <SponsorTicker />
      <TrustBar />
      <About />
      <Pools />
      <Phases />
      <Timeline />
      <Prizes />
      <SamplePapers />
      <Team />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}

