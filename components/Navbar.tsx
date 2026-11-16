"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import NavHeightSync from "@/components/NavHeightSync";

const navItems = [
  { label: "Projects", href: "/#projects" },
  { label: "Connect", href: "/#connect" },
  { label: "Hire", href: "/#hire" },
  { label: "Who is this?", href: "/#about" },
];

const MENU_ID = "mobile-nav-menu";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close on Escape, and whenever the viewport grows past the mobile
  // breakpoint so the panel can't stay open behind the desktop links.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const desktop = window.matchMedia("(min-width: 48rem)");
    const onBreakpointChange = () => {
      if (desktop.matches) setIsMenuOpen(false);
    };

    onBreakpointChange();
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpointChange);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, [isMenuOpen]);

  return (
    <header
      data-site-header
      className="text-brand-ivory sticky top-0 z-50 w-full bg-black"
    >
      <NavHeightSync />
      <nav
        aria-label="Main navigation"
        className="page-container flex items-center justify-between gap-6 py-6"
      >
        <Link
          href="/"
          aria-label="Home"
          onClick={() => setIsMenuOpen(false)}
          className="inline-flex items-center"
        >
          <Image
            src="/images/logo/someofriti-logo.png"
            alt="someofriti logo"
            width={260}
            height={80}
            priority
            className="h-auto w-[120px] sm:w-[150px] lg:w-[160px]"
          />
        </Link>

        <ul className="hidden items-center gap-5 text-[0.78rem] font-medium tracking-[0.2em] text-[#f5f1ea]/85 uppercase sm:gap-8 md:flex md:text-[0.9rem]">
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

        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls={MENU_ID}
          onClick={() => setIsMenuOpen((open) => !open)}
          className="-mr-2 inline-flex h-10 w-10 flex-col items-center justify-center gap-[7px] p-2 md:hidden"
        >
          <span
            aria-hidden
            className={`bg-brand-ivory block h-px w-6 origin-center transition-transform duration-300 ease-out motion-reduce:transition-none ${
              isMenuOpen ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            aria-hidden
            className={`bg-brand-ivory block h-px w-6 origin-center transition-transform duration-300 ease-out motion-reduce:transition-none ${
              isMenuOpen ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/*
        Slide-down panel. It sits absolutely under the nav so the sticky
        header keeps its height (and `--nav-height` stays correct) while open.
        The 0fr -> 1fr grid row is what animates the auto height.
      */}
      <div
        id={MENU_ID}
        inert={!isMenuOpen}
        className={`absolute inset-x-0 top-full grid overflow-hidden bg-black transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          isMenuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "pointer-events-none grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul className="page-container min-h-0 space-y-4 overflow-hidden pt-2 pb-6 text-[0.8rem] font-medium tracking-[0.2em] text-[#f5f1ea]/85 uppercase">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={(event) => {
                  handleSmoothAnchorClick(event, item.href);
                  setIsMenuOpen(false);
                }}
                className="inline-block transition-opacity duration-200 hover:opacity-100"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
