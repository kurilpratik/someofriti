import type { PatternSettings } from "./settings";

/*
 * Draws one frame of the pattern. Pure: everything comes from the arguments,
 * so the same settings and time always give the same picture. Layers, back
 * to front: background, square grid, dot grid, starburst, text.
 */

export interface FontFamilies {
  ivy: string;
  degular: string;
}

const TAU = Math.PI * 2;

/** Deterministic 0-1 hash of integer coordinates. */
function hash(a: number, b: number, c: number, seed: number): number {
  let h = Math.imul(a | 0, 374761393) ^ Math.imul(b | 0, 668265263);
  h ^= Math.imul(c | 0, 2147483647) ^ Math.imul(seed | 0, 1274126177);
  h = Math.imul(h ^ (h >>> 13), 1103515245);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function smoothstep(e0: number, e1: number, x: number): number {
  if (e1 <= e0) return x >= e1 ? 1 : 0;
  const k = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return k * k * (3 - 2 * k);
}

const wave = (x: number) => 0.5 + 0.5 * Math.sin(TAU * x);

/**
 * Value (0-1) of the square field at a cell. u/v are in "width units"
 * (0-1 across the frame width, v grows the same amount per pixel), so
 * shapes don't stretch with the aspect ratio.
 */
function fieldValue(
  s: PatternSettings["squares"],
  seed: number,
  i: number,
  j: number,
  u: number,
  v: number,
  cy: number,
  t: number,
): number {
  const f = s.frequency;
  switch (s.pattern) {
    case "stairs":
      return wave((u + v) * f * 0.5 - t * 0.35);
    case "ripple":
      return wave(Math.hypot(u - 0.5, v - cy) * f - t * 0.35);
    case "plasma": {
      let sum = 0;
      for (let k = 0; k < 3; k++) {
        const a = hash(k, 1, 0, seed) * TAU;
        const ph = hash(k, 2, 0, seed);
        const sp = 0.15 + hash(k, 3, 0, seed) * 0.3;
        sum += Math.sin(TAU * ((Math.cos(a) * u + Math.sin(a) * v) * f * 0.6 + t * sp + ph));
      }
      return 0.5 + sum / 6;
    }
    case "cascade": {
      // Each column has its own falling bars, offset by a random phase.
      const off = hash(i, 0, 7, seed);
      const x = v * f * 0.5 - t * (0.25 + off * 0.2) + off;
      return x - Math.floor(x);
    }
    case "flicker": {
      const x = t * 2.5 + hash(i, j, 3, seed);
      const step = Math.floor(x);
      const a = hash(i, j, step, seed);
      const b = hash(i, j, step + 1, seed);
      return a + (b - a) * smoothstep(0, 1, x - step);
    }
  }
}

function drawSquares(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, st: PatternSettings) {
  const s = st.squares;
  const cols = Math.max(1, Math.round(s.columns));
  const cell = w / cols;
  const rows = Math.ceil(h / cell);
  const top = (h - rows * cell) / 2;
  const cy = h / 2 / w;
  const threshold = 1 - s.density;
  const soft = s.softness * 0.5;
  const fill = cell * (1 - s.gap);

  const main = new Path2D();
  const accent = new Path2D();

  for (let j = 0; j < rows; j++) {
    const yc = top + (j + 0.5) * cell;
    const v = yc / w;
    for (let i = 0; i < cols; i++) {
      const xc = (i + 0.5) * cell;
      const val = fieldValue(s, st.seed, i, j, xc / w, v, cy, t);
      const amount = soft > 0 ? smoothstep(threshold - soft, threshold + soft, val) : val > threshold ? 1 : 0;
      if (amount <= 0.01) continue;
      const size = fill * amount;
      // Rounded edges keep a gap-free grid seamless.
      const x0 = Math.round(xc - size / 2);
      const x1 = Math.round(xc + size / 2);
      const y0 = Math.round(yc - size / 2);
      const y1 = Math.round(yc + size / 2);
      const path = s.accentRatio > 0 && hash(i, j, 11, st.seed) < s.accentRatio ? accent : main;
      path.rect(x0, y0, x1 - x0, y1 - y0);
    }
  }

  ctx.fillStyle = s.color;
  ctx.fill(main);
  ctx.fillStyle = s.accent;
  ctx.fill(accent);
}

function drawDots(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, st: PatternSettings) {
  const d = st.dots;
  const cols = Math.max(1, Math.round(d.columns));
  const cell = w / cols;
  const rows = Math.ceil(h / cell);
  const top = (h - rows * cell) / 2;
  const path = new Path2D();

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const breathe = wave(t * 0.4 - (i + j) * 0.12);
      const r = (cell * d.size * (1 - d.pulse + d.pulse * breathe)) / 2;
      if (r < 0.5) continue;
      const x = (i + 0.5) * cell;
      const y = top + (j + 0.5) * cell;
      path.moveTo(x + r, y);
      path.arc(x, y, r, 0, TAU);
    }
  }

  ctx.fillStyle = d.color;
  ctx.fill(path);
}

function drawBurst(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, st: PatternSettings) {
  const b = st.burst;
  const n = Math.max(3, Math.round(b.points));
  const outer = ((Math.min(w, h) * b.size) / 2) * (1 + b.pulse * Math.sin(TAU * t * 0.3));
  const inner = outer * (1 - b.depth);
  const rot = t * b.spin * 0.5;

  ctx.beginPath();
  for (let k = 0; k < n * 2; k++) {
    const r = k % 2 === 0 ? outer : inner;
    const a = rot + (Math.PI * k) / n - Math.PI / 2;
    const x = w / 2 + r * Math.cos(a);
    const y = h / 2 + r * Math.sin(a);
    if (k === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = b.color;
  ctx.fill();
}

function drawText(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  st: PatternSettings,
  fonts: FontFamilies,
) {
  const tx = st.text;
  if (!tx.value) return;
  const px = Math.min(w, h) * tx.size;
  ctx.font = textFont(tx, px, fonts);
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillStyle = tx.color;

  const chars = Array.from(tx.value);
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total = widths.reduce((a, b) => a + b, 0);
  let x = (w - total) / 2;

  chars.forEach((c, k) => {
    const y = h / 2 - tx.wave * px * 0.12 * Math.sin(TAU * (t * 0.6 - k * 0.1));
    ctx.fillText(c, x, y);
    x += widths[k];
  });
}

/** Canvas font shorthand for the text layer. */
export function textFont(tx: PatternSettings["text"], px: number, fonts: FontFamilies): string {
  const family = tx.font === "ivy" ? fonts.ivy : fonts.degular;
  const weight = tx.font === "ivy" ? 300 : 500;
  return `${tx.italic ? "italic " : ""}${weight} ${px}px ${family}`;
}

/**
 * Renders a frame into a canvas of size w x h (CSS pixels; scale the
 * context for devicePixelRatio before calling). `t` is the animation clock
 * in seconds, already multiplied by the speed setting.
 */
export function renderPattern(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  s: PatternSettings,
  fonts: FontFamilies,
) {
  ctx.fillStyle = s.background;
  ctx.fillRect(0, 0, w, h);
  if (s.squares.enabled) drawSquares(ctx, w, h, t, s);
  if (s.dots.enabled) drawDots(ctx, w, h, t, s);
  if (s.burst.enabled) drawBurst(ctx, w, h, t, s);
  if (s.text.enabled) drawText(ctx, w, h, t, s, fonts);
}
