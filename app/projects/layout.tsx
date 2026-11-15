import type { ReactNode } from "react";

import Navbar from "@/components/Navbar";

/** Wraps every page under /projects, so individual pages don't repeat the nav. */
export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="bg-black">{children}</main>
    </>
  );
}
