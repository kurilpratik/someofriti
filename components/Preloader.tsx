"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import PatternCanvas from "@/components/pattern-generator/PatternCanvas";
import { PRELOADER_SETTINGS } from "@/components/pattern-generator/settings";

const VISIBLE_MS = 2600;
const EXIT_MS = 1000;

/*
 * Intro screen: the generative pattern from /generator, drawn live on a
 * canvas. That's lighter than a video or GIF (no file to download), stays
 * sharp at every screen size, and stops drawing once the screen has slid away.
 */
export default function Preloader() {
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const hide = window.setTimeout(() => setIsVisible(false), VISIBLE_MS);
    const unmount = window.setTimeout(() => setIsMounted(false), VISIBLE_MS + EXIT_MS);
    return () => {
      window.clearTimeout(hide);
      window.clearTimeout(unmount);
    };
  }, []);

  if (!isMounted) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-9999 overflow-hidden transition-transform duration-1000 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ background: PRELOADER_SETTINGS.background }}
    >
      <PatternCanvas settings={PRELOADER_SETTINGS} paused={!!reduceMotion} maxDpr={1.5} />
    </div>
  );
}
