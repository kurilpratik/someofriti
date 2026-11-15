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

  return (
    <section className="text-brand-ivory bg-black">
      <div className="page-container py-20 sm:py-28">
        <Link
          href={`/projects/${next.slug}`}
          className="group focus-visible:outline-brand-primary block focus-visible:outline-2 focus-visible:outline-offset-8"
        >
          <p className="text-muted-foreground text-[0.72rem] font-medium tracking-[0.22em] uppercase">
            Next project
          </p>

          <div className="mt-5 flex items-end justify-between gap-6">
            <h2 className="text-[clamp(2.2rem,6vw,5rem)] leading-[1.05] font-light tracking-tight">
              {next.title}
            </h2>
            <span
              aria-hidden="true"
              className="text-brand-primary mb-2 text-3xl transition-transform duration-300 group-hover:translate-x-2 sm:text-5xl"
            >
              →
            </span>
          </div>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden sm:aspect-[21/8]">
            <Image
              src={media.src}
              alt={media.alt}
              fill
              sizes="(max-width: 1800px) 100vw, 1800px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              style={{ objectPosition: media.position }}
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
