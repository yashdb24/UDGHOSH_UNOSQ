"use client";

import React from "react";
import { motion } from "framer-motion";

export type IconType = 
  | "lightbulb" 
  | "questionBubble" 
  | "pencil" 
  | "openBook" 
  | "checkmark" 
  | "abcd" 
  | "trophy" 
  | "medal" 
  | "ribbon"
  | "track"
  | "whistle"
  | "stopwatch"
  | "podium"
  | "starburst";

interface DecorativeIconProps {
  icon: IconType;
  size?: number;
  color?: string;
  rotation?: number;
  className?: string;
  opacity?: number;
}

export function DecorativeIcon({
  icon,
  size = 32,
  color = "#ff7c00",
  rotation = 0,
  className = "",
  opacity = 0.2
}: DecorativeIconProps) {
  
  const getIcon = () => {
    switch (icon) {
      case "lightbulb":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <path d="M9 18h6" />
            <path d="M10 22h4" />
            <path d="M12 2v1" />
            <path d="M12 7v1" />
            <path d="M4 12h1" />
            <path d="M19 12h1" />
            <path d="M5.5 5.5l.7.7" />
            <path d="M18.5 5.5l-.7.7" />
            <path d="M9 18c-1.5-1.5-3-3.5-3-6 0-3.3 2.7-6 6-6s6 2.7 6 6c0 2.5-1.5 4.5-3 6" />
          </svg>
        );
      case "questionBubble":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <path d="M7.9 20A9 9 0 0 1 4 16.5L2 22l5.5-2a9 9 0 1 1 .4-2z" />
            <path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        );
      case "pencil":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
          </svg>
        );
      case "openBook":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        );
      case "checkmark":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        );
      case "abcd":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M9 9h6" />
            <path d="M9 13h6" />
            <path d="M9 17h6" />
            <circle cx="6" cy="9" r="1" fill={color} />
            <circle cx="6" cy="13" r="1" fill={color} />
            <circle cx="6" cy="17" r="1" fill={color} />
          </svg>
        );
      case "trophy":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7c0 3.31 2.69 6 6 6s6-2.69 6-6V2z" />
          </svg>
        );
      case "medal":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <circle cx="12" cy="8" r="7" />
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
          </svg>
        );
      case "ribbon":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <path d="M12 15l-3 4-2-9" />
            <path d="M12 15l3 4 2-9" />
            <circle cx="12" cy="8" r="5" />
          </svg>
        );
      case "track":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <path d="M2 12h20" />
            <path d="M4 6h16" />
            <path d="M4 18h16" />
            <path d="M12 2v20" />
            <path d="M8 4l2 16" />
            <path d="M16 4l-2 16" />
          </svg>
        );
      case "whistle":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <path d="M14 22v-4a2 2 0 1 0-4 0v4" />
            <path d="M20 10.5a8 8 0 1 1-16 0c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
            <path d="M12 2.5v4" />
            <path d="M19 10h3" />
          </svg>
        );
      case "stopwatch":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <circle cx="12" cy="13" r="8" />
            <path d="M12 9v4l2 2" />
            <path d="M10 2h4" />
            <path d="M14.5 4.5L17 7" />
          </svg>
        );
      case "podium":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <path d="M4 22h16" />
            <path d="M8 22V10h8v12" />
            <path d="M2 22v-6h6v6" />
            <path d="M16 22v-8h6v8" />
            <path d="M12 14v4" />
          </svg>
        );
      case "starburst":
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: size, height: size }}>
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: opacity, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`absolute pointer-events-none ${className}`}
      style={{
        transform: `rotate(${rotation}deg)`,
      }}
    >
      {getIcon()}
    </motion.div>
  );
}
