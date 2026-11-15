"use client";

import { useEffect } from "react";

/**
 * Keeps `--nav-height` equal to the navbar's real height, so the scroll offset
 * in globals.css stays exact even when the nav links wrap on narrow screens.
 * The CSS values there are the fallback until this runs.
 */
export default function NavHeightSync() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");

    if (!header) return;

    const root = document.documentElement;
    const update = () =>
      root.style.setProperty("--nav-height", `${header.offsetHeight}px`);

    update();

    const observer = new ResizeObserver(update);

    observer.observe(header);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--nav-height");
    };
  }, []);

  return null;
}
