"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

import { COVER } from "@/components/motion/config";

type CoverScrollAwayProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * The project cover. Once its top reaches the top of the screen it sinks and
 * dims, so the section after it (the intro) appears to slide up over it.
 *
 * For that overlap to read, the next section must sit above it in the stacking
 * order — `relative z-10` with a solid background, as ProjectIntro and
 * NextProject have.
 */
export default function CoverScrollAway({
  children,
  className,
  style,
}: CoverScrollAwayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${COVER.drift * 100}%`],
  );
  const opacity = useTransform(scrollYProgress, [0, 1], [1, COVER.fadeTo]);

  return (
    <motion.div
      ref={ref}
      data-scroll-motion
      className={className}
      style={{ ...style, y, opacity }}
    >
      {children}
    </motion.div>
  );
}
