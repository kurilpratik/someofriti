import type { Metadata } from "next";

import AboutIntro from "@/components/about/AboutIntro";
import Navbar from "@/components/Navbar";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Who is this?",
  description:
    "Riti Wig is a senior designer in New Delhi working across identity, systems, and brand storytelling — a practice spanning luxury, hospitality, FMCG, culture, technology, and the arts.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <AboutIntro />
    </>
  );
}
