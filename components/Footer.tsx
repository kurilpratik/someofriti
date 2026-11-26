import Link from "next/link";

import { PROJECTS } from "@/lib/projects";
import {
  AUTHOR_NAME,
  AUTHOR_ROLE,
  CONTACT_EMAIL,
  LOCATION,
  SOCIALS,
} from "@/lib/site";

const pageLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Who is this?", href: "/about" },
  { label: "Hire", href: "/hire" },
  { label: "Playtime", href: "/playtime" },
];

const headingClass =
  "mb-5 text-[0.72rem] font-medium tracking-[0.2em] text-[#f5f1ea]/45 uppercase";

const linkClass =
  "inline-block text-[#f5f1ea]/80 transition-colors duration-200 hover:text-[#f5f1ea] focus-visible:text-[#f5f1ea] active:text-[#f5f1ea]";

// Cache Components rejects a bare `new Date()` during prerender; caching the
// year keeps the footer static while it still rolls over on revalidation.
async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="mt-auto w-full bg-black text-[#f5f1ea]">
      <div className="page-container border-t border-[#f5f1ea]/10 pt-16 pb-10 sm:pt-20 lg:pt-24">
        {/* On large screens the intro sits left and the three link columns are
            pushed to the right, so the last one ends on the container edge. */}
        <div className="grid gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-16">
          <div>
            <p className="font-ivy-ora text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-light italic">
              {AUTHOR_NAME}
            </p>
            <p className="mt-3 max-w-[18rem] text-[0.95rem] leading-[1.6] text-[#f5f1ea]/60">
              {AUTHOR_ROLE}, based in {LOCATION}.
            </p>
            {/* On hover the underline gives way to the same hand-drawn red
                ring as the Hero buttons (on touch screens, while it is
                tapped). The email is far wider than those buttons, so the
                ring stretches to fit (`preserveAspectRatio`) while the stroke
                keeps its weight (`non-scaling-stroke`). */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group relative mt-6 inline-block border-b border-[#f5f1ea]/30 pb-0.5 text-[0.95rem] text-[#f5f1ea]/80 transition-colors duration-200 hover:border-transparent hover:text-[#f5f1ea] focus-visible:border-transparent focus-visible:text-[#f5f1ea]"
            >
              <svg
                viewBox="0 0 240 76"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="text-brand-red pointer-events-none absolute -inset-x-6 -inset-y-4 h-[calc(100%+2rem)] w-[calc(100%+3rem)] overflow-visible opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
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
              <span className="relative">{CONTACT_EMAIL}</span>
            </a>
          </div>

          <div className="contents lg:flex lg:gap-x-24 xl:gap-x-32">
            <nav aria-label="Projects">
              <p className={headingClass}>Projects</p>
              <ul className="space-y-2.5 text-[0.95rem]">
                {PROJECTS.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      className={linkClass}
                    >
                      {project.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer">
              <p className={headingClass}>Pages</p>
              <ul className="space-y-2.5 text-[0.95rem]">
                {pageLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className={headingClass}>Socials</p>
              <ul className="space-y-2.5 text-[0.95rem]">
                {SOCIALS.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {social.label} ↗
                    </a>
                  </li>
                ))}
                <li>
                  <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                    Email ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[#f5f1ea]/10 pt-8 text-[0.72rem] font-medium tracking-[0.2em] text-[#f5f1ea]/60 uppercase sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p>
            © {year} {AUTHOR_NAME}
          </p>
          <p>{LOCATION}</p>
          <a
            href="#"
            className="self-start transition-colors duration-200 hover:text-[#f5f1ea] focus-visible:text-[#f5f1ea] active:text-[#f5f1ea] sm:self-auto"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
