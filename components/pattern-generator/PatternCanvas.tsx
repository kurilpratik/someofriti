"use client";

import { type Ref, useEffect, useImperativeHandle, useRef } from "react";

import { type FontFamilies, renderPattern, textFont } from "./render";
import type { PatternSettings } from "./settings";

interface PatternCanvasProps {
  settings: PatternSettings;
  paused?: boolean;
  className?: string;
  /** Upper bound for devicePixelRatio; lower values draw fewer pixels. */
  maxDpr?: number;
  ref?: Ref<HTMLCanvasElement | null>;
}

const FALLBACK_FONTS: FontFamilies = {
  ivy: "Georgia, serif",
  degular: "Arial, sans-serif",
};

/** Reads the next/font family names from the CSS variables set on <html>. */
function readFonts(): FontFamilies {
  const css = getComputedStyle(document.documentElement);
  return {
    ivy: css.getPropertyValue("--font-ivy-ora").trim() || FALLBACK_FONTS.ivy,
    degular: css.getPropertyValue("--font-degular").trim() || FALLBACK_FONTS.degular,
  };
}

/**
 * Animated canvas that fills its parent and renders the pattern every frame.
 * Settings can change on every render without restarting the loop, and a
 * speed change keeps the current phase (the clock accumulates speed * dt).
 */
export default function PatternCanvas({
  settings,
  paused = false,
  className,
  maxDpr = 2,
  ref,
}: PatternCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef(settings);
  const pausedRef = useRef(paused);
  const fontsRef = useRef<FontFamilies>(FALLBACK_FONTS);
  // Text waits for its web font, so it never flashes in the fallback face.
  const fontReadyRef = useRef(false);

  useImperativeHandle(ref, () => canvasRef.current as HTMLCanvasElement, []);

  useEffect(() => {
    settingsRef.current = settings;
    pausedRef.current = paused;
  });

  // Canvas text only loads a web font once something asks for it.
  const { font, italic } = settings.text;
  useEffect(() => {
    fontsRef.current = readFonts();
    if (!document.fonts) {
      fontReadyRef.current = true;
      return;
    }
    let live = true;
    document.fonts
      .load(textFont({ ...settingsRef.current.text, font, italic }, 32, fontsRef.current))
      .catch(() => {})
      .finally(() => {
        if (live) fontReadyRef.current = true;
      });
    return () => {
      live = false;
    };
  }, [font, italic]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    let clock = 0;
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const s = settingsRef.current;
      if (!pausedRef.current) clock += dt * s.speed;
      const shown = fontReadyRef.current ? s : { ...s, text: { ...s.text, enabled: false } };
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderPattern(ctx, width, height, clock, shown, fontsRef.current);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [maxDpr]);

  return <canvas ref={canvasRef} className={className ?? "block h-full w-full"} />;
}
