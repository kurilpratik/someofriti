import Image from "next/image";

const BASE = "/images/projects/nature";

/** The three constructions across the top row. */
const TOP_ROW = [
  {
    src: `${BASE}/Asset 3@4x.webp`,
    width: 623,
    height: 268,
    alt: "Manicured Techniques logo — light sans on black, the first line closed with three dots — annotated “Varying forms used”",
  },
  {
    src: `${BASE}/Asset 4@4x.webp`,
    width: 642,
    height: 268,
    alt: "Manicured Techniques logo — heavy sans on black, with notches cut into the letters — annotated “Varying forms used”",
  },
  {
    src: `${BASE}/Asset 2@4x.webp`,
    width: 627,
    height: 293,
    alt: "Three serif lockups of Manicured Techniques, each setting the second word differently — annotated “Varying forms used”",
  },
] as const;

/** The two grid constructions below it. */
const BOTTOM_ROW = [
  {
    src: `${BASE}/Asset 33@4x.webp`,
    width: 776,
    height: 223,
    alt: "Manicured Techniques lockup drawn over its construction grid, the second word in outline",
  },
  {
    src: `${BASE}/Asset 1@4x.webp`,
    width: 957,
    height: 282,
    alt: "Manicured Techniques lockup set over a measuring rule — annotated “Personalised scales of sculptures”",
  },
] as const;

/**
 * Nature Morte — Manicured Techniques. The typographic constructions as the
 * identity deck presents them; each study carries its own arrow and note in the
 * artwork, so the grid here is just the images.
 */
export default function ManicuredTechniques() {
  return (
    <section className="bg-brand-white text-black">
      <div className="page-container pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-28">
        <h2 className="sr-only">
          Manicured Techniques — typographic constructions
        </h2>

        <p className="font-ivy-ora max-w-[62ch] text-[clamp(1.1rem,2.1vw,1.75rem)] leading-[1.45] font-light text-pretty italic lg:max-w-none">
          Manicured Techniques explored variation within structure — reflecting
          the artists’ personalised scales, materials, and sculptural forms. The
          typographic identity evolved through multiple constructions, testing
          rhythm, spacing, and hierarchy before arriving at a system that felt
          both precise and flexible.
        </p>

        <div className="mx-auto lg:w-[82%]">
          <ul className="mt-14 grid grid-cols-1 items-start gap-x-10 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-12">
            {TOP_ROW.map((study) => (
              <li key={study.src}>
                <Image
                  src={study.src}
                  width={study.width}
                  height={study.height}
                  alt={study.alt}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full"
                />
              </li>
            ))}
          </ul>

          <ul className="mt-16 grid grid-cols-1 items-end gap-x-10 gap-y-14 lg:mt-24 lg:grid-cols-2 lg:gap-x-12">
            {BOTTOM_ROW.map((study) => (
              <li key={study.src}>
                <Image
                  src={study.src}
                  width={study.width}
                  height={study.height}
                  alt={study.alt}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-auto w-full"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Closing copy. One run of text that splits into two balanced columns
            on large screens, the way the intro under the sub-hero does. */}
        <div className="mt-16 text-[1.05rem] leading-[1.85] font-normal tracking-[0.045em] text-pretty sm:text-[1.15rem] lg:mt-24 lg:columns-2 lg:gap-x-20 lg:text-[1.2rem]">
          <p>
            The final mark was built as a structured framework rather than a
            fixed logo, allowing it to adapt naturally across spatial and print
            applications. The identity extended seamlessly into the exhibition
            space from wall graphics to spatial markers creating a cohesive
            visual experience that guided visitors without distracting from the
            artworks. The system allowed each element to hold presence while
            remaining secondary to the sculptures themselves.
          </p>
        </div>
      </div>
    </section>
  );
}
