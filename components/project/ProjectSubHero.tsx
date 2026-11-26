import Image from "next/image";

import CoverScrollAway from "@/components/motion/CoverScrollAway";
import CoverVideo from "@/components/project/CoverVideo";
import type { ProjectCoverMobile, ProjectSummary } from "@/lib/projects";

/** Reads the framing variables set on the cover box below. */
const COVER_POSITION = "object-(--cover-pos-mobile) sm:object-(--cover-pos)";

const LABEL =
  "text-[0.8125rem] leading-[1.2] font-light tracking-[0.08em] uppercase sm:text-[0.875rem]";

function Detail({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className={LABEL}>{label}</dt>
      <dd className="font-ivy-ora mt-6 max-w-[14em] text-[1.4rem] leading-[1.2] font-normal tracking-[-0.021em] text-balance italic sm:text-[1.7rem] lg:text-[2rem]">
        {children}
      </dd>
    </div>
  );
}

/**
 * Shared by every project page: client / work type / year, then the full-bleed
 * cover. Pass the project from `lib/projects.ts`.
 */
export default function ProjectSubHero({
  project,
}: {
  project: ProjectSummary;
}) {
  const { title, client, year, workTypes, cover } = project;
  const media = cover ?? {
    type: "image" as const,
    src: project.src,
    alt: project.alt,
  };
  const position = ("position" in media && media.position) || "50% 50%";
  const mobile: ProjectCoverMobile | undefined =
    "mobile" in media ? media.mobile : undefined;

  return (
    <section className="text-brand-ivory bg-black">
      <div className="page-container pt-12 pb-10 sm:pt-20 sm:pb-14 lg:pt-24">
        {/* The visible details carry no page title, so give screen readers one. */}
        <h1 className="sr-only">{title}</h1>

        {/* Fixed columns, so a missing field leaves a gap instead of shifting the rest. */}
        <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-[30%_minmax(0,1fr)_auto] sm:gap-x-10">
          {client && (
            <Detail label="Client" className="sm:col-start-1">
              {client}
            </Detail>
          )}
          {workTypes && workTypes.length > 0 && (
            <Detail label="Work type" className="sm:col-start-2">
              {workTypes.join(", ")}
            </Detail>
          )}
          {year && (
            <div
              className={`${LABEL} text-muted-foreground order-first sm:order-none sm:col-start-3 sm:text-right`}
            >
              <dt className="inline">Worked in</dt>{" "}
              <dd className="inline">{year}</dd>
            </div>
          )}
        </dl>
      </div>

      {/* Framing goes through CSS variables so phones can use their own shape
          and position (`cover.mobile`); the media below reads them back.
          It sinks as it scrolls away, so the intro slides up over it. */}
      <CoverScrollAway
        className="relative aspect-(--cover-aspect) w-full overflow-hidden sm:aspect-[10/3]"
        style={
          {
            "--cover-aspect": mobile?.aspect ?? "3/2",
            "--cover-pos": position,
            "--cover-pos-mobile": mobile?.position ?? position,
          } as React.CSSProperties
        }
      >
        {media.type === "split" ? (
          <div className="absolute inset-0 grid grid-cols-2">
            {[media.left, media.right].map((half) => (
              <div key={half.src} className="relative overflow-hidden">
                {half.type === "video" ? (
                  <video
                    src={half.src}
                    aria-label={half.alt}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 size-full object-cover"
                    style={{ objectPosition: half.position }}
                  />
                ) : (
                  <Image
                    src={half.src}
                    alt={half.alt}
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover"
                    style={{ objectPosition: half.position }}
                  />
                )}
              </div>
            ))}
          </div>
        ) : media.type === "video" && media.sound ? (
          <CoverVideo
            src={media.src}
            poster={media.poster}
            alt={media.alt}
            className={COVER_POSITION}
          />
        ) : media.type === "video" ? (
          <video
            src={media.src}
            poster={media.poster}
            aria-label={media.alt}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 size-full object-cover ${COVER_POSITION}`}
          />
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority
            sizes="100vw"
            className={`object-cover ${COVER_POSITION}`}
          />
        )}
      </CoverScrollAway>
    </section>
  );
}
