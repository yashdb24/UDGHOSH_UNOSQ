import { Variants } from "framer-motion";

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const wordRevealVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const accordionVariants: Variants = {
  hidden: { height: 0, opacity: 0, marginTop: 0 },
  visible: { 
    height: "auto", 
    opacity: 1,
    marginTop: 16,
    transition: {
      height: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      },
      opacity: {
        duration: 0.3,
        delay: 0.1
      }
    }
  },
  exit: { 
    height: 0, 
    opacity: 0,
    marginTop: 0,
    transition: {
      height: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      },
      opacity: {
        duration: 0.2
      }
    }
  }
};
