export type ProjectSummary = {
  slug: string;
  title: string;
  /** Short description, also used as the image alt text. */
  alt: string;
  src: string;
};

/**
 * Projects shown in "Projects at a glance". Each slug maps to /projects/[slug].
 * Titles are placeholders inferred from the artwork — swap for the real ones.
 */
export const PROJECTS: ProjectSummary[] = [
  {
    slug: "wallis",
    title: "Wallis",
    alt: "Wallis identity — business cards held in hand",
    src: "/images/glance/Asset 6@4x.webp",
  },
  {
    slug: "stranger-things",
    title: "Stranger Things",
    alt: "Stranger Things character illustration",
    src: "/images/glance/Asset 7@4x.webp",
  },
  {
    slug: "strange-attractors",
    title: "Strange Attractors",
    alt: "Strange Attractors exhibition poster for Bharti Kher",
    src: "/images/glance/Asset 13@4x.webp",
  },
  {
    slug: "sbac-law",
    title: "SBAC Law",
    alt: "SBAC Law printed stationery",
    src: "/images/glance/Asset 8@4x.webp",
  },
  {
    slug: "bangalore-art-weekend",
    title: "Bangalore Art Weekend",
    alt: "Bangalore Art Weekend booklet",
    src: "/images/glance/Asset 9@4x.webp",
  },
  {
    slug: "xarpie",
    title: "Xarpie",
    alt: "Xarpie AI solutions book cover",
    src: "/images/glance/Asset 10@4x.webp",
  },
  {
    slug: "markers-of-time-and-space",
    title: "Markers of Time & Space",
    alt: "Markers of Time and Space — textile artwork",
    src: "/images/glance/Asset 11@4x.webp",
  },
  {
    slug: "tanabana",
    title: "Saad Qureshi — Tanabana",
    alt: "Saad Qureshi — Tanabana exhibition poster",
    src: "/images/glance/Asset 12@4x.webp",
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
