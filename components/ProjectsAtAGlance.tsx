"use client";

import Image from "next/image";
import Link from "next/link";
import { useAnimationFrame, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { RangeSlider } from "@/components/ui/be-ui-range-slider";
import { PROJECTS as PROJECT_LIST, type ProjectSummary } from "@/lib/projects";

type GridSpan = {
  col: number;
  row: number;
  colSpan: number;
  rowSpan: number;
};

type Project = ProjectSummary & {
  /** intrinsic width / height — keeps orbiting cards on their true proportions */
  aspect: number;
  grid: GridSpan;
  /** 0 = outer loop, 1 = inner loop */
  ring: 0 | 1;
  /** starting position on its loop, 0–1 */
  phase: number;
  /** card height while orbiting, as a fraction of the stage */
  size: number;
};

type Rect = { x: number; y: number; w: number; h: number };

type Layout = Pick<Project, "aspect" | "grid" | "ring" | "phase" | "size">;

/** How each project sits in the grid and on the orbit, keyed by slug. */
const LAYOUT: Record<string, Layout> = {
  "nature-morte": {
    aspect: 524 / 734,
    grid: { col: 0, row: 0, colSpan: 1, rowSpan: 1 },
    ring: 0,
    phase: 0.25,
    size: 0.3,
  },
  "bira-netflix": {
    aspect: 509 / 509,
    grid: { col: 1, row: 0, colSpan: 1, rowSpan: 1 },
    ring: 1,
    phase: 0.12,
    size: 0.21,
  },
  regalium: {
    aspect: 2048 / 1536,
    grid: { col: 2, row: 0, colSpan: 2, rowSpan: 2 },
    ring: 1,
    phase: 0.88,
    size: 0.3,
  },
  "sbac-law": {
    aspect: 507 / 555,
    grid: { col: 0, row: 1, colSpan: 1, rowSpan: 1 },
    ring: 1,
    phase: 0.38,
    size: 0.23,
  },
  "bangalore-art-weekend": {
    aspect: 504 / 552,
    grid: { col: 1, row: 1, colSpan: 1, rowSpan: 1 },
    ring: 0,
    phase: 0.5,
    size: 0.22,
  },
  xarpie: {
    aspect: 1069 / 553,
    grid: { col: 0, row: 2, colSpan: 2, rowSpan: 1 },
    ring: 1,
    phase: 0.63,
    size: 0.18,
  },
  tanabana: {
    aspect: 489 / 733,
    grid: { col: 2, row: 2, colSpan: 1, rowSpan: 1 },
    ring: 0,
    phase: 0.75,
    size: 0.27,
  },
  wallis: {
    aspect: 503 / 550,
    grid: { col: 3, row: 2, colSpan: 1, rowSpan: 1 },
    ring: 0,
    phase: 0,
    size: 0.24,
  },
};

// Only projects with an entry in LAYOUT get a tile, so a project can have a page
// without being in the grid.
const PROJECTS: Project[] = PROJECT_LIST.filter(
  (project) => project.slug in LAYOUT,
).map((project) => ({
  ...project,
  ...LAYOUT[project.slug],
}));

/** Two columns, stacked pairs — used below the `sm` breakpoint. */
const COMPACT_GRID: GridSpan[] = PROJECTS.map((_, index) => ({
  col: index % 2,
  row: Math.floor(index / 2),
  colSpan: 1,
  rowSpan: 1,
}));

const COMPACT_BREAKPOINT = 640;
const COLS = 4;
const COMPACT_COLS = 2;

/** Relative row heights. The bottom row holds the tall posters, so it gets more. */
const ROW_WEIGHTS = [1, 1, 1.3];
const COMPACT_ROW_WEIGHTS = [1, 1, 1, 1];

/**
 * The orbit is sized as if the stage had this width / height ratio, and sits at
 * the bottom of it. That keeps the loops the same size and close to the slider
 * however tall the grid is made.
 */
const ORBIT_ASPECT = 1.6;
const COMPACT_ORBIT_ASPECT = 0.62;

/**
 * Vertical centre of the orbit as a fraction of that orbit area. Sitting below
 * the middle keeps the loops close to the slider so both fit on screen.
 */
const ORBIT_CENTER_Y = 0.6;

/** Seconds for one full trip around a loop. */
const ORBIT_PERIOD = 26;

/** The two loops the cards travel on — radii are fractions of the stage. */
const RINGS = [
  { rx: 0.4, ry: 0.17, tilt: -10, direction: 1 },
  { rx: 0.31, ry: 0.13, tilt: 7, direction: 1 },
] as const;

const TAU = Math.PI * 2;
const DEG = Math.PI / 180;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function smoothstep(t: number) {
  const x = Math.min(1, Math.max(0, t));

  return x * x * (3 - 2 * x);
}

function gridRect(
  span: GridSpan,
  width: number,
  height: number,
  cols: number,
  rowWeights: number[],
  gap: number,
): Rect {
  const cellW = (width - gap * (cols - 1)) / cols;
  const unitH =
    (height - gap * (rowWeights.length - 1)) /
    rowWeights.reduce((sum, weight) => sum + weight, 0);
  const rowsHeight = (from: number, count: number) =>
    rowWeights.slice(from, from + count).reduce((sum, w) => sum + w, 0) * unitH;

  return {
    x: span.col * (cellW + gap),
    y: rowsHeight(0, span.row) + span.row * gap,
    w: span.colSpan * cellW + (span.colSpan - 1) * gap,
    h: rowsHeight(span.row, span.rowSpan) + (span.rowSpan - 1) * gap,
  };
}

function orbitState(
  project: Project,
  elapsed: number,
  width: number,
  height: number,
  offsetY: number,
) {
  const ring = RINGS[project.ring];
  const angle =
    project.phase * TAU + elapsed * (TAU / ORBIT_PERIOD) * ring.direction;

  // A point on the upright ellipse, then rotated so the whole loop is tilted.
  const ex = width * ring.rx * Math.cos(angle);
  const ey = height * ring.ry * Math.sin(angle);
  const t = ring.tilt * DEG;
  const cx = width / 2 + ex * Math.cos(t) - ey * Math.sin(t);
  const cy =
    offsetY + height * ORBIT_CENTER_Y + ex * Math.sin(t) + ey * Math.cos(t);

  // The front of the loop (sin > 0) reads as nearest the viewer.
  const depth = (Math.sin(angle) + 1) / 2;
  const h = Math.min(width, height) * project.size;
  const w = h * project.aspect;

  return {
    rect: { x: cx - w / 2, y: cy - h / 2, w, h } satisfies Rect,
    depth,
  };
}

function layoutCards(
  mix: number,
  elapsed: number,
  width: number,
  height: number,
  cards: Array<HTMLElement | null>,
) {
  if (width === 0 || height === 0) return;

  const amount = smoothstep(mix);
  const compact = width < COMPACT_BREAKPOINT;
  const cols = compact ? COMPACT_COLS : COLS;
  const rowWeights = compact ? COMPACT_ROW_WEIGHTS : ROW_WEIGHTS;
  const gap = compact ? 10 : 16;

  // Orbit area: a fixed-ratio band at the bottom of the (taller) stage.
  const orbitHeight = Math.min(
    height,
    width / (compact ? COMPACT_ORBIT_ASPECT : ORBIT_ASPECT),
  );
  const orbitOffsetY = height - orbitHeight;

  for (let i = 0; i < PROJECTS.length; i += 1) {
    const el = cards[i];

    if (!el) continue;

    const project = PROJECTS[i];
    const span = compact ? COMPACT_GRID[i] : project.grid;
    const grid = gridRect(span, width, height, cols, rowWeights, gap);
    const { rect: orbit, depth } = orbitState(
      project,
      elapsed,
      width,
      orbitHeight,
      orbitOffsetY,
    );

    const x = lerp(grid.x, orbit.x, amount);
    const y = lerp(grid.y, orbit.y, amount);
    const scale = lerp(1, 0.78 + depth * 0.34, amount);

    // Cards on the front half of the loop stay fully clear; the further a card
    // travels round the back, the more it fades and greys out.
    const back = Math.min(1, Math.max(0, (0.55 - depth) / 0.55)) * amount;

    el.style.width = `${lerp(grid.w, orbit.w, amount)}px`;
    el.style.height = `${lerp(grid.h, orbit.h, amount)}px`;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    el.style.zIndex = String(Math.round(lerp(10, 1 + depth * 40, amount)));
    el.style.opacity = String(1 - back * 0.35);
    el.style.filter =
      back > 0.001
        ? `grayscale(${back * 0.85}) brightness(${1 - back * 0.3})`
        : "none";
  }
}

export default function ProjectsAtAGlance() {
  const reduceMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const sizeRef = useRef({ width: 0, height: 0 });
  const elapsedRef = useRef(0);
  const targetRef = useRef(0);
  const mixRef = useRef(0);
  const [value, setValue] = useState(0);

  const paint = useCallback(() => {
    layoutCards(
      mixRef.current,
      elapsedRef.current,
      sizeRef.current.width,
      sizeRef.current.height,
      cardRefs.current,
    );
  }, []);

  const handleChange = useCallback((next: number) => {
    targetRef.current = next / 100;
    setValue(next);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    const measure = () => {
      sizeRef.current = {
        width: stage.clientWidth,
        height: stage.clientHeight,
      };
      paint();
    };

    measure();

    const observer = new ResizeObserver(measure);

    observer.observe(stage);

    return () => observer.disconnect();
  }, [paint]);

  useAnimationFrame((_, delta) => {
    // Frame-rate independent easing towards the slider position, so the morph
    // glides the same way the slider thumb does.
    const step = Math.min(delta, 64);

    mixRef.current +=
      (targetRef.current - mixRef.current) * (1 - Math.exp(-step / 110));

    if (!reduceMotion) {
      // The loop spins up as the slider travels towards "Creative".
      elapsedRef.current += (step / 1000) * smoothstep(mixRef.current);
    }

    paint();
  });

  return (
    <section id="projects" className="text-brand-ivory bg-black py-20 sm:py-28">
      {/* Same container as the navbar so both line up edge to edge. */}
      <div className="page-container">
        <header className="flex w-full flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] font-light tracking-tight">
            Projects at a glance
          </h2>
        </header>

        <div
          ref={stageRef}
          className="relative isolate mt-10 aspect-[0.5] w-full overflow-hidden sm:mt-14 sm:aspect-[1.3]"
        >
          {PROJECTS.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              aria-label={`${project.title} — ${project.alt}`}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              className="focus-visible:outline-brand-primary absolute top-0 left-0 block overflow-hidden bg-black will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                transformOrigin: "center center",
                width: "25%",
                height: "33%",
              }}
            >
              {project.srcType === "video" ? (
                <video
                  src={project.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-hidden="true"
                  className="absolute inset-0 size-full object-cover"
                />
              ) : (
                <Image
                  src={project.src}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-146 flex-col gap-4 sm:mt-16">
          <div className="flex items-center justify-between text-[0.72rem] font-medium tracking-[0.22em] uppercase">
            <span
              className={
                value > 50
                  ? "text-muted-foreground transition-colors duration-300"
                  : "text-brand-ivory transition-colors duration-300"
              }
            >
              Structure
            </span>
            <span
              className={
                value > 50
                  ? "text-brand-ivory transition-colors duration-300"
                  : "text-muted-foreground transition-colors duration-300"
              }
            >
              Fluid
            </span>
          </div>

          <RangeSlider
            value={value}
            onValueChange={handleChange}
            step={5}
            aria-label="Shift the projects from structure to creative"
            className="**:[[role=slider]]:bg-brand-primary **:[[role=slider]]:ring-brand-primary/30 [&>div:first-of-type]:bg-brand-primary/45 h-9 **:[[role=slider]]:h-4.5"
          />

          <p className="text-muted-foreground text-center text-[0.85rem] leading-relaxed">
            Control the slider to go from structure to creative!
          </p>
        </div>
      </div>
    </section>
  );
}
