import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Custom split text utility for word-by-word reveal (as requested to avoid GSAP SplitText paid plugin)
export function splitTextToWords(text: string): string[] {
  return text.split(" ");
}
