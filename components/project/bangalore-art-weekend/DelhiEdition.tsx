import Image from "next/image";

const BASE = "/images/projects/bangalore";

/**
 * Bangalore Art Weekend — the Delhi edition. The full poster set runs across
 * the top as one artwork (the grid and its gutters are baked into the file),
 * and the note on carrying the identity to a new city sits beneath it: the
 * display line on the left, the copy on the right, in the deck's two columns.
 */
export default function DelhiEdition() {
  return (
    <section className="text-brand-ivory bg-black">
      <div className="page-container @container pt-4 pb-16 sm:pb-24 lg:pb-28">
        <h2 className="sr-only">Bangalore Art Weekend — the Delhi edition</h2>

        <Image
          src={`${BASE}/Asset 22@4x.webp`}
          width={1887}
          height={1167}
          alt="The festival poster set — eighteen posters in the identity's red and blue duotone, covering venues (Sabha, General Items, Form & Flow Studio, Kaash), workshops on journal comics and zine-making, speaker cards for Vinay Shukla, Deepak Kathait and Pragya Bhagat, the schedule announcement, a panel discussion on filmmaking, and the full line-up of names"
          sizes="100vw"
          className="h-auto w-full"
        />

        <div className="mt-16 grid gap-y-8 sm:mt-20 lg:mt-28 lg:grid-cols-[32%_59%] lg:justify-between lg:gap-y-0">
          {/* The deck breaks this line in three; keeping the breaks explicit
              rather than letting it wrap, so the shape holds at every width. */}
          <p
            aria-hidden="true"
            className="font-ivy-ora text-[clamp(2.75rem,8.5vw,7.5rem)] leading-[1.05] font-light italic"
          >
            For
            <br />
            the Delhi
            <br />
            edition
          </p>

          {/* Capped at a 52-character measure, then pushed to the end of its
              column so the copy's right edge lands on the poster grid's. */}
          <div className="self-center text-[1rem] leading-[1.8] tracking-[0.04em] text-pretty sm:text-[1.05rem] lg:ml-auto lg:max-w-[52ch] lg:text-[1.15rem] xl:text-[1.25rem]">
            <p>
              <span className="sr-only">For the Delhi edition: </span>I led the
              design of the main posters, adapting the existing visual identity
              to a new city while maintaining continuity with the overall
              system. The project reflects an approach I value — working within
              established frameworks while allowing enough flexibility for the
              identity to evolve and respond to new contexts.
            </p>
          </div>
        </div>

        {/* The two city posters and the wristbands, laid out as the deck has
            them: the Qutub Minar poster alone on the left, the wristbands
            inset at the top of the right column with the India Gate poster
            dropped well below them. Same percentage-of-container approach as
            the collage above, so the drop holds at every width. */}
        <div className="mt-16 grid gap-y-12 sm:mt-20 sm:gap-y-16 lg:mt-28 lg:grid-cols-[46.2%_45.7%] lg:justify-between lg:gap-y-0">
          <Image
            src={`${BASE}/Asset 24@4x.webp`}
            width={1008}
            height={1260}
            alt="Delhi Art Weekend poster — the Qutub Minar rising between teal trees against a red sky, the title set across it in English and Hindi over a blue field, dated October, 2025"
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="h-auto w-full"
          />

          <div className="flex flex-col gap-y-12 sm:gap-y-16 lg:gap-y-[15.2cqw] lg:pt-[5.5cqw]">
            <Image
              src={`${BASE}/Asset 25@4x.webp`}
              width={843}
              height={632}
              alt="Three Delhi Art Weekend wristbands stacked one inside another — blue, red and black, each printed with the festival name in English and Hindi"
              sizes="(max-width: 1024px) 100vw, 34vw"
              className="h-auto w-[75.3%] self-center lg:ml-[12.5%] lg:self-start"
            />

            <Image
              src={`${BASE}/Asset 23@4x.webp`}
              width={1008}
              height={1261}
              alt="Delhi Art Weekend poster — India Gate in teal on red with doves in flight around it, the title in English and Hindi across a blue field, dated October, 2025"
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
