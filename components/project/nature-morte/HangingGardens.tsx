import Image from "next/image";

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

/** Copy that sits beside the film. */
const COPY =
  "For Hanging Gardens, the identity evolved through layered forms and shifting compositions, inspired by textile structures and organic growth patterns. The visual language was designed to feel in motion — adapting across formats while retaining a clear, recognisable core. The process explored balance between structure and fluidity, allowing the exhibition identity to grow organically from concept to final execution.";

/**
 * Nature Morte — Hanging Gardens. A white break in the black page: a grid of
 * identity studies, the story film standing portrait in the second row, and the
 * note on how the identity was built sitting to its right.
 */
export default function HangingGardens() {
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

          <p className="body-copy text-[0.95rem] font-light text-pretty sm:text-[1rem] lg:text-[1.05rem]">
            {COPY}
          </p>
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
