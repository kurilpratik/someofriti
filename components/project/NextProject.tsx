import Image from "next/image";
import Link from "next/link";

import { getNextProject } from "@/lib/projects";

/** Closes every project page by linking to the next one in `lib/projects.ts`. */
export default function NextProject({ slug }: { slug: string }) {
  const next = getNextProject(slug);
  const { cover } = next;

  // A video cover can't go in an <img>, so use its poster frame, and fall back to
  // the glance image when there isn't one.
  const stillSrc =
    cover?.type === "image"
      ? cover.src
      : cover?.type === "video" && cover.poster
        ? cover.poster
        : undefined;
  const media = stillSrc
    ? { src: stillSrc, alt: cover!.alt, position: cover!.position }
    : { src: next.src, alt: next.alt, position: undefined };

  // With no still anywhere — a video cover without a poster, over a video glance
  // tile — play the clip itself rather than feed an <img> an .mp4.
  const isVideo = !stillSrc && next.srcType === "video";

  return (
    // Stacked above the cover, which sinks beneath whatever follows it.
    <section className="text-brand-ivory relative z-10 bg-black">
      <div className="page-container py-30 sm:py-42">
        <Link
          href={`/projects/${next.slug}`}
          className="group focus-visible:outline-brand-primary block focus-visible:outline-2 focus-visible:outline-offset-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <div>
              <p className="text-muted-foreground text-[0.72rem] font-medium tracking-[0.22em] uppercase">
                Next project
              </p>

              <div className="mt-5">
                <h2 className="text-[clamp(1.8rem,4vw,3.4rem)] leading-[1.08] font-light tracking-tight">
                  {next.title}
                </h2>
              </div>
            </div>

            <div className="mt-8 flex items-start gap-4 sm:mt-0 sm:w-[40%] sm:shrink-0 sm:gap-6">
              <div className="relative aspect-[16/9] min-w-0 flex-1 overflow-hidden">
                {isVideo ? (
                  <video
                    src={media.src}
                    aria-label={media.alt}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ objectPosition: media.position }}
                  />
                ) : (
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ objectPosition: media.position }}
                  />
                )}
              </div>

              <span
                aria-hidden="true"
                className="text-brand-primary mt-1 shrink-0 text-3xl transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl"
              >
                →
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
