import type { Metadata } from "next";
import Image from "next/image";

import { REVEAL } from "@/components/motion/config";
import Reveal from "@/components/motion/Reveal";
import ArtworkViewer, {
  ArtworkButton,
  type Artwork,
} from "@/components/project/madstarbase/ArtworkViewer";
import NextProject from "@/components/project/NextProject";
import ProjectIntro, { ColumnBreak } from "@/components/project/ProjectIntro";
import ProjectSubHero from "@/components/project/ProjectSubHero";
import { requireProject } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";

const project = requireProject("madstarbase");

export const metadata: Metadata = pageMetadata({
  title: project.title,
  description:
    "Album branding for DJ duo MadStarBase — a cover design that grew into a full visual system for Mollywood 1.0 and 2.0, nostalgic yet irreverent.",
  path: `/projects/${project.slug}`,
  type: "article",
});

const DIR = "/images/projects/madstar";
const SQUARE = { width: 4167, height: 4167 };
const BANNER = { width: 3547, height: 1463 };

/** Every piece in the grid, in page order — also the viewer's order. */
const ARTWORKS = {
  piyaTu: {
    src: `${DIR}/Piya tu_square artwork.jpg`,
    alt: "Piya Tu cover — a ring of film stills around a golden birdcage on an orange dotted field",
    ...SQUARE,
  },
  laila: {
    src: `${DIR}/Laila_square artwork_madstarbase.jpg`,
    alt: "Laila cover — a ring of film stills around a disco ball on a pale blue pattern",
    ...SQUARE,
  },
  mehbooba: {
    src: `${DIR}/Mehbooba_Madstarbase art file.png`,
    alt: "Mehbooba Mehbooba cover — a ring of film stills around a tambourine on a magenta pattern",
    ...SQUARE,
  },
  churaKeDil: {
    src: `${DIR}/Chura ke Dil ke mera-03.jpg`,
    alt: "Chura Ke Dil Mera banner — a palm tree inside a kaleidoscope of film stills, beside the MadStarBase wordmark on a purple squiggle pattern",
    width: 1708,
    height: 650,
  },
  aapJaisaKoi: {
    src: `${DIR}/aap jaisa koi-01.jpg`,
    alt: "Aap Jaisa Koi cover — a film star cut out against pink bougainvillea in a yellow frame",
    ...SQUARE,
  },
  husnHaiSuhana: {
    src: `${DIR}/Husn hai suhana-ig-01.jpg`,
    alt: "Husn Hai Suhana cover — a film star cut out against orange daisies in a white frame",
    ...SQUARE,
  },
  jimmyJimmy: {
    src: `${DIR}/jimmy jimmy-ig.jpg`,
    alt: "Jimmy Jimmy cover — a film star cut out against pale chrysanthemums in a maroon frame",
    ...SQUARE,
  },
  wadaKaro: {
    src: `${DIR}/Wada karo-IG sq.jpg`,
    alt: "Wada Karo cover — a film star cut out against purple crocuses in a lilac frame",
    ...SQUARE,
  },
  // Mollywood 2.0
  dumMaaroDum: {
    src: `${DIR}/dum maaro dum-fb cover.jpg`,
    alt: "Dum Maaro Dum banner — a film star cut out beside the MadStarBase wordmark over red marigolds, with parrots in a peach frame",
    ...BANNER,
  },
  wadaKaroBanner: {
    src: `${DIR}/Wada karo-FB cover.jpg`,
    alt: "Wada Karo banner — a film star cut out beside the MadStarBase wordmark over purple crocuses in a lilac frame",
    ...BANNER,
  },
  saatSamundar: {
    src: `${DIR}/saat samundar-03.jpg`,
    alt: "Saat Samundar cover — a film star cut out against pink dahlias in a plum frame",
    ...SQUARE,
  },
} satisfies Record<string, Artwork>;

type ArtworkKey = keyof typeof ARTWORKS;

const ORDER = Object.keys(ARTWORKS) as ArtworkKey[];
const ARTWORK_LIST: Artwork[] = ORDER.map((key) => ARTWORKS[key]);

