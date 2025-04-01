// src/components/loaders/ContentRevealer.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ContentRevealerProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

// Make sure there's a proper default export
export default function ContentRevealer({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
}: ContentRevealerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}