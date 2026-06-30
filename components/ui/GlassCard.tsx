import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hoverLift?: boolean;
}

export function GlassCard({
  className,
  children,
  hoverLift = true,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/5 bg-bg-secondary/70 backdrop-blur-[20px] saturate-[180%] transition-all duration-300",
        hoverLift && "hover:-translate-y-1 hover:border-brand-orange/30 hover:shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
