import type { Metadata } from "next";

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

      <NextProject slug={project.slug} />
    </>
  );
}
