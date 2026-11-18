import type { Metadata } from "next";

/**
 * Site-wide constants used by metadata, the sitemap and robots.txt.
 *
 * The domain isn't final yet: set NEXT_PUBLIC_SITE_URL in the deploy
 * environment (and .env.local) and every absolute URL follows.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://someofriti.com";

export const SITE_NAME = "someofriti";
export const AUTHOR_NAME = "Riti Wig";
export const AUTHOR_ROLE = "Senior Graphic Designer & Illustrator";
export const LOCATION = "New Delhi, India";

export const SITE_TITLE = `${SITE_NAME} - ${AUTHOR_NAME}, Senior Graphic Designer in New Delhi`;

export const SITE_DESCRIPTION =
  "Riti Wig is a senior graphic designer and illustrator in New Delhi — brand identity, campaigns, print and exhibition design for culture, luxury and lifestyle brands.";

/** The image social platforms show when a link to the site is shared. */
export const SHARE_IMAGE = {
  url: "/images/about.jpg",
  width: 1561,
  height: 692,
  alt: `${AUTHOR_NAME} — senior graphic designer and illustrator based in ${LOCATION}`,
} as const;

/**
 * Per-page metadata: title, description, canonical URL and matching
 * Open Graph / Twitter cards, all sharing the site's share image.
 *
 * `path` is the route, e.g. "/about" or "/projects/nature-morte".
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
