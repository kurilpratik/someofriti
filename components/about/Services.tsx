import Link from "next/link";

import Reveal from "@/components/motion/Reveal";
import { REVEAL } from "@/components/motion/config";

const SERVICES = [
  {
    title: "Logo Design",
    description:
      "A mark that holds up at every size, from a favicon to a storefront. Built from the brand’s idea outward, with the wordmark, symbol and lockups that let it travel.",
  },
  {
    title: "Brand Identity",
    description:
      "The full system: purpose and positioning, type, colour, image direction and the rules that hold them together, so the brand reads the same wherever it shows up.",
  },
  {
    title: "Packaging",
    description:
      "Structure, labels and finishes that work on a crowded shelf and in someone’s hands. Designed with print and production in mind from the first sketch.",
  },
  {
    title: "Website Design",
    description:
      "Sites that carry the identity onto the screen: layout, type, motion and the small interactions, designed to be built and easy to keep up to date.",
  },
];

/**
 * The services list under the /about intro. The nav and footer "Services"
 * links land here (`/about#services`), and `scroll-padding-top` in
 * globals.css keeps the heading clear of the sticky nav.
 *
 * The rows share the intro copy's left offset on large screens, so the two
 * sections line up as one column under the "Hello.".
 */
export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="text-brand-ivory bg-black"
    >
      <div className="page-container border-t border-[#f5f1ea]/10 pt-16 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
        <h2
          id="services-heading"
          className="font-ivy-ora text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] font-normal italic"
        >
          Services.
        </h2>

        <ol className="mt-10 lg:mt-14 lg:ml-[22%]">
          {SERVICES.map((service, index) => (
            <li key={service.title}>
              <Reveal
                delay={index * REVEAL.stagger}
                distance={40}
                className="grid gap-x-12 gap-y-3 border-t border-[#f5f1ea]/15 py-8 sm:grid-cols-[3rem_minmax(0,1fr)] lg:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-x-14 lg:py-10 xl:gap-x-20"
              >
                <span className="pt-1 text-[0.72rem] font-medium tracking-[0.2em] text-[#f5f1ea]/45 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-ivy-ora text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] font-light italic">
                  {service.title}
                </h3>
                <p className="body-copy text-[0.95rem] text-pretty text-[#f5f1ea]/75 sm:col-start-2 sm:text-[1rem] lg:col-start-3 lg:text-[1.05rem]">
                  {service.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-4 border-t border-[#f5f1ea]/15 pt-10 lg:ml-[22%]">
          {/* Same hand-drawn red ring as the Hero buttons, drawn around the
              label (like the footer email) so the text keeps the column's
              left edge instead of being centred in a fixed-size box. */}
          <Link
            href="/hire"
            className="group relative inline-block border-b border-[#f5f1ea]/30 pb-0.5 text-[0.8rem] font-medium tracking-[0.18em] text-[#f5f1ea]/85 uppercase transition-colors duration-200 hover:border-transparent hover:text-[#f5f1ea] focus-visible:border-transparent focus-visible:text-[#f5f1ea] active:border-transparent active:text-[#f5f1ea]"
          >
            <svg
              viewBox="0 0 240 76"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="text-brand-red pointer-events-none absolute -inset-x-7 -inset-y-5 h-[calc(100%+2.5rem)] w-[calc(100%+3.5rem)] overflow-visible opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <ellipse
                cx="120"
                cy="36"
                rx="117"
                ry="35"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M62 69c35 1 71 3 112 8"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <span className="relative">Start a project →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
