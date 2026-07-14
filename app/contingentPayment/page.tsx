"use client";

import React from "react";
import { Navigation } from "@/components/Navigation";
import { TextReveal } from "@/components/animations/TextReveal";

export default function ContingentPayment() {
  return (
    <div className="min-h-screen bg-bg-primary pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-orange/5 to-transparent pointer-events-none" />
      
      <Navigation />

      <div className="mx-auto max-w-5xl px-6 relative z-10 flex flex-col items-center">
        <TextReveal as="h1" text="Registration Payment" className="font-space-grotesk text-3xl sm:text-4xl font-extrabold text-text-primary mb-2 text-center" />
        <h2 className="font-inter text-lg sm:text-xl font-semibold text-brand-orange mb-6 text-center">Thanks for registering for UNOSQ'24.</h2>
        
        <p className="text-text-secondary font-inter mb-8 text-center">
          Please refer to the PDF below for payment instructions:
        </p>

        <div className="w-full bg-white/60 backdrop-blur-md rounded-3xl border border-[#ECEAF5] shadow-xl p-6 mb-8 flex flex-col lg:flex-row gap-8">
          
          <div className="flex-1 aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 flex justify-center items-center">
            <iframe
              src="https://drive.google.com/file/d/1SvDOjNgqun4kpXLZY19wk-B__UQyETcx/preview"
              className="w-full h-full border-none"
              title="Payment Instructions"
            ></iframe>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-2xl p-6 mb-6">
              <h2 className="font-space-grotesk text-xl font-bold text-text-primary mb-4 border-b border-brand-purple/10 pb-2">Contingent Payment Details</h2>
              <p className="font-inter text-text-secondary text-sm mb-4">
                Please make a payment to the following Bank Account:
              </p>
              <ul className="space-y-3 font-inter text-sm text-text-primary">
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-text-secondary">Account Number:</span>
                  <strong className="font-mono">37926189366</strong>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-text-secondary">IFSC code:</span>
                  <strong className="font-mono">SBIN0001161</strong>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-text-secondary">Account Holder's Name:</span>
                  <strong>CDTE, IIT Kanpur</strong>
                </li>
                <li className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-text-secondary">Branch:</span>
                  <strong>IIT KANPUR</strong>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="text-text-secondary">Amount:</span>
                  <strong className="text-brand-orange">₹130 x (no. of students)</strong>
                </li>
              </ul>
            </div>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdSZRsXqZDPpDjtMdzmKVaBLulNah5XYXd9JBL9qhV4Q7ngyQ/viewform?usp=sf_link"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-4 px-6 bg-brand-purple text-white font-inter font-bold rounded-xl hover:bg-brand-purple/90 transition-colors shadow-lg shadow-brand-purple/20"
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
