"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
}

export function Button({
  className,
  variant = "primary",
  href,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-inter font-semibold transition-all duration-300 outline-none";

  const variants = {
    primary:
      "bg-brand-orange text-white px-10 py-4 shadow-[0_3px_0_#C25200] hover:brightness-110 active:translate-y-[2px] active:shadow-[0_1px_0_#C25200] transition-all duration-150",
    secondary:
      "border border-[#ECEAF5] bg-white text-text-primary px-6 py-2.5 text-sm hover:border-brand-orange hover:text-brand-orange-text hover:bg-soft-orange shadow-sm transition-all duration-300",
    ghost:
      "bg-transparent text-text-primary px-10 py-4 hover:bg-black/5 transition-colors duration-300",
  };

  const Component = href ? "a" : "button";

  return (
    // @ts-expect-error - TS gets confused by dynamic Component rendering
    <Component
      className={cn(baseStyles, variants[variant], className)}
      href={href}
      {...(href
        ? { target: "_blank", rel: "noopener noreferrer" }
        : { type: "button" })}
      {...props}
    >
      {children}
    </Component>
  );
}
