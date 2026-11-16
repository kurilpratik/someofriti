import Image from "next/image";

/**
 * The whole of /about: the oversized "Hello.", two columns of copy that sit
 * indented from the left edge, the portrait with its red stars, and the
 * section label pinned to the bottom of the viewport.
 *
 * The copy columns and the portrait share the same left edge on large screens:
 * one two-column grid, offset from the container's left edge, with the portrait
 * living inside the right column under its paragraph.
 */
export default function AboutIntro() {
  // `overflow-x-clip` catches the few pixels the portrait's right bleed can
  // overshoot on a wide window; see `bleed-right` in globals.css.
  return (
    <section className="text-brand-ivory flex min-h-[calc(100svh-var(--nav-height))] flex-col overflow-x-clip bg-black">
      <div className="page-container flex flex-1 flex-col pt-8 pb-8 sm:pt-10 lg:pt-12">
        <h1 className="font-ivy-ora text-[clamp(3.25rem,9vw,8rem)] leading-[0.95] font-light italic">
          Hello.
        </h1>

        {/*
          The left offset is what sets the composition: on large screens the
          copy starts roughly a quarter of the way across, leaving the "Hello."
          alone above it. Below `lg` it is a single stacked column.
        */}
        <div className="mt-8 grid gap-x-12 gap-y-10 text-[0.95rem] leading-[1.7] tracking-[0.03em] text-pretty sm:text-[1rem] lg:mt-10 lg:ml-[22%] lg:grid-cols-2 lg:gap-x-14 lg:text-[1.05rem] xl:gap-x-20 [&_p+p]:mt-[1.5em]">
          <div>
            <p>
              I’m a designer working across identity, systems, and brand
              storytelling. My work sits between structure and instinct; where
              clarity matters, details are intentional, and things are built to
              last, at least until they stop making sense or need a little
              makeover.
            </p>
            <p>
              I come from the belief that nothing lasts forever{" "}
              <span className="font-ivy-ora font-light italic">
                (a philosophy honours degree will do that to you)
              </span>
              , and that design and language are constantly evolving. What
              should remain steady are purpose, values, and intent — the things
              a brand stands on long before the visuals show up.
            </p>
            <p>
              Over the years, my practice has grown across luxury, hospitality,
              FMCG, culture, technology, and the arts. My approach isn’t only
              outward or visual; it begins inward, with thought and clarity. I
              focus strongly on systems — building solid roots first,
              understanding what needs to hold, and then shaping a visual
              language that works naturally and consistently across contexts.
            </p>
          </div>

          <div className="flex flex-col">
            <p>
              Outside of work, I’m an absolute lover of hot, warm, wholesome
              soups and boxing. I like to think that sensibility finds its way
              into the work too! considered, comforting, wholesome yet really
              comes out with a <strong className="font-semibold">pow!</strong>
            </p>

            {/*
              The stars and the transparent space above the photo are baked into
              the asset, so it is placed whole — no crop, no fixed aspect box —
              and the wordmark is laid over its bottom-right corner. It runs
              past the container to the right edge of the screen.
            */}
            <div className="bleed-right relative mt-10 w-auto lg:mt-auto lg:pt-14">
              <Image
                src="/images/about.webp"
                alt="Riti Wig outdoors, resting her chin on her hand in front of a hedgerow"
                width={1561}
                height={692}
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="h-auto w-full"
              />

              <Image
                src="/images/logo/someofriti-logo.png"
                alt=""
                aria-hidden="true"
                width={260}
                height={80}
                className="absolute right-[6%] bottom-[5%] h-auto w-[24%] max-w-[120px]"
              />
            </div>
          </div>
        </div>

        {/* `mt-auto` pins the label to the bottom of the viewport when the copy
            leaves room, and falls back to the padding gap when it doesn't. */}
        <p className="text-brand-ivory mt-auto flex items-center gap-3 pt-12 text-[0.7rem] font-medium tracking-[0.22em] uppercase sm:text-[0.72rem]">
          Portfolio
          <span aria-hidden="true" className="text-muted-foreground">
            |
          </span>
          First things first
        </p>
      </div>
    </section>
  );
}
