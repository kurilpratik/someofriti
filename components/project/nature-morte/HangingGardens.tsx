"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { REVEAL } from "@/components/motion/config";
import Reveal from "@/components/motion/Reveal";

const BASE = "/images/projects/nature";

/**
 * The identity studies, in the order the mockup lays them out: three across the
 * top row, then one more on the left of the second row beside the story film.
 */
const TILES = [
  {
    src: `${BASE}/Asset 17@4x.webp`,
    alt: "Hanging Gardens poster — serif wordmark over an intersecting-arc construction",
  },
  {
    src: `${BASE}/Asset 19@4x.webp`,
    alt: "Hanging Gardens poster in a sans wordmark, printed on a woven paper stock",
  },
  {
    src: `${BASE}/Asset 20@4x.webp`,
    alt: "Hanging Gardens lockup split across a grid, with a woven mesh motif",
  },
  {
    src: `${BASE}/Asset 18@4x.webp`,
    alt: "Hanging Gardens poster — serif wordmark over a single circular form",
  },
] as const;

/** Copy that sits beside the film. The second half is hidden behind "know more". */
const LEAD =
  "For Hanging Gardens, the identity evolved through layered forms and shifting compositions, inspired by textile structures and organic growth patterns. The visual language was designed to ";
const REST =
  "to feel in motion — adapting across formats while retaining a clear, recognisable core. The process explored balance between structure and fluidity, allowing the exhibition identity to grow organically from concept to final execution.";

/**
 * Same hand-drawn mark the hero links use — a loose ellipse with a tail under
 * it — kept at the hero's 240×76 viewBox so it scales without distorting, and
 * only drawn on hover or keyboard focus.
 */
function HandDrawnRing() {
  return (
    <svg
      viewBox="0 0 240 76"
      aria-hidden="true"
      className="text-brand-red pointer-events-none absolute inset-0 size-full overflow-visible opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <ellipse cx="110" cy="38" rx="101" ry="31" />
      <path d="M53 66c24 3 54 6 93 8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Nature Morte — Hanging Gardens. A white break in the black page: a grid of
 * identity studies, the story film standing portrait in the second row, and the
 * note on how the identity was built sitting to its right.
 */
export default function HangingGardens() {
  const [open, setOpen] = useState(false);
  const copyId = useId();

  return (
    <section className="bg-brand-white text-black">
      <div className="page-container py-24 sm:py-36 lg:py-42">
        <h2 className="sr-only">Hanging Gardens — identity studies</h2>

        <div className="mx-auto grid grid-cols-1 items-start gap-x-10 gap-y-18 sm:grid-cols-2 lg:w-[82%] lg:grid-cols-3 lg:gap-x-12 lg:gap-y-21">
          {/* Each row reveals left to right. */}
          {TILES.slice(0, 3).map((tile, index) => (
            <Reveal key={tile.src} delay={index * REVEAL.stagger}>
              <Tile {...tile} />
            </Reveal>
          ))}

          <Reveal>
            <Tile {...TILES[3]} />
          </Reveal>

          {/* The story film, portrait, in place of the mockup's olive block. */}
          <Reveal delay={REVEAL.stagger}>
            <div className="relative aspect-[9/16] w-full overflow-hidden bg-black">
              <video
                src={`${BASE}/hanging garden story.mp4`}
                aria-label="Hanging Gardens story film — the identity in motion"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          </Reveal>

          <div className="text-[0.95rem] leading-[1.55] font-light tracking-[0.01em] text-pretty sm:text-[1rem] lg:text-[1.05rem]">
            <p id={copyId}>
              {LEAD}
              {open ? REST : <span className="sr-only">…</span>}
            </p>

            {!open && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={false}
                aria-controls={copyId}
                className="group relative mt-3 inline-flex cursor-pointer items-center justify-center px-7 py-3"
              >
                <HandDrawnRing />
                <span className="font-ivy-ora relative text-[0.95em] font-light italic">
                  know more
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Tile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-square w-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}
