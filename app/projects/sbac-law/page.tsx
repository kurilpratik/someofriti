import type { Metadata } from "next";
import Image from "next/image";

import Parallax from "@/components/motion/Parallax";
import Reveal from "@/components/motion/Reveal";
import NextProject from "@/components/project/NextProject";
import ProjectIntro, { ColumnBreak } from "@/components/project/ProjectIntro";
import ProjectSubHero from "@/components/project/ProjectSubHero";
import { requireProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";

const project = requireProject("sbac-law");

export const metadata: Metadata = pageMetadata({
  title: project.title,
  description:
    "A brand identity for SBAC Law that leaves legal cliché behind — a logo system, palette and typographic framework drawn from molten lava, ice and fluid motion.",
  path: `/projects/${project.slug}`,
  type: "article",
});

export default function SbacLawPage() {
  return (
    <>
      <ProjectSubHero project={project} />

      <ProjectIntro>
        <p>
          Most legal brands rely on the same familiar symbols — scales, gavels,
          pillars of justice — visuals that feel predictable and disconnected
          from how modern law firms actually operate. For SBAC Law, the goal was
          to move away from cliché and build an identity that felt bold,
          grounded, and strategic.
        </p>
        <p>
          After understanding SBAC’s values and their problem-solving approach,
          I developed a visual system rooted in strength, clarity, and
          structure.
        </p>
        <ColumnBreak />
        <p>
          The identity draws inspiration from natural forces — molten lava, ice
          formations, and fluid motion — representing resilience,
          transformation, and precision. These elements translated into a
          refined colour palette, typographic framework, and logo system
          designed to feel contemporary yet enduring
        </p>
      </ProjectIntro>

      {/* Everything below is bespoke to this project: any layout, any markup. */}

      <section className="bg-white">
        <div className="page-container py-12 sm:py-18 lg:py-24">
          <h2 className="sr-only">
            SBAC Law brand guidelines — typography, colour and logo
          </h2>
          {/* 6000px q95 JPEG served as-is (`unoptimized`): the guideline
              pages carry small type, which Next's default quality-75 re-encode blurs. */}
          <Reveal>
            <Image
              src="/images/projects/sbac/sbac-brand.jpg"
              alt="Brand guideline pages for SBAC Law showing the Aviano typeface, colour theory palette and logo construction"
              width={6000}
              height={7757}
              unoptimized
              className="mx-auto h-auto w-full max-w-5xl"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-container pb-18 sm:pb-24 lg:pb-36">
          <h2 className="sr-only">SBAC Law — print and digital touchpoints</h2>
          <Reveal>
            <Image
              src="/images/projects/sbac/Asset 15.png"
              alt="SBAC Law stationery in burgundy, ivory and teal, lit by a single shaft of light"
              width={11445}
              height={6438}
              sizes="100vw"
              className="h-auto w-full"
            />
          </Reveal>

          <div className="mt-18 grid items-center gap-y-12 sm:mt-24 lg:mt-36 lg:grid-cols-[1fr_43.5%] lg:gap-x-12">
            <p className="body-copy text-[1.25rem] text-pretty text-black sm:text-[1.4rem] lg:max-w-[36ch] lg:text-[1.5rem] xl:text-[1.5rem]">
              The identity was extended across print and digital touchpoints —
              from stationery and brand collaterals to website layouts —
              maintaining consistency while allowing flexibility in tone.
            </p>
            <Reveal>
              <Image
                src="/images/projects/sbac/Asset 14.png"
                alt="SBAC Law business cards in deep teal on a dark ribbed surface"
                width={4984}
                height={3561}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="text-brand-ivory bg-black">
        <div className="page-container py-24 sm:py-30 lg:py-42">
          <p className="font-ivy-ora w-full text-[clamp(1.25rem,2.6vw,2.25rem)] leading-[1.25] font-light text-pretty italic">
            Nature inspired textures such as lava and ice introduced depth and
            contrast, reinforcing SBAC’s balance of strength and precision. The
            result is a bold, grounded system that moves confidently across
            formats without leaning on traditional legal symbolism.
          </p>

          {/* Three overlapping screens, each at its own depth. Position classes
              live on the Parallax wrappers. */}
          <div className="mt-18 flex flex-col gap-8 sm:mt-24 lg:relative lg:mt-36 lg:block lg:aspect-[539/358] lg:gap-0">
            <Parallax
              depth="far"
              className="lg:absolute lg:top-[14.2%] lg:left-0 lg:z-10 lg:w-[52.1%]"
            >
              <Image
                src="/images/projects/sbac/Asset 16.webp"
                alt="SBAC Law brand applications in teal and burgundy, with ice and lava textures"
                width={1144}
                height={1052}
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="h-auto w-full"
              />
            </Parallax>
            <Parallax
              depth="near"
              className="lg:absolute lg:top-0 lg:right-0 lg:w-[49.9%]"
            >
              <Image
                src="/images/projects/sbac/sbac-web.png"
                alt="SBAC Law website home page with a water-ripple hero image"
                width={1920}
                height={1304}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </Parallax>
            <Parallax
              depth="mid"
              className="lg:absolute lg:top-[53%] lg:right-0 lg:w-[50.5%]"
            >
              <div className="relative aspect-[1161/550] w-full overflow-hidden">
                <Image
                  src="/images/projects/sbac/sbac-team.png"
                  alt="SBAC Law website team page with partner and associate portraits"
                  width={1920}
                  height={817}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="absolute top-[-29.1%] left-[-7.7%] h-auto w-[165.4%] max-w-none"
                />
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      <NextProject slug={project.slug} />
    </>
  );
}