/** Where the artwork turned up: stories, press and posts, left to right. */
const PRESS: Artwork[] = [
  {
    src: `${DIR}/Asset 17@4x.webp`,
    alt: "Sonam Kapoor's Instagram story sharing the Mehbooba Mehbooba cover, tagging @madstarbase",
    width: 420,
    height: 885,
  },
  {
    src: `${DIR}/Asset 13@4x.webp`,
    alt: "Sonam Kapoor's Instagram story sharing the Wada Karo cover, tagging @madstarbase",
    width: 481,
    height: 887,
  },
  {
    src: `${DIR}/Asset 15@4x.webp`,
    alt: "A Humming Heart feature, “What independent music visuals do designers dig?”, opening on a collage of album art",
    width: 378,
    height: 893,
  },
  {
    src: `${DIR}/Asset 16@4x.webp`,
    alt: "A Humming Heart feature showing nine MadStarBase Mollywood covers, credited to Riti Wig",
    width: 448,
    height: 873,
  },
  {
    src: `${DIR}/Asset 14@4x.webp`,
    alt: "Wedwise Instagram post of the Kawaan Kawaan cover, crediting the artwork to @someofriti",
    width: 430,
    height: 885,
  },
];

/** One clickable piece of the grid, revealed on scroll. */
function Piece({
  id,
  delay = 0,
  sizes = "(min-width: 640px) 33vw, 50vw",
  className,
}: {
  id: ArtworkKey;
  delay?: number;
  sizes?: string;
  className?: string;
}) {
  const { src, alt, width, height } = ARTWORKS[id];

  return (
    <Reveal delay={delay} className={className}>
      <ArtworkButton index={ORDER.indexOf(id)} label={alt}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className="h-auto w-full"
        />
      </ArtworkButton>
    </Reveal>
  );
}

