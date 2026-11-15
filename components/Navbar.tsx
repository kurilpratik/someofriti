"use client";

import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Projects", href: "#projects" },
  { label: "Connect", href: "/#connect" },
  { label: "Hire", href: "/#hire" },
  { label: "Who is this?", href: "/#about" },
];

function handleSmoothAnchorClick(
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith("#")) return;

  const target = document.getElementById(href.slice(1));

  if (!target) return;

  event.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", href);
}

export default function Navbar() {
  return (
    <header className="text-brand-ivory sticky top-0 z-50 w-full bg-black">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-[1800px] items-center justify-between gap-6 px-6 py-6 sm:px-10 lg:px-14"
      >
        <Link href="/" aria-label="Home" className="inline-flex items-center">
          <Image
            src="/images/logo/someofriti-logo.png"
            alt="someofriti logo"
            width={260}
            height={80}
            priority
            className="h-auto w-[120px] sm:w-[150px] lg:w-[160px]"
          />
        </Link>

        <ul className="flex items-center gap-5 text-[0.78rem] font-medium tracking-[0.2em] text-[#f5f1ea]/85 uppercase sm:gap-8 md:text-[0.9rem]">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={(event) => handleSmoothAnchorClick(event, item.href)}
                className="inline-block transition-opacity duration-200 hover:opacity-100"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
