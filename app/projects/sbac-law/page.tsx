import type { Metadata } from "next";
import Image from "next/image";

import NextProject from "@/components/project/NextProject";
import ProjectIntro from "@/components/project/ProjectIntro";
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
          grounded, and strategic. <br />
          <br /> After understanding SBAC’s values and their problem-solving
          approach, I developed a visual system rooted in strength, clarity, and
          structure. <br />
          <br />
          The identity draws inspiration from natural forces — molten lava, ice
          formations, and fluid motion — representing resilience,
          transformation, and precision. These elements translated into a
          refined colour palette, typographic framework, and logo system
          designed to feel contemporary yet enduring
        </p>
      </ProjectIntro>

      {/* Everything below is bespoke to this project: any layout, any markup. */}

      <section className="bg-white">
        <div className="page-container py-8 sm:py-12 lg:py-16">
          <h2 className="sr-only">
            SBAC Law brand guidelines — typography, colour and logo
          </h2>
          <Image
            src="/images/projects/sbac/Asset 13.png"
            alt="Brand guideline pages for SBAC Law showing the Aviano typeface, colour theory palette and logo construction"
            width={4000}
            height={4000}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="mx-auto h-auto w-full max-w-4xl"
          />
        </div>
      </section>

      <section className="bg-white">
        <div className="page-container pb-12 sm:pb-16 lg:pb-24">
          <h2 className="sr-only">SBAC Law — print and digital touchpoints</h2>
          <Image
            src="/images/projects/sbac/Asset 15.png"
            alt="SBAC Law stationery in burgundy, ivory and teal, lit by a single shaft of light"
            width={11445}
            height={6438}
            sizes="100vw"
            className="h-auto w-full"
          />

          <div className="mt-12 grid items-center gap-y-8 sm:mt-16 lg:mt-24 lg:grid-cols-[1fr_43.5%] lg:gap-x-12">
            <p className="text-[1.25rem] leading-[1.6] font-medium text-pretty text-black sm:text-[1.4rem] lg:max-w-[36ch] lg:text-[1.5rem] xl:text-[1.5rem]">
              The identity was extended across print and digital touchpoints —
              from stationery and brand collaterals to website layouts —
              maintaining consistency while allowing flexibility in tone.
            </p>
            <Image
              src="/images/projects/sbac/Asset 14.png"
              alt="SBAC Law business cards in deep teal on a dark ribbed surface"
              width={4984}
              height={3561}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <NextProject slug={project.slug} />
    </>
  );
}
