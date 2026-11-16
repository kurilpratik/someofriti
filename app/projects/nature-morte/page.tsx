import type { Metadata } from "next";

import HangingGardens from "@/components/project/nature-morte/HangingGardens";
import ManicuredInstall from "@/components/project/nature-morte/ManicuredInstall";
import ManicuredTechniques from "@/components/project/nature-morte/ManicuredTechniques";
import NextProject from "@/components/project/NextProject";
import ProjectIntro from "@/components/project/ProjectIntro";
import ProjectSubHero from "@/components/project/ProjectSubHero";
import { requireProject } from "@/lib/projects";

const project = requireProject("nature-morte");

export const metadata: Metadata = {
  title: `${project.title} | someofriti`,
};

export default function NatureMortePage() {
  return (
    <>
      {/* TODO: set `cover` for this slug in lib/projects.ts (the gold sculpture
          installation shot). Until then it shows the glance poster. */}
      <ProjectSubHero project={project} />

      <ProjectIntro>
        <p>
          Working closely with Nature Morte, the focus was on creating distinct
          visual identities for each exhibition while maintaining a cohesive
          gallery language. The approach centred on subtlety — drawing from each
          artist’s process, materiality, and conceptual direction rather than
          overpowering the work with design.
        </p>
        <p>
          Deliverables spanned exhibition books, posters, spatial graphics, and
          digital collaterals, allowing each show to live across both physical
          and digital spaces with clarity and restraint.
        </p>
      </ProjectIntro>

      <HangingGardens />

      <ManicuredTechniques />

      <ManicuredInstall />

      <NextProject slug={project.slug} />
    </>
  );
}
