import Link from "next/link";

import { PROJECTS } from "@/lib/projects";
import { AUTHOR_NAME, AUTHOR_ROLE, LOCATION, SOCIALS } from "@/lib/site";

const pageLinks = [
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Who is this?", href: "/about" },
  { label: "Hire", href: "/#hire" },
];

const headingClass =
  "mb-5 text-[0.72rem] font-medium tracking-[0.2em] text-[#f5f1ea]/45 uppercase";

const linkClass =
  "inline-block text-[#f5f1ea]/80 transition-colors duration-200 hover:text-[#f5f1ea]";

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
        <div className="grid gap-y-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-x-8">
          <div className="lg:col-span-4">
            <p className="font-ivy-ora text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-light italic">
              {AUTHOR_NAME}
            </p>
            <p className="mt-3 max-w-[18rem] text-[0.95rem] leading-[1.6] text-[#f5f1ea]/60">
              {AUTHOR_ROLE}, based in {LOCATION}.
            </p>
          </div>

          <nav aria-label="Projects" className="lg:col-span-4">
            <p className={headingClass}>Projects</p>
            <ul className="space-y-2.5 text-[0.95rem]">
              {PROJECTS.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className={linkClass}>
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer" className="lg:col-span-2">
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

          <div className="lg:col-span-2">
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
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-[#f5f1ea]/10 pt-8 text-[0.72rem] font-medium tracking-[0.2em] text-[#f5f1ea]/60 uppercase sm:flex-row sm:items-center sm:justify-between lg:mt-24">
          <p>
            © {year} {AUTHOR_NAME}
          </p>
          <p>{LOCATION}</p>
          <a
            href="#"
            className="self-start transition-colors duration-200 hover:text-[#f5f1ea] sm:self-auto"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
