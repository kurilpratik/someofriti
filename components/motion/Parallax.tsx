"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import {
  PARALLAX_DEPTH,
  PARALLAX_DEPTH_MOBILE,
  PARALLAX_DESKTOP_QUERY,
  type ParallaxDepth,
} from "@/components/motion/config";

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

/** Px numbers shrink on mobile by the same ratio as the `far` preset. */
const MOBILE_RATIO = PARALLAX_DEPTH_MOBILE.far / PARALLAX_DEPTH.far;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(PARALLAX_DESKTOP_QUERY);
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

/**
 * Drifts its children a little slower (or faster) than the page while they
 * cross the screen, so layered images separate into depth. Only the wrapper
 * moves; nothing is clipped or rescaled, so shadows and overlaps stay intact.
 *
 * Below the `lg` breakpoint the drift shrinks to `PARALLAX_DEPTH_MOBILE`, so
 * stacked images stay clear of each other. Disabled under
 * `prefers-reduced-motion` in globals.css.
 */
export default function Parallax({
  children,
  depth = "mid",
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const range =
    typeof depth === "number"
      ? isDesktop
        ? depth
        : depth * MOBILE_RATIO
      : (isDesktop ? PARALLAX_DEPTH : PARALLAX_DEPTH_MOBILE)[depth];

  // Kept as a motion value so a breakpoint change re-drives the transform.
  const rangeValue = useMotionValue(range);
  useEffect(() => rangeValue.set(range), [range, rangeValue]);

  // 0 as the element's top meets the bottom of the screen, 1 as its bottom
  // leaves the top — so it rests at its true position mid-screen.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    [scrollYProgress, rangeValue],
    ([progress, r]: number[]) => (progress * 2 - 1) * r,
  );

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
