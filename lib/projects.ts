/**
 * `position` is a CSS object-position, e.g. "50% 40%". Use it to choose which part
 * of the cover stays in view when it is cropped to the banner.
 */
export type ProjectCover =
  | { type: "image"; src: string; alt: string; position?: string }
  | {
      type: "video";
      src: string;
      poster?: string;
      alt: string;
      position?: string;
    };

export type ProjectSummary = {
  slug: string;
  title: string;
  /** Short description, also used as the image alt text. */
  alt: string;
  /** Image shown in "Projects at a glance". */
  src: string;
  /** Sub-hero details. Anything left out is simply not rendered. */
  client?: string;
  /** Year the work was done. */
  year?: number;
  workTypes?: string[];
  /** Full-bleed cover under the sub-hero. Falls back to the glance image. */
  cover?: ProjectCover;
};

/**
 * Every project, in the order shown in "Projects at a glance" and used for the
 * "Next project" link. Each slug maps to /projects/[slug].
 *
 * Titles are placeholders inferred from the artwork — swap for the real ones.
 * Add `client`, `year`, `workTypes` and `cover` as each page gets built.
 */
export const PROJECTS: ProjectSummary[] = [
  {
    slug: "wallis",
    title: "Wallis",
    alt: "Wallis identity — business cards held in hand",
    src: "/images/glance/Asset 6@4x.webp",
  },
  {
    slug: "bira-netflix",
    title: "Bira + Netflix",
    alt: "Stranger Things character illustration",
    src: "/images/glance/Asset 7@4x.webp",
    client: "Bira + Netflix",
    workTypes: ["Campaign", "Print", "Illustration", "Social Media"],
    year: 2021,
    cover: {
      type: "video",
      src: "/images/projects/netflix/bira+netflix.mp4",
      poster: "", // optional
      alt: "Nature Morte — Strange Attractors exhibition poster for Bharti Kher",
      position: "50% 50%",
    },
  },
  {
    slug: "nature-morte",
    title: "Nature Morte",
    alt: "Strange Attractors exhibition poster for Bharti Kher",
    src: "/images/glance/Asset 14@4x.jpg",
    client: "Nature Morte",
    year: 2021,
    workTypes: [
      "Ideation",
      "Coffee table Designs",
      "Marketing",
      "Exhibition Graphics",
    ],
    cover: {
      type: "video",
      src: "/images/projects/nature/nature-morte-video.mp4", // or a full https:// URL
      poster: "/images/projects/nature/nature-cover-img.webp", // optional
      alt: "Nature Morte — Strange Attractors exhibition poster for Bharti Kher",
      position: "50% 44%", // keeps the gold sphere vertically centred
    },
  },
  {
    slug: "sbac-law",
    title: "SBAC Law",
    alt: "SBAC Law printed stationery",
    src: "/images/glance/Asset 8@4x.webp",
    client: "SBAC Law",
    year: 2026,
    workTypes: ["Branding", "Identity", "Print"],
    cover: {
      type: "video",
      src: "/images/projects/sbac/sbac-video.mp4",
      poster: "/images/projects/sbac/sbac-cover-img.png",
      alt: "Molten lava flowing between cracks in dark volcanic rock",
      position: "50% 50%",
    },
  },
  {
    slug: "bangalore-art-weekend",
    title: "Bangalore Art Weekend",
    alt: "Bangalore Art Weekend booklet",
    src: "/images/glance/Asset 9@4x.webp",
    client: "Bangalore Art Weekend + Delhi Art Weekend",
    workTypes: ["Art Direction", "Design"],
    year: 2023,
    cover: {
      type: "image",
      src: "/images/projects/bangalore/bangalore-cover-img.webp",
      alt: "Bangalore Art Weekend booklet",
      position: "50% 50%",
    },
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

/** For hand-coded pages, where the slug is known to exist. */
export function requireProject(slug: string) {
  const project = getProject(slug);

  if (!project) throw new Error(`Unknown project slug: ${slug}`);

  return project;
}

/** The project after this one in the list, wrapping round to the first. */
export function getNextProject(slug: string) {
  const index = PROJECTS.findIndex((project) => project.slug === slug);

  return PROJECTS[(index + 1) % PROJECTS.length];
}
