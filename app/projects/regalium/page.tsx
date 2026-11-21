import type { Metadata } from "next";
import Image from "next/image";

import { REVEAL } from "@/components/motion/config";
import Parallax from "@/components/motion/Parallax";
import Reveal from "@/components/motion/Reveal";
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

      <ProjectIntro>
        <p>
          Luxury has always had a place in India. Regalium is about giving it a
          new address. <br />
          <br /> Set in the heart of Bengaluru, Regalium is an ambitious
          mixed-use destination by the Machani Group, bringing together luxury,
          culture, hospitality and innovation under one roof. The idea was to
          create something distinctly Indian in its origins, yet entirely
          contemporary in its expression. <br />
          <br /> Developed during my time at CORE Experience, the project
          involved translating this vision into a visual world that felt as
          confident as the destination itself. <br />
          <br /> The identity takes its cues from the building’s architecture,
          particularly its defining 60-degree angular cut. This geometric detail
          became a recurring design element, informing layouts, graphic devices
          and a flexible system that could move across formats without losing
          its character. <br />
          <br /> Regalium Red, inspired by the rich laterite earth of South
          India, brought a sense of place to the identity. Paired with deep
          blacks, warm browns and a restrained typographic language, it created
          a visual vocabulary that was bold, sophisticated and unmistakably its
          own.
        </p>
      </ProjectIntro>

      {/* Everything below is bespoke to this project: any layout, any markup. */}

      <section className="text-brand-ivory bg-black">
        <div className="page-container py-18 sm:py-24 lg:py-36">
          <Reveal>
            <video
              src="/images/projects/regalium/regal-video.mp4"
              aria-label="Regalium film"
              autoPlay
              muted
              loop
              playsInline
              className="aspect-video w-full object-cover"
            />
          </Reveal>

          {/* The two billboards reveal in turn. */}
          <div className="mt-15 grid gap-4 sm:mt-21 sm:grid-cols-2 sm:gap-5 lg:mt-30">
            <Reveal>
              <Image
                src="/images/projects/regalium/bb.jpg"
                alt="Regalium billboard under a railway bridge, with the tagline “The new face of luxury elevated by the power of innovation”"
                width={1086}
                height={611}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </Reveal>
            <Reveal delay={REVEAL.stagger}>
              <Image
                src="/images/projects/regalium/ba.jpg"
                alt="Regalium billboard in burgundy with an orange and silver sculptural pattern"
                width={1086}
                height={611}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </Reveal>
          </div>

          {/* Same body type as the page intro. */}
          <div className="mt-18 sm:mt-24 lg:mt-36">
            <p className="w-full text-[1rem] leading-[1.8] tracking-[0.04em] text-pretty sm:text-[1.05rem] lg:text-[1.15rem] xl:text-[1.25rem]">
              My work extended across the brand’s visual applications, from
              campaign art direction and editorial layouts to print, digital
              communication and environmental graphics. The challenge was to
              build a cohesive world for a destination with many different
              facets, allowing each to have its own personality while remaining
              part of the larger Regalium story.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="page-container py-18 sm:py-24 lg:py-36">
          <h2 className="sr-only">Regalium — launch collateral</h2>

          <div className="grid items-center gap-8 lg:grid-cols-[24.5%_62.7%] lg:justify-between">
            <Reveal>
              <video
                src="/images/projects/regalium/regalium.mp4"
                aria-label="Regalium shopping bag film"
                autoPlay
                muted
                loop
                playsInline
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>
            {/* Columns are weighted by each image's aspect ratio, so both render at the same height. */}
            <div className="grid grid-cols-[0.7415fr_0.6678fr] gap-x-[6%] lg:gap-x-[20.5%]">
              <Reveal delay={REVEAL.stagger}>
                <Image
                  src="/images/projects/regalium/Asset 6@4x.webp"
                  alt="Regalium announcement for the Rolex boutique — “A timeless partnership”"
                  width={631}
                  height={851}
                  sizes="(min-width: 1024px) 31vw, 50vw"
                  className="h-auto w-full"
                />
              </Reveal>
              {/* Set a touch deeper than its neighbour, so the pair separates on scroll. */}
              <Reveal delay={REVEAL.stagger * 2}>
                <Parallax depth="far">
                  <Image
                    src="/images/projects/regalium/Asset 5@4x.webp"
                    alt="Regalium opening invitation — “Step into luxury”"
                    width={571}
                    height={855}
                    sizes="(min-width: 1024px) 31vw, 50vw"
                    className="h-auto w-full"
                  />
                </Parallax>
              </Reveal>
            </div>
          </div>

          <div className="mt-36 sm:mt-48 lg:mt-84">
            <p className="font-ivy-ora mx-auto text-center text-[clamp(1.75rem,4.4vw,4rem)] leading-[1.2] font-light text-pretty text-[#7a7a7a] italic">
              {/* Line breaks follow the layout on larger screens. */}
              An identity rooted in India’s rich{" "}
              <br className="hidden sm:inline" />
              legacy of luxury, but designed to{" "}
              <br className="hidden sm:inline" />
              define what comes next.
            </p>
          </div>
        </div>
      </section>

      <section className="text-brand-ivory bg-black">
        {/* Generous bottom padding: the cards and deck drift on scroll, which
            eats into the gap around the card-system line. */}
        <div className="page-container pt-30 pb-40 sm:pt-42 sm:pb-56 lg:pt-108 lg:pb-64">
          <h2 className="sr-only">Regalium — the world of the brand</h2>

          {/* Four portrait cards; the 1st and 3rd sit lower on large screens, as in
              the layout, and drift deeper than the 2nd and 4th as the page scrolls. */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 lg:grid-cols-4 lg:items-start lg:gap-x-[2.8%]">
            {/* 1 — "Step into luxury" card with the arched-bar photo laid over its top. */}
            <Reveal>
              <Parallax depth="far">
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
              </Parallax>
            </Reveal>

            {/* 2 — brand statement. */}
            <Reveal delay={REVEAL.stagger}>
              <Parallax depth="near">
                <div className="relative aspect-[506/698] w-full">
                  <Image
                    src="/images/projects/regalium/Asset 13@4x.webp"
                    alt="“To experience Regalium is to discover a world where indulgence meets imagination”"
                    fill
                    sizes="(min-width: 1024px) 23vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Parallax>
            </Reveal>

            {/* 3 — hotel lobby in a solid burgundy frame; the frame colour also fills a
                triangle in the top-right and bottom-left corners of the photo. */}
            <Reveal delay={REVEAL.stagger * 2}>
              <Parallax depth="far">
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
              </Parallax>
            </Reveal>

            {/* 4 — "Where indulgence finds a new address" artwork over looping burgundy satin. */}
            <Reveal delay={REVEAL.stagger * 3}>
              <Parallax depth="near">
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
              </Parallax>
            </Reveal>
          </div>

          <div className="mt-34 sm:mt-50 lg:mt-72">
            <p className="font-ivy-ora w-full text-[clamp(1.25rem,2.6vw,2.375rem)] leading-[1.2] font-light text-pretty italic">
              Inspired by the building’s distinctive 60-degree angular cut, I
              developed a versatile card system that carries its architectural
              language across print, digital and spatial applications.
            </p>
          </div>
        </div>
      </section>

      <section className="text-brand-ivory bg-black">
        <div className="page-container pb-24 sm:pb-36 lg:pb-48">
          <h2 className="sr-only">Regalium — brand identity deck</h2>

          {/* Three overlapping deck slides on large screens; a plain stack below that.
              Each slide sits at its own depth, so they slide past one another on
              scroll. Position classes live on the Parallax wrappers. */}
          <div className="flex flex-col gap-6 lg:relative lg:block lg:aspect-[816/621] lg:gap-0">
            <Parallax
              depth="mid"
              className="lg:absolute lg:top-[7.6%] lg:left-[5.9%] lg:z-20 lg:w-[49.8%]"
            >
              <Image
                src="/images/projects/regalium/Asset 15-no-shadow.webp"
                alt="Regalium identity slide — the plot and card shapes, and how the building’s angles inspire the wordmark and patterns"
                width={1238}
                height={697}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full shadow-[0_14px_40px_rgba(0,0,0,0.5)]"
              />
            </Parallax>
            <Parallax
              depth="far"
              className="lg:absolute lg:top-[28.3%] lg:left-[46.8%] lg:z-10 lg:w-[47.3%]"
            >
              <Image
                src="/images/projects/regalium/Asset 16@4x.webp"
                alt="Regalium Bengaluru slide — Koramangala and the CBD’s elite residents"
                width={1181}
                height={665}
                sizes="(min-width: 1024px) 47vw, 100vw"
                className="h-auto w-full"
              />
            </Parallax>
            <Parallax
              depth="near"
              className="lg:absolute lg:top-[55.1%] lg:left-[21.4%] lg:z-30 lg:w-[47.4%]"
            >
              <Image
                src="/images/projects/regalium/Asset 17@4x.webp"
                alt="Regalium Bengaluru slide — “As India’s luxury landscape continues to evolve, Regalium offers a glimpse into the future of urban living”"
                width={1181}
                height={664}
                sizes="(min-width: 1024px) 47vw, 100vw"
                className="h-auto w-full shadow-[0_14px_40px_rgba(0,0,0,0.5)]"
              />
            </Parallax>
          </div>
        </div>
      </section>

      <NextProject slug={project.slug} />
    </>
  );
}
