import type { Metadata } from "next";
import Image from "next/image";

import { REVEAL } from "@/components/motion/config";
import Parallax from "@/components/motion/Parallax";
import Reveal from "@/components/motion/Reveal";
import NextProject from "@/components/project/NextProject";
import ProjectIntro from "@/components/project/ProjectIntro";
import ProjectSubHero from "@/components/project/ProjectSubHero";
import { requireProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";

const project = requireProject("wallis");

export const metadata: Metadata = pageMetadata({
  title: project.title,
  description:
    "A rebrand for Wallis that reframes the agency as a strategic, consulting-level partner — logo, colour palette, symbols and the thinking behind them.",
  path: `/projects/${project.slug}`,
  type: "article",
});

export default function WallisPage() {
  return (
    <>
      <ProjectSubHero project={project} />

      <ProjectIntro>
        <p>
          Wallis came in at a moment where the agency had outgrown the idea of
          being seen as “just PR.” The work focused on reframing how the brand
          shows up as a strategic, consulting-level partner with a strong
          editorial point of view. The rebrand covered the full system: logo,
          colour palette, symbols, and the underlying thinking that tied it all
          together.
        </p>
        <p>
          A lot of emphasis was placed on clarity, restraint, and confidence,
          keeping the legacy and credibility intact while introducing a fresher,
          more contemporary lens.
        </p>
        <p>
          The outcome was a considered identity system, backed by a detailed
          presentation, that gave Wallis a sharper voice and a more current
          presence without trying to reinvent what already worked.
        </p>
      </ProjectIntro>

      {/* Everything below is bespoke to this project: any layout, any markup. */}

      <section className="text-brand-ivory bg-black">
        <div className="page-container pt-18 pb-30 sm:pt-24 sm:pb-42 lg:pt-36 lg:pb-60">
          <h2 className="sr-only">
            Wallis — brand presentation, business cards and invitations
          </h2>

          <Reveal>
            <video
              src="/images/projects/wallis/wallis-video.mov"
              aria-label="Scrolling through the Wallis brand presentation slides"
              autoPlay
              muted
              loop
              playsInline
              className="aspect-[3024/1280] w-full object-cover"
            />
          </Reveal>

          {/* Business cards on the left, invitation and envelope beside them,
              centred against the cards' height on large screens. */}
          <div className="mt-30 grid items-center gap-y-10 sm:mt-42 lg:mt-60 lg:grid-cols-[55%_21%] lg:justify-between">
            <Reveal>
              <Image
                src="/images/projects/wallis/Asset 4@4x.webp"
                alt="Six Wallis business cards for Reshma Mehra, Partner, in pink, plum, orange, coral, forest green and blue, each with a tonal wallis wordmark"
                width={1429}
                height={1515}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="h-auto w-full"
              />
            </Reveal>
            <Reveal delay={REVEAL.stagger}>
              <Parallax depth="far">
                {/* Animated GIF: served as-is, since Next's optimiser would
                    flatten it to a single frame. */}
                <Image
                  src="/images/projects/wallis/wallis-animated.gif"
                  alt="Wallis opening night invitation above its matching envelope, cycling through the brand colours"
                  width={1152}
                  height={1684}
                  unoptimized
                  className="mx-auto h-auto w-full max-w-[24rem] lg:max-w-none"
                />
              </Parallax>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="text-brand-ivory bg-black">
        <div className="page-container pb-30 sm:pb-42 lg:pb-60">
          <h2 className="sr-only">
            Wallis — colour pairings, symbols and typography
          </h2>

          {/* Two guideline spreads side by side; the right one sits a touch
              deeper, so the pair separates on scroll. */}
          <div className="mx-auto grid gap-y-10 sm:grid-cols-2 sm:gap-x-[4%] lg:w-[84%]">
            <Reveal>
              <Image
                src="/images/projects/wallis/Asset 7@4x.webp"
                alt="Wallis guideline pages — colour pairings in orange, plum, pink, blue and coral, and a symbol for each sector: government, arts & culture, healthcare, luxury hospitality, technology and anything else"
                width={1048}
                height={1253}
                sizes="(min-width: 1024px) 41vw, (min-width: 640px) 48vw, 100vw"
                className="h-auto w-full"
              />
            </Reveal>
            <Reveal delay={REVEAL.stagger}>
              <Parallax depth="far">
                <Image
                  src="/images/projects/wallis/Asset 6@4x.webp"
                  alt="Wallis typography pages — the Elza typeface in regular and italic, upper and lower case"
                  width={1003}
                  height={1216}
                  sizes="(min-width: 1024px) 41vw, (min-width: 640px) 48vw, 100vw"
                  className="h-auto w-full"
                />
              </Parallax>
            </Reveal>
          </div>

          {/* Same body type as the page intro. */}
          <div className="mt-24 sm:mt-36 lg:mt-48">
            <p className="body-copy w-full text-[1rem] text-pretty sm:text-[1.05rem] lg:text-[1.15rem] xl:text-[1.25rem]">
              The Wallis identity system was built as a set of modular parts —
              colours and symbols that adapt across sectors while maintaining a
              consistent tone. Bold yet controlled colour pairings bring
              freshness to the brand, while a restrained symbol language adds
              structure and clarity.
            </p>
          </div>
        </div>
      </section>

      <section className="text-brand-ivory bg-black">
        <div className="page-container pb-30 sm:pb-42 lg:pb-60">
          <h2 className="sr-only">Wallis — the identity in use</h2>

          {/* Three equal columns, each photo cropped into the same 3:4 frame so
              the row lines up top and bottom. The middle one sits a touch
              deeper, so the row separates on scroll. Stacks on phones. */}
          <div className="grid gap-y-6 sm:grid-cols-3 sm:gap-x-4 lg:gap-x-6">
            <Reveal>
              <Image
                src="/images/projects/wallis/wallis-blue.jpg"
                alt="A blue Wallis pouch clipped by a carabiner to the belt loop of dark trousers"
                width={2392}
                height={2964}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="aspect-[3/4] w-full object-cover"
              />
            </Reveal>
            <Reveal delay={REVEAL.stagger}>
              <Parallax depth="far">
                <Image
                  src="/images/projects/wallis/wallis-card.jpg"
                  alt="Hands holding a red Wallis business card and its white reverse over a striped shirt"
                  width={2000}
                  height={2996}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="aspect-[3/4] w-full object-cover"
                />
              </Parallax>
            </Reveal>
            <Reveal delay={REVEAL.stagger * 2}>
              <Image
                src="/images/projects/wallis/wallis-red.jpg"
                alt="A Wallis presentation folder in plum and coral, opened to show the documents inside"
                width={1185}
                height={1282}
                sizes="(min-width: 640px) 33vw, 100vw"
                className="aspect-[3/4] w-full object-cover"
              />
            </Reveal>
          </div>

          <div className="mt-30 sm:mt-42 lg:mt-60">
            <p className="font-ivy-ora text-[clamp(1.75rem,4.4vw,4rem)] leading-[1.2] font-light text-pretty italic">
              {/* Line breaks follow the layout on larger screens. */}
              Visual system that feels <br className="hidden sm:inline" />
              editorial, flexible, and confident —{" "}
              <br className="hidden sm:inline" />
              designed to evolve with the <br className="hidden sm:inline" />
              agency rather than define <br className="hidden sm:inline" />
              it narrowly.
            </p>
          </div>
        </div>
      </section>

      <NextProject slug={project.slug} />
    </>
  );
}
