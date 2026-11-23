import type { Metadata } from "next";

import PatternGenerator from "@/components/pattern-generator/PatternGenerator";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Playtime",
  description:
    "Playtime: the generative pattern behind the someofriti intro, handed over to you. Push the sliders, shuffle the colours, and export what you make.",
  path: "/playtime",
});

export default function PlaytimePage() {
  return <PatternGenerator />;
}
