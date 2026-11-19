import type { Metadata } from "next";
import Image from "next/image";

import NextProject from "@/components/project/NextProject";
import ProjectIntro from "@/components/project/ProjectIntro";
import ProjectSubHero from "@/components/project/ProjectSubHero";
import { requireProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";

const project = requireProject("regalium");

export const metadata: Metadata = pageMetadata({
  title: project.title,
  description:
    "Regalium — leather bags film and brand work, designed by Riti Wig.",
  path: `/projects/${project.slug}`,
  type: "article",
});

export default function RegaliumPage() {
  return (
    <>
      <ProjectSubHero project={project} />

      {/* TODO: placeholder copy taken from the reference screenshot — replace. */}
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
          <br /> As the festival expanded to Delhi Art Weekend, I took the
          identity forward, leading the design of the main posters and adapting
          the visual language to a new city while maintaining continuity with
          the original system.
        </p>
      </ProjectIntro>

      {/* Everything below is bespoke to this project: any layout, any markup. */}

      <section className="text-brand-ivory bg-black">
        <div className="page-container py-12 sm:py-16 lg:py-24">
          <video
            src="/images/projects/regalium/regal-video.mp4"
            aria-label="Regalium film"
            autoPlay
            muted
            loop
            playsInline
            className="aspect-video w-full object-cover"
          />

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-20">
            <Image
              src="/images/projects/regalium/Asset 3@4x.webp"
              alt="Regalium billboard under a railway bridge, with the tagline “The new face of luxury elevated by the power of innovation”"
              width={1086}
              height={611}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="h-auto w-full"
            />
            <Image
              src="/images/projects/regalium/Asset 2@4x.webp"
              alt="Regalium billboard in burgundy with an orange and silver sculptural pattern"
              width={1086}
              height={611}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>

          {/* TODO: placeholder copy taken from the reference screenshot — replace. */}
          <p className="font-ivy-ora mt-12 w-full text-[clamp(1.25rem,2.6vw,2.25rem)] leading-[1.25] font-light text-pretty italic sm:mt-16 lg:mt-24">
            Nature inspired textures such as lava and ice introduced depth and
            contrast, reinforcing SBAC’s balance of strength and precision. The
            result is a bold, grounded system that moves confidently across
            formats without leaning on traditional legal symbolism.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-container py-12 sm:py-16 lg:py-24">
          <h2 className="sr-only">Regalium — launch collateral</h2>

          <div className="grid items-center gap-8 lg:grid-cols-[24.5%_62.7%] lg:justify-between">
            <video
              src="/images/projects/regalium/regalium.mp4"
              aria-label="Regalium shopping bag film"
              autoPlay
              muted
              loop
              playsInline
              className="aspect-[4/3] w-full object-cover"
            />
            {/* Columns are weighted by each image's aspect ratio, so both render at the same height. */}
            <div className="grid grid-cols-[0.7415fr_0.6678fr] gap-x-[6%] lg:gap-x-[20.5%]">
              <Image
                src="/images/projects/regalium/Asset 6@4x.webp"
                alt="Regalium announcement for the Rolex boutique — “A timeless partnership”"
                width={631}
                height={851}
                sizes="(min-width: 1024px) 31vw, 50vw"
                className="h-auto w-full"
              />
              <Image
                src="/images/projects/regalium/Asset 5@4x.webp"
                alt="Regalium opening invitation — “Step into luxury”"
                width={571}
                height={855}
                sizes="(min-width: 1024px) 31vw, 50vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <NextProject slug={project.slug} />
    </>
  );
}