export default function MadStarBasePage() {
  return (
    <>
      <ProjectSubHero project={project} />

      <ProjectIntro>
        <p>
          MadStarBase, the DJ duo Ace and Neal, approached me after I won their
          open competition for album branding. What began as a one-off cover
          design evolved into a full visual system for Mollywood 1.0, later
          extending into Mollywood 2.0.
        </p>
        <ColumnBreak />
        <p>
          The music draws from hip-hop, bass, and sample-heavy reinterpretations
          of indigenous and Bollywood soundscapes. The visual language needed to
          reflect that same energy — nostalgic yet irreverent, rooted yet
          remixable.
        </p>
      </ProjectIntro>

      {/* Everything below is bespoke to this project: any layout, any markup. */}

      {/* One viewer for every artwork on the page, so its arrows step through
          Mollywood 1.0 and 2.0 alike. */}
      <ArtworkViewer artworks={ARTWORK_LIST}>
        <section className="text-brand-ivory bg-black">
          <div className="page-container pt-18 pb-30 sm:pt-24 sm:pb-42 lg:pt-36 lg:pb-60">
            <h2 className="sr-only">MadStarBase — single and album artwork</h2>

            {/* Three square covers, the wide banner under them, two more
                squares in the first two columns, then a note beside the last
                two squares. */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-x-[5%] sm:gap-y-12 lg:gap-y-16">
              <Piece id="piyaTu" />
              <Piece id="laila" delay={REVEAL.stagger} />
              <Piece id="mehbooba" delay={REVEAL.stagger * 2} />

              <Piece id="churaKeDil" sizes="100vw" className="col-span-full" />

              <Piece id="aapJaisaKoi" />
              <Piece id="husnHaiSuhana" delay={REVEAL.stagger} />

              {/* Same four lines on every screen: the breaks are fixed and the
                  type is sized to the column (cqi), so it scales as one block. */}
              <Reveal className="@container flex items-center sm:col-start-1">
                <p className="font-ivy-ora text-[15.1cqi] leading-[1.03] font-light whitespace-nowrap">
                  Artworks are
                  <br />
                  clickable, for mid
                  <br />
                  portfolio viewing
                  <br />
                  party.
                </p>
              </Reveal>
              <Piece id="jimmyJimmy" delay={REVEAL.stagger} />
              <Piece id="wadaKaro" delay={REVEAL.stagger * 2} />
            </div>
          </div>
        </section>

        <section className="text-brand-ivory bg-black">
          <div className="page-container @container pb-30 sm:pb-42 lg:pb-60">
            {/* Sized to the container (cqi) so badge and heading keep their
              proportions; on phones both grow so the heading still fits one line. */}
            <div className="flex items-end justify-between gap-4">
              <Reveal className="w-[22cqi] shrink-0 sm:w-[14cqi]">
                <Image
                  src={`${DIR}/Asset 12@4x.webp`}
                  alt=""
                  width={330}
                  height={330}
                  sizes="(min-width: 640px) 14vw, 22vw"
                  className="h-auto w-full transition-transform duration-500 ease-[cubic-bezier(0.165,0.84,0.44,1)] motion-safe:hover:-rotate-8"
                />
              </Reveal>
              <Reveal delay={REVEAL.stagger}>
                <h2 className="text-[10.5cqi] leading-none font-light whitespace-nowrap sm:text-[5.4cqi]">
                  Moment(s) of fame.
                </h2>
              </Reveal>
            </div>

            {/* Each shot grows in proportion to its aspect ratio, so the row
              shares one height and fills the width exactly. Phones scroll
              the row sideways instead of shrinking it to thumbnails. */}
            <ul className="-mx-(--page-gutter) mt-10 flex gap-3 overflow-x-auto px-(--page-gutter) sm:mx-0 sm:mt-14 sm:gap-[1.8%] sm:overflow-visible sm:px-0">
              {PRESS.map((shot, index) => (
                <li
                  key={shot.src}
                  className="aspect-(--ar) h-[24rem] flex-none sm:h-auto sm:flex-[var(--ar)_1_0%]"
                  style={
                    { "--ar": shot.width / shot.height } as React.CSSProperties
                  }
                >
                  <Reveal delay={REVEAL.stagger * index} className="size-full">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes="(min-width: 640px) 20vw, 12rem"
                      className="size-full object-cover"
                    />
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="text-brand-ivory bg-black">
          <div className="page-container pb-30 sm:pb-42 lg:pb-60">
            <h2 className="sr-only">Mollywood 2.0</h2>

            {/* Same body type as the page intro. */}
            <Reveal>
              <p className="w-full text-[1rem] leading-[1.8] tracking-[0.04em] text-pretty sm:text-[1.05rem] lg:text-[1.15rem] xl:text-[1.25rem]">
                Following the success of the first release, Mollywood 2.0
                expanded the visual language, increasing density, colour
                intensity, and compositional play while retaining recognisable
                motifs. The system evolved without losing continuity, allowing
                the identity to grow organically with the music.
              </p>
            </Reveal>

            <div className="mt-18 flex flex-col gap-6 sm:mt-24 sm:gap-10 lg:mt-30 lg:gap-12">
              <Piece id="dumMaaroDum" sizes="100vw" />
              <Piece id="wadaKaroBanner" sizes="100vw" />
            </div>
          </div>
        </section>

        <section className="text-brand-ivory bg-black">
          <div className="page-container pb-30 sm:pb-42 lg:pb-60">
            <h2 className="sr-only">Reflection</h2>

            {/* Cover on the left, closing note beside it, centred against it. */}
            <div className="grid items-center gap-y-10 sm:grid-cols-[30%_minmax(0,1fr)] sm:gap-x-[5%]">
              <Piece
                id="saatSamundar"
                sizes="(min-width: 640px) 30vw, 100vw"
                className="mx-auto w-full max-w-[24rem] sm:max-w-none"
              />
              <Reveal delay={REVEAL.stagger}>
                <div className="text-[1rem] leading-[1.65] tracking-[0.04em] text-pretty lg:text-[1.05rem] xl:text-[1.15rem] [&>p+p]:mt-[1.4em]">
                  <p>
                    For me, this project was an exercise in controlled chaos.
                    The visual language was deliberately fluid, allowing
                    imagery, colour, texture and composition to shift with the
                    personality of each track.
                  </p>
                  <p>
                    Rather than imposing a rigid system, I wanted to create one
                    that encouraged experimentation, where every artwork could
                    stand on its own while unmistakably belonging to the same
                    world. It was an opportunity to let instinct and playfulness
                    lead the design, without losing the discipline that holds it
                    all together.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </ArtworkViewer>

      <NextProject slug={project.slug} />
    </>
  );
}
