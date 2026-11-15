import Image from "next/image";

import type { ProjectSummary } from "@/lib/projects";

const LABEL =
  "text-[0.75rem] font-medium tracking-[0.2em] uppercase sm:text-[0.8rem]";

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
      <dd className="font-ivy-ora mt-3 max-w-[14em] text-[1.4rem] leading-[1.2] font-light text-balance sm:text-[1.7rem] lg:text-[2rem]">
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

  return (
    <section className="text-brand-ivory bg-black">
      <div className="page-container pt-8 pb-10 sm:pt-12 sm:pb-14">
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

      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[8/3]">
        {media.type === "video" ? (
          <video
            src={media.src}
            poster={media.poster}
            aria-label={media.alt}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <Image
            src={media.src}
            alt={media.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>
    </section>
  );
}
