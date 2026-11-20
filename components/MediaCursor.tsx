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
 * Custom cursor for images and videos: a shape that gooily cycles blade
 * (4-point star) -> icon (8-point star) -> circle while spinning. It shows:
 *  - mouse/pen: while hovering media (the native cursor is hidden),
 *  - touch: while a finger is pressed on media, lingering briefly after,
 *  - keyboard: centred on a :focus-visible element that is or wraps media.
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

// Cycle order: icon-blade -> icon -> icon-circle (public/images/logo).
const SHAPES = [
  <polygon key="blade" points={starPoints(4, 6.5, 0.08)} />,
  <polygon key="icon" points={starPoints(8, 21)} />,
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

type Mode = "pointer" | "touch" | "focus" | null;

/** True when a focused element is, or wraps, media that hasn't opted out. */
function hasMedia(el: Element): boolean {
  if (el.closest("[data-cursor='none']")) return false;
  return el.matches(MEDIA_SELECTOR) || !!el.querySelector(MEDIA_SELECTOR);
}

// How long the cursor lingers after a finger lifts, so the tap reads.
const TOUCH_LINGER_MS = 450;

export default function MediaCursor() {
  const reduceMotion = useReducedMotion();
  const gooId = `goo-${useId().replace(/:/g, "")}`;
  const [mode, setModeState] = useState<Mode>(null);
  const active = mode !== null;
  const [shape, setShape] = useState(0);
  const modeRef = useRef<Mode>(null);
  const pointer = useRef({ x: 0, y: 0, target: null as Element | null });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 900, damping: 50, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 900, damping: 50, mass: 0.4 });

  useEffect(() => {
    let frame = 0;
    let lingerTimer = 0;
    let focused: Element | null = null;

    const setMode = (next: Mode) => {
      modeRef.current = next;
      setModeState(next);
    };
    // Glide when already showing; jump when appearing somewhere new.
    const moveTo = (px: number, py: number, instant: boolean) => {
      x.set(px);
      y.set(py);
      if (instant) {
        springX.jump(px);
        springY.jump(py);
      }
    };
    const centreOn = (el: Element, instant: boolean) => {
      const r = el.getBoundingClientRect();
      moveTo(r.left + r.width / 2, r.top + r.height / 2, instant);
    };

    // Mouse / pen hover: re-test what's under the pointer once per frame.
    const check = () => {
      frame = 0;
      const { x: px, y: py, target } = pointer.current;
      if (isOverMedia(target, px, py)) setMode("pointer");
      else if (modeRef.current !== "touch") setMode(null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        // Follow the finger while it's pressed on media.
        if (modeRef.current === "touch") moveTo(e.clientX, e.clientY, false);
        return;
      }
      const wasHidden = modeRef.current === null;
      pointer.current = { x: e.clientX, y: e.clientY, target: e.target as Element };
      moveTo(e.clientX, e.clientY, wasHidden);
      schedule();
    };

    // Touch: show while a finger is pressed on media (:active equivalent).
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      const target = e.target as Element;
      if (!isOverMedia(target, e.clientX, e.clientY)) return;
      window.clearTimeout(lingerTimer);
      moveTo(e.clientX, e.clientY, modeRef.current !== "touch");
      setMode("touch");
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType !== "touch" || modeRef.current !== "touch") return;
      window.clearTimeout(lingerTimer);
      lingerTimer = window.setTimeout(() => {
        if (modeRef.current === "touch") setMode(null);
      }, TOUCH_LINGER_MS);
    };

    // Keyboard: show centred on a :focus-visible element that is/wraps media.
    const onFocusIn = (e: FocusEvent) => {
      const el = e.target as Element;
      if (el instanceof Element && el.matches(":focus-visible") && hasMedia(el)) {
        focused = el;
        centreOn(el, modeRef.current !== "focus");
        setMode("focus");
      }
    };
    const onFocusOut = () => {
      focused = null;
      if (modeRef.current === "focus") setMode(null);
    };

    // Content can scroll under a still pointer or a focused element.
    const onScroll = () => {
      if (modeRef.current === "focus" && focused) {
        centreOn(focused, true);
        return;
      }
      if (modeRef.current === "touch") return;
      const { x: px, y: py } = pointer.current;
      pointer.current.target = document.elementFromPoint(px, py);
      schedule();
    };
    const onLeave = () => {
      if (modeRef.current === "pointer") setMode(null);
    };

    const root = document.documentElement;
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.clearTimeout(lingerTimer);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y, springX, springY]);

  // Hide the native cursor only while the mouse is driving ours.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("media-cursor-active", mode === "pointer");
    return () => root.classList.remove("media-cursor-active");
  }, [mode]);

  // Cycle through the shapes while visible.
  useEffect(() => {
    if (!active || reduceMotion) return;
    const id = window.setInterval(
      () => setShape((s) => (s + 1) % SHAPES.length),
      CYCLE_MS,
    );
    return () => window.clearInterval(id);
  }, [active, reduceMotion]);

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
