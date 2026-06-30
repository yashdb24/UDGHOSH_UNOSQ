"use client";

import React from "react";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa6";
import { useLenis } from "@/components/LenisProvider";

export function Footer() {
  const lenis = useLenis();

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { offset: -80 });
    } else {
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="w-full border-t border-[#ECEAF5] bg-bg-secondary pt-20">
      <div className="mx-auto flex max-w-7xl flex-col px-6 md:px-12">
        
        {/* Top Grid */}
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col items-start">
            <div className="mb-6 flex items-center gap-3">
              <Image
                src="/assets/UNOSQ_logo.png"
                alt="UNOSQ Logo"
                width={36}
                height={36}
                className="object-contain"
              />
              <span className="font-space-grotesk text-xl font-extrabold text-text-primary">UNOSQ</span>
            </div>
            <p className="mb-8 font-inter text-[13.6px] leading-relaxed text-text-secondary">
              Unleashing Young Minds. Powered by Udghosh, IIT Kanpur.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/udghosh_iitk" target="_blank" rel="noreferrer" className="text-text-muted transition-colors hover:text-brand-orange-text">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com/@UdghoshIITK" target="_blank" rel="noreferrer" className="text-text-muted transition-colors hover:text-brand-orange-text">
                <FaYoutube size={20} />
              </a>
              <a href="https://linkedin.com/company/udghosh-iit-kanpur" target="_blank" rel="noreferrer" className="text-text-muted transition-colors hover:text-brand-orange-text">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col items-start lg:pl-12">
            <h4 className="mb-6 font-space-grotesk text-lg font-bold text-text-primary">Quick Links</h4>
            <nav className="flex flex-col gap-4">
              {["About", "Phases", "Timeline", "Sample Papers", "FAQs"].map((link) => {
                const href = link === "Sample Papers" ? "#resources" : `#${link.toLowerCase().replace(" ", "")}`;
                return (
                  <a
                    key={link}
                    href={href}
                    onClick={(e) => scrollTo(e, href)}
                    className="font-inter text-[14px] text-text-secondary transition-colors hover:text-brand-orange-text"
                  >
                    {link}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col items-start lg:pl-8">
            <h4 className="mb-6 font-space-grotesk text-lg font-bold text-text-primary">Contact</h4>
            <div className="flex flex-col gap-4 font-inter text-[14px] text-text-secondary">
              <a href="mailto:unosq.udghosh@gmail.com" className="transition-colors hover:text-brand-orange-text">
                unosq.udghosh@gmail.com
              </a>
              <a href="tel:+918619757403" className="transition-colors hover:text-text-primary">
                +91 8619757403
              </a>
              <span>IIT Kanpur, UP 208016</span>
            </div>
          </div>

          {/* Column 4: Organized By */}
          <div className="flex flex-col items-start lg:pl-4">
            <h4 className="mb-6 font-space-grotesk text-lg font-bold text-text-primary">Organized by</h4>
            <div className="flex flex-col items-start gap-4">
              {/* UDGHOSH LOGO PLACEHOLDER: 120x40px */}
              <div className="h-[40px] w-[120px] rounded bg-white flex items-center justify-center border border-[#ECEAF5]">
                <span className="font-space-grotesk text-sm text-text-muted">Udghosh Logo</span>
              </div>
              <p className="font-inter text-[13.6px] leading-relaxed text-text-secondary">
                India's Premier College Sports Fest<br />
                IIT Kanpur
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col items-center justify-between border-t border-[#ECEAF5] py-6 sm:flex-row">
          <p className="mb-4 text-center font-inter text-xs font-medium tracking-wide text-text-muted sm:mb-0 sm:text-left">
            © 2025 Udghosh — IIT Kanpur. All rights reserved.
          </p>
          <p className="text-center font-inter text-xs font-medium tracking-wide text-text-muted sm:text-right">
            Designed for the sharpest young minds in India.
          </p>
        </div>

      </div>
    </footer>
  );
}
