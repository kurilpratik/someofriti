/**
 * One place to tune every scroll effect on the project pages. Change a number
 * here and it changes everywhere the effect is used.
 */

/** easeOutQuart — a quick start that settles slowly (the curve this.design uses). */
export const EASE_OUT = [0.165, 0.84, 0.44, 1] as const;

/** Blocks that fade up into place the first time they scroll into view. */
export const REVEAL = {
  /** Seconds for one block to settle. */
  duration: 1.4,
  /** How far (px) a block rises while it fades in. */
  distance: 120,
  /** Scale a block starts at and grows from (1 = no scaling). */
  scale: 0.94,
  /** Seconds between neighbours when a group reveals in sequence. */
  stagger: 0.18,
  /**
   * Shrinks the viewport's bottom edge, so a block waits until it is a little
   * way on screen before it starts — not the moment its first pixel appears.
   */
  margin: "0px 0px -12% 0px",
} as const;

/**
 * Parallax depths: how far (px) an element drifts either side of its resting
 * place while it crosses the screen. Positive values lag behind the scroll
 * (they read as further away), negative ones run ahead of it (closer). The
 * bigger the gap between neighbours' depths, the more they slide apart.
 */
export const PARALLAX_DEPTH = {
  near: -50,
  mid: 80,
  far: 150,
} as const;

export type ParallaxDepth = keyof typeof PARALLAX_DEPTH;

/** The cover under the sub-hero, as the intro slides up over it. */
export const COVER = {
  /** Share of its own height the cover sinks by the time it has scrolled away. */
  drift: 0.6,
  /** Opacity it fades to over that distance. */
  fadeTo: 0.2,
} as const;
