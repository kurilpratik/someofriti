"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { PARALLAX_DEPTH, type ParallaxDepth } from "@/components/motion/config";

type ParallaxProps = {
  children: ReactNode;
  /**
   * A preset from `PARALLAX_DEPTH` or a number of px. Give neighbouring images
   * different depths and they slide past each other as the page scrolls.
   */
  depth?: ParallaxDepth | number;
  /** Layout classes for the wrapper — it takes the child's place in the layout. */
  className?: string;
};

/**
 * Drifts its children a little slower (or faster) than the page while they
 * cross the screen, so layered images separate into depth. Only the wrapper
 * moves; nothing is clipped or rescaled, so shadows and overlaps stay intact.
 *
 * Disabled under `prefers-reduced-motion` in globals.css.
 */
export default function Parallax({
  children,
  depth = "mid",
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const range = typeof depth === "number" ? depth : PARALLAX_DEPTH[depth];

  // 0 as the element's top meets the bottom of the screen, 1 as its bottom
  // leaves the top — so it rests at its true position mid-screen.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <motion.div
      ref={ref}
      data-scroll-motion
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}
