/*
 * Settings for the generative pattern (see render.ts). The generator tool at
 * /generator edits these, and "Copy settings" puts them on the clipboard as
 * JSON, so a finished look can be pasted into a preset and rendered anywhere
 * with <PatternCanvas settings={...} /> (e.g. in the Preloader).
 */

export type SquarePattern = "stairs" | "ripple" | "plasma" | "cascade" | "flicker";
export type TextFont = "ivy" | "degular";

export interface PatternSettings {
  /** Animation speed multiplier (0 = frozen). */
  speed: number;
  /** Seed for everything random (accent cells, cascade offsets, flicker). */
  seed: number;
  background: string;
  squares: {
    enabled: boolean;
    /** Number of squares across the width. */
    columns: number;
    /** Gap between squares, as a fraction of a cell. */
    gap: number;
    pattern: SquarePattern;
    /** How many waves/bands fit across the frame. */
    frequency: number;
    /** Share of cells that are filled (0-1). */
    density: number;
    /** 0 = squares snap on/off, 1 = squares grow and shrink smoothly. */
    softness: number;
    color: string;
    accent: string;
    /** Share of filled squares drawn in the accent colour (0-1). */
    accentRatio: number;
  };
  dots: {
    enabled: boolean;
    columns: number;
    /** Dot diameter as a fraction of its cell. */
    size: number;
    /** How much the dots breathe (0-1). */
    pulse: number;
    color: string;
  };
  burst: {
    enabled: boolean;
    points: number;
    /** How deep the cuts between points go (0-1). */
    depth: number;
    /** Diameter as a fraction of the shorter side of the frame. */
    size: number;
    /** Turns per second-ish; negative spins the other way. */
    spin: number;
    pulse: number;
    color: string;
  };
  text: {
    enabled: boolean;
    value: string;
    font: TextFont;
    italic: boolean;
    /** Font size as a fraction of the shorter side of the frame. */
    size: number;
    /** How much the letters bob (0-1). */
    wave: number;
    color: string;
  };
}

export interface Palette {
  name: string;
  background: string;
  squares: string;
  accent: string;
  dots: string;
  burst: string;
  text: string;
}

export const PALETTES: Palette[] = [
  {
    name: "Wrapped",
    background: "#4a1d8c",
    squares: "#0d0d0d",
    accent: "#1f5ae7",
    dots: "#a9ad3a",
    burst: "#7a4a22",
    text: "#0d0d0d",
  },
  {
    name: "Brand red",
    background: "#eb2427",
    squares: "#0d0d0d",
    accent: "#f6f1ea",
    dots: "#f6f1ea",
    burst: "#0d0d0d",
    text: "#f6f1ea",
  },
  {
    name: "Midnight",
    background: "#0d0d0d",
    squares: "#1f5ae7",
    accent: "#9b50d4",
    dots: "#a8b0a3",
    burst: "#ff3b2e",
    text: "#f6f1ea",
  },
  {
    name: "Ivory",
    background: "#f6f1ea",
    squares: "#111111",
    accent: "#eb2427",
    dots: "#ff3b2e",
    burst: "#1f5ae7",
    text: "#f6f1ea",
  },
  {
    name: "Orchid",
    background: "#9b50d4",
    squares: "#1c1c1c",
    accent: "#ff4800",
    dots: "#f8dfe1",
    burst: "#ff4800",
    text: "#111111",
  },
  {
    name: "Olive",
    background: "#a8b0a3",
    squares: "#1c1c1c",
    accent: "#eb2427",
    dots: "#f6f1ea",
    burst: "#eb2427",
    text: "#f6f1ea",
  },
];

export function applyPalette(s: PatternSettings, p: Palette): PatternSettings {
  return {
    ...s,
    background: p.background,
    squares: { ...s.squares, color: p.squares, accent: p.accent },
    dots: { ...s.dots, color: p.dots },
    burst: { ...s.burst, color: p.burst },
    text: { ...s.text, color: p.text },
  };
}

export const DEFAULT_SETTINGS: PatternSettings = applyPalette(
  {
    speed: 1,
    seed: 7,
    background: "",
    squares: {
      enabled: true,
      columns: 24,
      gap: 0,
      pattern: "stairs",
      frequency: 2,
      density: 0.42,
      softness: 0,
      color: "",
      accent: "",
      accentRatio: 0,
    },
    dots: { enabled: true, columns: 6, size: 0.5, pulse: 0.35, color: "" },
    burst: {
      enabled: true,
      points: 22,
      depth: 0.18,
      size: 0.62,
      spin: 0.25,
      pulse: 0.06,
      color: "",
    },
    text: {
      enabled: true,
      value: "Hello",
      font: "ivy",
      italic: true,
      size: 0.17,
      wave: 0.5,
      color: "",
    },
  },
  PALETTES[0],
);

export const SQUARE_PATTERNS: { value: SquarePattern; label: string }[] = [
  { value: "stairs", label: "Stairs" },
  { value: "ripple", label: "Ripple" },
  { value: "plasma", label: "Plasma" },
  { value: "cascade", label: "Cascade" },
  { value: "flicker", label: "Flicker" },
];
