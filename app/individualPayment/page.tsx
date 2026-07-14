"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { TextReveal } from "@/components/animations/TextReveal";

export default function IndividualPayment() {
  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-orange/5 to-transparent pointer-events-none" />
      
      <Navigation />

      <div className="mx-auto max-w-4xl px-6 relative z-10 flex flex-col items-center">
        <TextReveal as="h1" text="Registration Payment" className="font-space-grotesk text-3xl sm:text-4xl font-extrabold text-text-primary mb-2 text-center" />
        <h2 className="font-inter text-lg sm:text-xl font-semibold text-brand-orange mb-6 text-center">Thanks for registering for UNOSQ'24.</h2>
        
        <p className="text-text-secondary font-inter mb-4 text-center">
          View the below PDF to see instructions to pay via SBI Collect:
        </p>
        <p className="font-inter text-text-primary mb-8 text-center text-lg">
          Please make a payment of <strong className="text-brand-orange">₹130</strong> through SBI Collect.
        </p>

        <div className="w-full bg-white/60 backdrop-blur-md rounded-3xl border border-[#ECEAF5] shadow-xl p-6 mb-8 flex flex-col items-center">
          
          <div className="w-full h-[60vh] min-h-[500px] rounded-2xl overflow-hidden border border-gray-200 mb-8 bg-gray-50 flex justify-center items-center">
            <iframe
              src="https://drive.google.com/file/d/1wF9mecPl7X6vojg-1GW6UySEZN9I9MYZ/preview"
              className="w-full h-full border-none"
              title="Payment Instructions PDF"
            ></iframe>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <a
              href="https://www.onlinesbi.sbi/sbicollect/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-4 px-6 bg-brand-orange text-white font-inter font-bold rounded-xl hover:bg-brand-orange/90 transition-colors shadow-lg shadow-brand-orange/20"
            >
              Click Here to Pay via SBI Collect
            </a>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSddliZouSgy-m3n45-dEXD0OYj6Ht7CmMqRrqqByiCOMzd3EQ/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-4 px-6 bg-brand-purple text-white font-inter font-bold rounded-xl hover:bg-brand-purple/90 transition-colors shadow-lg shadow-brand-purple/20"
            >
              Click Here to Submit Payment Receipt
            </a>
          </div>
        </div>

        <div className="bg-brand-orange/10 border border-brand-orange/20 rounded-xl p-4 text-center w-full max-w-2xl">
          <p className="font-inter text-brand-orange">
            <strong>Note:</strong> Filling out the form is mandatory for your registration to be considered.
          </p>
        </div>
      </div>
    </div>
  );
}
