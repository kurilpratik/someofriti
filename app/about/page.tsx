import type { Metadata } from "next";

import AboutIntro from "@/components/about/AboutIntro";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Who is this? | someofriti",
  description:
    "Riti Wig is a designer working across identity, systems, and brand storytelling, with a practice spanning luxury, hospitality, FMCG, culture, technology, and the arts.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutIntro />
    </>
  );
}
