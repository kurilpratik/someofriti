import type { Metadata } from "next";

import NextProject from "@/components/project/NextProject";
import ProjectIntro from "@/components/project/ProjectIntro";
import ProjectSubHero from "@/components/project/ProjectSubHero";
import { requireProject } from "@/lib/projects";

/**
 * A hand-coded project page. Copy this folder to start another one:
 *   1. app/projects/<slug>/page.tsx   (this file)
 *   2. fill in client / year / workTypes / cover for the slug in lib/projects.ts
 *   3. write the intro and the body below
 */

const project = requireProject("bangalore-art-weekend");

export const metadata: Metadata = {
  title: `${project.title} | someofriti`,
};

export default function BangaloreArtWeekendPage() {
  return (
    <>
      <ProjectSubHero project={project} />

      {/* One block of copy: it splits into two balanced columns on large screens. */}
      <ProjectIntro>
        <p>
          Bangalore Art Weekend, initiated by Usual Suspects, Svasa Life,
          Regalium, and The Curator Mag, brought together art, culture, and
          conversation through a programme of talks, workshops, screenings, and
          panel discussions. <br />
          <br /> As a senior designer at CORE Experience, I worked extensively
          on bringing the festival’s visual identity to life across panels,
          social media, posters, printed material, menus, and discussion
          backdrops. The work involved translating an established creative
          direction into multiple applications, ensuring the visual language
          remained coherent while adapting to different formats, spaces, and
          programming needs. <br />
          <br /> A big part of the process was problem-solving at scale —
          figuring out how the identity could hold across multiple touchpoints,
          timelines, and collaborators without losing clarity or intent. <br />
          <br /> As the festival expanded to Delhi Art Weekend,I took the
          identity forward, leading the design of the main posters and adapting
          the visual language to a new city while maintaining continuity with
          the original system.
        </p>
      </ProjectIntro>

      {/* Everything below is bespoke to this project: any layout, any markup. */}

      <NextProject slug={project.slug} />
    </>
  );
}
