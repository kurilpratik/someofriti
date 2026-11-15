import type { Metadata } from "next";

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

      {/*
        Body, still to build (from the mockup):
          1. White section — identity drawings and logo constructions, with a
             small caption beside them and two short paragraphs of copy.
          2. Black section — mosaic of installation photographs in mixed sizes.
        Both sit in the same `page-container` as everything above.
      */}

      <NextProject slug={project.slug} />
    </>
  );
}
