import Image from "next/image";

const BASE = "/images/projects/nature";

/**
 * The mosaic, placed explicitly rather than left to auto-flow, so the third
 * column stays empty on the first and last rows the way the layout wants.
 * Asset 7 is already a two-panel composite, so it spans those two columns.
 */
const SHOTS = [
  {
    src: `${BASE}/Asset 9@4x.webp`,
    width: 715,
    height: 477,
    alt: "Gallery corner — the Manicured Techniques wall graphic on the left, four columns of stacked wooden blocks mounted on the right wall",
    cell: "lg:col-start-1 lg:row-start-1",
    sizes: "(max-width: 1024px) 100vw, 31vw",
  },
  {
    src: `${BASE}/Asset 10@4x.webp`,
    width: 715,
    height: 477,
    alt: "Wide view of the gallery under track lighting, plinths carrying black outline sculptures and a large wooden cluster on the far wall",
    cell: "lg:col-start-2 lg:row-start-1",
    sizes: "(max-width: 1024px) 100vw, 31vw",
  },
  {
    src: `${BASE}/Asset 8@4x.webp`,
    width: 715,
    height: 488,
    alt: "A black outline sculpture of a building on its plinth, the wooden cluster mounted on the wall behind it",
    cell: "lg:col-start-1 lg:row-start-2",
    sizes: "(max-width: 1024px) 100vw, 31vw",
  },
  {
    src: `${BASE}/Asset 7@4x.webp`,
    width: 1480,
    height: 488,
    alt: "The Manicured Techniques wall graphic with the artists’ names set beneath it, beside a dark sculpture resting on a wooden stool",
    cell: "lg:col-start-2 lg:row-start-2 lg:col-span-2",
    sizes: "(max-width: 1024px) 100vw, 64vw",
  },
  {
    src: `${BASE}/Asset 6@4x.webp`,
    width: 713,
    height: 488,
    alt: "Gallery corner — a wooden cluster on the back wall, black outline sculptures along a plinth, and a dark rock form on a stool",
    cell: "lg:col-start-1 lg:row-start-3",
    sizes: "(max-width: 1024px) 100vw, 31vw",
  },
  {
    src: `${BASE}/Asset 5@4x.webp`,
    width: 715,
    height: 488,
    alt: "The black outline sculpture seen closer, with the wooden cluster and its shadow filling the wall behind",
    cell: "lg:col-start-2 lg:row-start-3",
    sizes: "(max-width: 1024px) 100vw, 31vw",
  },
] as const;

/**
 * Nature Morte — Manicured Techniques in the room. Installation photographs on
 * black.
 *
 * The column gutter is 2.24% of the container on purpose: Asset 7 is a 3.033
 * ratio composite and the single shots beside it are 1.465, so that gutter is
 * exactly what makes a two-column span come out the same height as its
 * neighbour. Change it and the middle row stops lining up.
 */
export default function ManicuredInstall() {
  return (
    <section className="bg-black">
      <div className="page-container py-14 sm:py-20 lg:py-24">
        <h2 className="sr-only">Manicured Techniques — the exhibition</h2>

        <ul className="grid grid-cols-1 gap-y-3 lg:grid-cols-3 lg:gap-x-[2.24%] lg:gap-y-7">
          {SHOTS.map((shot) => (
            <li key={shot.src} className={shot.cell}>
              <Image
                src={shot.src}
                width={shot.width}
                height={shot.height}
                alt={shot.alt}
                sizes={shot.sizes}
                className="h-auto w-full"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
