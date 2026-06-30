import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  showDot?: boolean;
  dotColor?: string; // Tailwind bg color class
}

export function Badge({
  className,
  children,
  showDot = false,
  dotColor = "bg-brand-orange",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-4 py-1.5",
        className
      )}
      {...props}
    >
      {showDot && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-[pulse-dot_1.5s_ease-in-out_infinite] rounded-full opacity-75",
              dotColor
            )}
          ></span>
          <span
            className={cn("relative inline-flex h-2 w-2 rounded-full", dotColor)}
          ></span>
        </span>
      )}
      <span className="font-inter text-sm font-medium text-brand-orange-text">
        {children}
      </span>
    </div>
  );
}
