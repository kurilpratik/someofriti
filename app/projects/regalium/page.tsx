import type { Metadata } from "next";
import Image from "next/image";

import NextProject from "@/components/project/NextProject";
import ProjectIntro from "@/components/project/ProjectIntro";
import ProjectSubHero from "@/components/project/ProjectSubHero";
import SilkBackground from "@/components/project/regalium/SilkBackground";
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
              src="/images/projects/regalium/bb.jpg"
              alt="Regalium billboard under a railway bridge, with the tagline “The new face of luxury elevated by the power of innovation”"
              width={1086}
              height={611}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="h-auto w-full"
            />
            <Image
              src="/images/projects/regalium/ba.jpg"
              alt="Regalium billboard in burgundy with an orange and silver sculptural pattern"
              width={1086}
              height={611}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>

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

      <section className="text-brand-ivory bg-black">
        <div className="page-container pt-20 pb-12 sm:pt-28 sm:pb-16 lg:pt-72 lg:pb-24">
          <h2 className="sr-only">Regalium — the world of the brand</h2>

          {/* Four portrait cards; the 1st and 3rd sit lower on large screens, as in the layout. */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 lg:grid-cols-4 lg:items-start lg:gap-x-[2.8%]">
            {/* 1 — "Step into luxury" card with the arched-bar photo laid over its top. */}
            <div className="relative aspect-[506/698] w-full lg:mt-[16%]">
              <Image
                src="/images/projects/regalium/Asset 12@4x.webp"
                alt="Regalium opening invitation — “Step into luxury, pinnacle of elegance”"
                fill
                sizes="(min-width: 1024px) 23vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-x-[3.2%] top-[2.3%] h-[50.7%] [clip-path:polygon(0_0,100%_0,100%_100%,12%_100%,0_84%)]">
                <Image
                  src="/images/projects/regalium/Opulent Burgundy Arched Bar Lounge.png"
                  alt="An arched, amber-lit bar lined with bottles and a row of stools"
                  fill
                  sizes="(min-width: 1024px) 22vw, 48vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* 2 — brand statement. */}
            <div className="relative aspect-[506/698] w-full">
              <Image
                src="/images/projects/regalium/Asset 13@4x.webp"
                alt="“To experience Regalium is to discover a world where indulgence meets imagination”"
                fill
                sizes="(min-width: 1024px) 23vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* 3 — hotel lobby in a solid burgundy frame; the frame colour also fills a
                triangle in the top-right and bottom-left corners of the photo. */}
            <div className="aspect-[495/682] w-full bg-[#5f1b1e] p-[1.9%] lg:mt-[16%]">
              <div className="relative size-full">
                <Image
                  src="/images/projects/regalium/Opulent Amber Hotel Lobby.png"
                  alt="A softly blurred guest walks past a lit amber lounge beneath a glass chandelier"
                  fill
                  sizes="(min-width: 1024px) 23vw, 50vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-0 right-0 h-[10%] w-[14.5%] bg-[#5f1b1e] [clip-path:polygon(0_0,100%_0,100%_100%)]"
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[11.5%] w-[16.5%] bg-[#5f1b1e] [clip-path:polygon(0_0,0_100%,100%_100%)]"
                />
              </div>
            </div>

            {/* 4 — "Where indulgence finds a new address" artwork over looping burgundy satin. */}
            <div className="relative isolate flex aspect-[248/342] w-full items-center justify-center overflow-hidden bg-[#2a0a0d]">
              <SilkBackground className="-z-10" />
              <Image
                src="/images/projects/regalium/Asset 14@4x.webp"
                alt="“Where indulgence finds a new address” — Regalium brings this world together, where exceptional flavours, considered luxury and the pleasure of discovery turn every evening into an occasion"
                width={406}
                height={377}
                sizes="(min-width: 1024px) 23vw, 50vw"
                className="h-auto w-[81%]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="text-brand-ivory bg-black">
        <div className="page-container pb-16 sm:pb-24 lg:pb-32">
          <h2 className="sr-only">Regalium — brand identity deck</h2>

          {/* Three overlapping deck slides on large screens; a plain stack below that. */}
          <div className="flex flex-col gap-6 lg:relative lg:block lg:aspect-[816/621] lg:gap-0">
            <Image
              src="/images/projects/regalium/Asset 15-no-shadow.webp"
              alt="Regalium identity slide — the plot and card shapes, and how the building’s angles inspire the wordmark and patterns"
              width={1238}
              height={697}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full shadow-[0_14px_40px_rgba(0,0,0,0.5)] lg:absolute lg:top-[7.6%] lg:left-[5.9%] lg:z-20 lg:w-[49.8%]"
            />
            <Image
              src="/images/projects/regalium/Asset 16@4x.webp"
              alt="Regalium Bengaluru slide — Koramangala and the CBD’s elite residents"
              width={1181}
              height={665}
              sizes="(min-width: 1024px) 47vw, 100vw"
              className="h-auto w-full lg:absolute lg:top-[28.3%] lg:left-[46.8%] lg:z-10 lg:w-[47.3%]"
            />
            <Image
              src="/images/projects/regalium/Asset 17@4x.webp"
              alt="Regalium Bengaluru slide — “As India’s luxury landscape continues to evolve, Regalium offers a glimpse into the future of urban living”"
              width={1181}
              height={664}
              sizes="(min-width: 1024px) 47vw, 100vw"
              className="h-auto w-full shadow-[0_14px_40px_rgba(0,0,0,0.5)] lg:absolute lg:top-[55.1%] lg:left-[21.4%] lg:z-30 lg:w-[47.4%]"
            />
          </div>
        </div>
      </section>

      <NextProject slug={project.slug} />
    </>
  );
}
