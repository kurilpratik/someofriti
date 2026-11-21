"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { EASE_OUT, REVEAL } from "@/components/motion/config";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait once in view — use `n * REVEAL.stagger` to run a set in sequence. */
  delay?: number;
  /** Override how far (px) this block rises. */
  distance?: number;
};

/**
 * Fades its children up into place the first time they scroll into view, and
 * leaves them there. Wrap a whole block (an image, a paragraph, a grid) rather
 * than every small piece inside it.
 *
 * Under `prefers-reduced-motion` the rise and scale are dropped in globals.css
 * and only the fade remains.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  distance = REVEAL.distance,
}: RevealProps) {
  return (
    <motion.div
      data-scroll-motion
      className={className}
      initial={{ opacity: 0, y: distance, scale: REVEAL.scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: REVEAL.margin }}
      transition={{ duration: REVEAL.duration, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
