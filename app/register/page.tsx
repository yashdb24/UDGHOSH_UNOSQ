"use client";

import React from "react";
import Link from "next/link";
import { User, Building2 } from "lucide-react";
import { TextReveal } from "@/components/animations/TextReveal";

export default function RegisterSelectionPage() {
  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24 relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-orange/5 to-transparent pointer-events-none" />
      <div className="absolute top-40 -right-40 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-4xl px-6">
        <div className="mb-12 text-center">
          <TextReveal
            as="h1"
            text="Choose Registration Type"
            className="font-space-grotesk text-4xl font-extrabold text-text-primary mb-3"
          />
          <p className="text-text-secondary font-inter">Select how you would like to register for UNOSQ '26</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Link href="/individual_signup" className="group block h-full">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#ECEAF5] p-10 h-full flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-brand-orange/50 transition-all duration-300 hover:-translate-y-2">
              <div className="h-20 w-20 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <User size={36} className="text-brand-orange" />
              </div>
              <h2 className="text-2xl font-bold font-space-grotesk text-text-primary mb-3">Individual</h2>
              <p className="text-text-secondary font-inter text-sm leading-relaxed mb-6">
                Register as a single student. You will be placed into the appropriate pool based on your class (5th - 12th).
              </p>
              <div className="mt-auto px-6 py-2.5 bg-gray-50 group-hover:bg-brand-orange group-hover:text-white rounded-full font-semibold text-sm transition-colors duration-300">
                Register as Individual →
              </div>
            </div>
          </Link>

          <Link href="/contingent_signup" className="group block h-full">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl border border-[#ECEAF5] p-10 h-full flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:border-brand-blue/50 transition-all duration-300 hover:-translate-y-2">
              <div className="h-20 w-20 bg-brand-blue/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Building2 size={36} className="text-brand-blue" />
              </div>
              <h2 className="text-2xl font-bold font-space-grotesk text-text-primary mb-3">School Contingent</h2>
              <p className="text-text-secondary font-inter text-sm leading-relaxed mb-6">
                Register as a school authority to enroll multiple students as a contingent representing your institution.
              </p>
              <div className="mt-auto px-6 py-2.5 bg-gray-50 group-hover:bg-brand-blue group-hover:text-white rounded-full font-semibold text-sm transition-colors duration-300">
                Register as Contingent →
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
