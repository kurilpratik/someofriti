import type { ReactNode } from "react";

/**
 * One continuous block of copy that sits straight under the sub-hero. It spans
 * the same container as the navbar, so the text lines up with the logo on the
 * left and the last nav link on the right. On large screens it splits into two
 * balanced columns; below that it is a single column.
 *
 * Pass the copy as children — one or more `<p>`s.
 */
export default function ProjectIntro({ children }: { children: ReactNode }) {
  return (
    <section className="text-brand-ivory bg-black">
      <div className="page-container pt-12 pb-16 sm:pt-14 sm:pb-24">
        <div className="text-[1rem] leading-[1.8] tracking-[0.04em] text-pretty sm:text-[1.05rem] lg:columns-2 lg:gap-x-16 lg:text-[1.15rem] xl:text-[1.25rem] [&_p+p]:mt-[1.8em]">
          {children}
        </div>
      </div>
    </section>
  );
}
