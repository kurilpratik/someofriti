import type { Metadata } from "next";

import NextProject from "@/components/project/NextProject";
import ProjectIntro from "@/components/project/ProjectIntro";
import ProjectSubHero from "@/components/project/ProjectSubHero";
import { requireProject } from "@/lib/projects";

const project = requireProject("bira-netflix");

export const metadata: Metadata = {
  title: `${project.title} | someofriti`,
};

export default function BiraNetflixPage() {
  return (
    <>
      {/* TODO: set `year` and `cover` for this slug in lib/projects.ts (the tiled
          illustration banner). Until then it shows the glance illustration. */}
      <ProjectSubHero project={project} />

      {/* TODO: this copy was read from a low-resolution mockup — proofread it. */}
      <ProjectIntro>
        <p>
          Worked as the core illustrator on a collaboration between Netflix
          India and Bira as part of StreamFest — a two-day open viewing event
          bringing some of Netflix’s most popular shows to a wide Indian
          audience. My role focused on shaping the visual language for the
          platform, creating illustrations and creatives that translated each
          show into a distinctive visual experience.
        </p>
        <p>
          Alongside this, I was on retainer with Bira, working across campaigns,
          brand releases, and key moments, including the launch of their first
          brewery in Bangalore. The work spanned digital storytelling as well as
          on-ground brand expression, allowing the visual language to live
          seamlessly across formats and spaces.
        </p>
        <p>
          Together, these projects reflect an approach rooted in adaptability —
          building visuals that are expressive, recognisable, and designed to
          connect in real time.
        </p>
      </ProjectIntro>

      {/*
        Body, still to build (from the mockup):
          1. Black section — a small 2x2 grid of dark creatives beside a row of
             phone mockups.
          2. Red section — grid of illustrated show posters, then a row of
             character illustrations on light tiles.
        Both sit in the same `page-container` as everything above.
      */}

      <NextProject slug={project.slug} />
    </>
  );
}
