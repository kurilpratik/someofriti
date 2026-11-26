import type { Metadata } from "next";

import Footer from "@/components/Footer";
import HireForm from "@/components/hire/HireForm";
import Navbar from "@/components/Navbar";
import Reveal from "@/components/motion/Reveal";
import { REVEAL } from "@/components/motion/config";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Hire",
  description:
    "Work with Riti Wig, a senior designer in New Delhi — brand identity, visual systems, illustration and art direction. Tell her about your project.",
  path: "/hire",
});

/**
 * /hire: a short heading, then the enquiry form written as a letter. Same
 * composition as /about — the heading sits on the container edge and the
 * letter starts indented from it on large screens.
 */
export default function HirePage() {
  return (
    <>
      <Navbar />
      <main className="text-brand-ivory min-h-[calc(100svh-var(--nav-height))] bg-black">
        <div className="page-container pt-8 pb-24 sm:pt-10 lg:pt-12 lg:pb-32">
          <Reveal>
            <h1 className="font-ivy-ora text-[clamp(2.25rem,5.5vw,5rem)] leading-[0.95] font-normal italic">
              Let’s talk.
            </h1>
          </Reveal>

          <Reveal delay={REVEAL.stagger} className="mt-10 lg:mt-14 lg:ml-[22%]">
            <HireForm />
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
