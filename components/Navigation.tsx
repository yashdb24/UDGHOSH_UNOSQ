"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLenis } from "@/components/LenisProvider";
import { REGISTER_HREF } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Pools", href: "/#pools" },
  { label: "Phases", href: "/#phases" },
  { label: "Timeline", href: "/#timeline" },
  { label: "Prizes", href: "/#prizes" },
  { label: "Results", href: "/result" },
  { label: "FAQs", href: "/faq" },
  { label: "Login", href: "/login" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
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
    <>
      <header
        className={cn(
          "fixed left-0 top-0 z-[9999] w-full bg-white transition-all duration-400",
          isScrolled
            ? "shadow-[0_2px_12px_rgba(20,18,43,0.04)]"
            : "shadow-[0_1px_0_#ECEAF5]"
        )}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: isScrolled ? 0.92 : 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <Image
                src="/assets/UNOSQ_logo.png"
                alt="UNOSQ Logo"
                width={36}
                height={36}
                className="object-contain"
              />
              <span className="font-space-grotesk text-xl font-bold text-text-primary">UNOSQ</span>
            </motion.div>
          </div>

          {/* Center: Desktop Links */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("/#") && window.location.pathname === "/") {
                      e.preventDefault();
                      scrollTo(link.href.replace("/", ""));
                    }
                  }}
                  className={cn(
                    "group relative font-inter text-sm font-semibold tracking-wide transition-colors duration-300",
                    isActive ? "text-brand-orange-text" : "text-text-secondary hover:text-brand-orange-text"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-[2px] bg-brand-orange transition-transform duration-300 origin-left rounded-full",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 w-full"
                    )}
                    style={{ width: "100%" }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href={REGISTER_HREF}
              className="group relative hidden overflow-hidden rounded-full bg-brand-orange px-6 py-2.5 font-inter text-sm font-semibold text-white shadow-[0_3px_0_#C25200] transition-all duration-150 hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#C25200] md:inline-flex"
            >
              <span>Register Now</span>
            </Link>

            <button
              className="p-2 text-text-secondary md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99999] flex flex-col bg-white"
          >
            <div className="flex h-20 items-center justify-end px-6">
              <button
                className="p-2 text-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X size={32} />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="font-space-grotesk text-4xl font-bold text-text-primary hover:text-brand-orange-text"
                >
                  <Link 
                    href={link.href} 
                    onClick={(e) => {
                      if (link.href.startsWith("/#") && window.location.pathname === "/") {
                        e.preventDefault();
                        scrollTo(link.href.replace("/", ""));
                      } else {
                        setMobileMenuOpen(false);
                      }
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + NAV_LINKS.length * 0.1 }}
                className="mt-8"
              >
                <Link
                  href={REGISTER_HREF}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-full bg-brand-orange px-8 py-4 font-inter text-lg font-semibold text-white shadow-[0_3px_0_#C25200] transition-all duration-150 hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#C25200]"
                >
                  Register Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
