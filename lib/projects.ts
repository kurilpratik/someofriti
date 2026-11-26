/**
 * `position` is a CSS object-position, e.g. "50% 40%". Use it to choose which part
 * of the cover stays in view when it is cropped to the banner.
 */
/**
 * Phone-only framing (below the `sm` breakpoint). `aspect` is the banner's
 * width/height there, e.g. "2/1" (default "3/2"); `position` replaces the
 * cover's own `position`. Use it to crop away something that should only show
 * on wide screens, such as text burned into the artwork.
 */
export type ProjectCoverMobile = { aspect?: string; position?: string };

/** One side of a `split` cover. */
export type ProjectCoverHalf = {
  type: "image" | "video";
  src: string;
  alt: string;
  position?: string;
};

export type ProjectCover =
  | {
      /**
       * Two media side by side, each filling half the banner — e.g. a still
       * on the left and a looping video on the right.
       */
      type: "split";
      left: ProjectCoverHalf;
      right: ProjectCoverHalf;
      mobile?: Pick<ProjectCoverMobile, "aspect">;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      position?: string;
      mobile?: ProjectCoverMobile;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      alt: string;
      position?: string;
      mobile?: ProjectCoverMobile;
      /**
       * Play the cover with its audio. Browsers only allow that once the viewer
       * has engaged with the site, so the cover starts silent, asks for sound,
       * and carries a toggle either way — see components/project/CoverVideo.tsx.
       */
      sound?: boolean;
    };

export type ProjectSummary = {
  slug: string;
  title: string;
  /** Short description, also used as the image alt text. */
  alt: string;
  /** Image shown in "Projects at a glance". */
  src: string;
  /**
   * Set when `src` is a video file, so the glance tile renders a looping
   * `<video>` instead of an `<Image>`.
   */
  srcType?: "video";
  /** Sub-hero details. Anything left out is simply not rendered. */
  client?: string;
  /** Year the work was done. */
  year?: number | string;
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
      // The artist's name is burned into the bottom of the video. Phones show
      // the cover at the video's own 3:2 shape, so nothing would be cropped:
      // a wider frame pinned to the top cuts the name off. The text starts 75%
      // down the frame; 21:10 pinned at the top shows only the top ~71%.
      mobile: { aspect: "21/10", position: "50% 0%" },
    },
  },
  {
    slug: "bira-netflix",
    title: "Bira + Netflix",
    alt: "Stranger Things character illustration",
    src: "/images/projects/netflix/Asset 1@4x.webp",
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
    slug: "regalium",
    title: "Regalium",
    alt: "Regalium — leather bags film",
    src: "/images/glance/regalium.mp4",
    srcType: "video",
    // TODO: client / work types / year were copied from a reference screenshot
    // of another project — replace with the real Regalium details.
    client: "Regalium",
    year: "2024-25",
    workTypes: ["Branding", "Identity", "print"],
    cover: {
      type: "image",
      src: "/images/projects/regalium/regalium-cover-img.jpg",
      alt: "Regalium — leather bags film",
      position: "50% 50%",
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
      src: "/images/projects/sbac/sbac-hero-video.mp4",
      poster: "/images/projects/sbac/sbac-cover-img.png",
      alt: "Molten lava flowing between cracks in dark volcanic rock",
      position: "50% 50%",
      sound: true,
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
      // A wide banner: the default 3:2 phone frame would cut off both sides,
      // so phones show it at its own shape, uncropped.
      mobile: { aspect: "2567/958" },
    },
  },
  {
    slug: "xarpie",
    title: "Xarpie",
    alt: "Xarpie AI solutions book cover",
    src: "/images/glance/Asset 10@4x.webp",
  },
  {
    slug: "tanabana",
    title: "Saad Qureshi — Tanabana",
    alt: "Saad Qureshi — Tanabana exhibition poster",
    src: "/images/glance/Asset 12@4x.webp",
  },
  {
    slug: "wallis",
    title: "Wallis",
    alt: "Wallis identity — business cards held in hand",
    src: "/images/glance/Asset 6@4x.webp",
    client: "Wallis",
    year: "2024-25",
    workTypes: ["Branding", "Identity", "print"],
    cover: {
      type: "split",
      left: {
        type: "image",
        src: "/images/projects/wallis/wallis-header-w.webp",
        alt: "Wallis W monogram on a patterned white field",
      },
      right: {
        type: "video",
        src: "/images/projects/wallis/wallis header half.mp4",
        alt: "The wallis wordmark animating on its construction grid",
      },
      mobile: { aspect: "2563/962" },
    },
  },
  {
    slug: "madstarbase",
    title: "MadStarBase",
    alt: "MadStarBase wordmark beside the DJ duo on a basketball court, ringed by UFOs and rainbow trails",
    src: "/images/projects/madstar/madstar-hero.webp",
    client: "MadStarBase",
    year: "2024-25",
    workTypes: ["Branding", "Identity", "print"],
    cover: {
      type: "image",
      src: "/images/projects/madstar/madstar-hero.webp",
      alt: "MadStarBase wordmark beside the DJ duo on a basketball court, ringed by UFOs and rainbow trails",
      position: "50% 50%",
      // A wide banner: phones show it at its own shape, uncropped.
      mobile: { aspect: "2562/959" },
    },
  },
  {
    slug: "markers-of-time-and-space",
    title: "Markers of Time & Space",
    alt: "Markers of Time and Space — textile artwork",
    src: "/images/glance/Asset 11@4x.webp",
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
