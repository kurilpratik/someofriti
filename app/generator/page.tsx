import type { Metadata } from "next";

import PatternGenerator from "@/components/pattern-generator/PatternGenerator";

// Internal design tool: keep it out of search results.
export const metadata: Metadata = {
  title: "Pattern Generator",
  robots: { index: false, follow: false },
};

export default function GeneratorPage() {
  return <PatternGenerator />;
}
