"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only show on first load
    const hasLoaded = sessionStorage.getItem("unosq-loaded");
    if (hasLoaded) {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("unosq-loaded", "true");
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-bg-primary"
        >
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-syne text-5xl font-extrabold tracking-tight text-white">
              UNOSQ
            </h1>
            <div className="relative h-1 w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute left-0 top-0 h-full bg-brand-orange"
                initial={{ width: "0%", left: "0%" }}
                animate={{ width: ["0%", "50%", "100%"], left: ["0%", "25%", "100%"] }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
