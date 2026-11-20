"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

/*
 * Custom cursor that appears over any image or video: the native cursor is
 * hidden and a shape that cycles 8-point star -> 4-point star -> circle while
 * spinning follows the pointer.
 *
 * Opt an element in with data-cursor="media" (e.g. a canvas or a styled div),
 * or opt it out with data-cursor="none".
 */

const COLOR = "#ff4800";
const SIZE = 64; // px (includes goo padding)
const CYCLE_MS = 450;
const PAD = 15; // viewBox padding so the goo blur is not clipped
const MEDIA_SELECTOR = "img, video, picture, svg image, [data-cursor='media']";

/** Builds star polygon points in a 100x100 viewBox. */
function starPoints(tips: number, inner: number, twist = 0): string {
  const pts: string[] = [];
  for (let i = 0; i < tips * 2; i++) {
    const r = i % 2 === 0 ? 50 : inner;
    const a = (Math.PI * i) / tips - Math.PI / 2 + (i % 2 ? twist : 0);
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

const SHAPES = [
  <polygon key="star8" points={starPoints(8, 21)} />,
  <polygon key="star4" points={starPoints(4, 6.5, 0.08)} />,
  <circle key="circle" cx="50" cy="50" r="40" />,
];

/** True when the point is over media that hasn't opted out. */
function isOverMedia(target: Element | null, x: number, y: number): boolean {
  if (!target) return false;
  if (target.closest("[data-cursor='none']")) return false;
  if (target.closest(MEDIA_SELECTOR)) return true;
  // Media often sits beneath overlays (gradients, captions, link wrappers),
  // so also check the whole stack under the pointer.
  return document
    .elementsFromPoint(x, y)
    .some((el) => el.matches(MEDIA_SELECTOR) && !el.closest("[data-cursor='none']"));
}

export default function MediaCursor() {
  const reduceMotion = useReducedMotion();
  const gooId = `goo-${useId().replace(/:/g, "")}`;
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [shape, setShape] = useState(0);
  const pointer = useRef({ x: 0, y: 0, target: null as Element | null });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.4 });

  // Only on devices with a precise, hovering pointer (not touch).
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;

    const check = () => {
      frame = 0;
      const { x: px, y: py, target } = pointer.current;
      setActive(isOverMedia(target, px, py));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pointer.current = { x: e.clientX, y: e.clientY, target: e.target as Element };
      x.set(e.clientX);
      y.set(e.clientY);
      schedule();
    };
    // Content can scroll under a still pointer.
    const onScroll = () => {
      const { x: px, y: py } = pointer.current;
      pointer.current.target = document.elementFromPoint(px, py);
      schedule();
    };
    const onLeave = () => setActive(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  // Hide the native cursor while ours is showing.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("media-cursor-active", enabled && active);
    return () => root.classList.remove("media-cursor-active");
  }, [enabled, active]);

  // Cycle through the shapes while visible.
  useEffect(() => {
    if (!active || reduceMotion) return;
    const id = window.setInterval(
      () => setShape((s) => (s + 1) % SHAPES.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [active, reduceMotion]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{
        x: springX,
        y: springY,
        width: SIZE,
        height: SIZE,
        marginLeft: -SIZE / 2,
        marginTop: -SIZE / 2,
      }}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            className="h-full w-full"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 90 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
          >
            <motion.svg
              viewBox={`${-PAD} ${-PAD} ${100 + PAD * 2} ${100 + PAD * 2}`}
              className="h-full w-full overflow-visible"
              fill={COLOR}
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
            >
              <defs>
                {/*
                 * Goo: blur the shapes together, then sharpen the alpha so
                 * overlapping blobs fuse. The crisp source is merged back on
                 * top so the thin star tips survive.
                 */}
                <filter id={gooId} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9"
                    result="goo"
                  />
                  <feMerge>
                    <feMergeNode in="goo" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g filter={`url(#${gooId})`}>
                {SHAPES.map((node, i) => (
                  <motion.g
                    key={i}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    initial={false}
                    // No opacity fade: the outgoing shape shrinks into the
                    // incoming one so the goo filter fuses them mid-swap.
                    animate={
                      i === shape
                        ? { scale: 1, rotate: 0 }
                        : { scale: 0, rotate: -60 }
                    }
                    transition={{
                      scale: { type: "spring", stiffness: 220, damping: 17 },
                      rotate: { type: "spring", stiffness: 180, damping: 20 },
                    }}
                  >
                    {node}
                  </motion.g>
                ))}
              </g>
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
