import type { Metadata, Viewport } from "next";

import {
  AUTHOR_NAME,
  SHARE_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

import MediaCursor from "@/components/MediaCursor";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // Child pages set a bare title, e.g. "Nature Morte" -> "Nature Morte | someofriti".
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  category: "design",
  keywords: [
    "Riti Wig",
    "someofriti",
    "senior graphic designer",
    "graphic designer Delhi",
    "graphic designer New Delhi",
    "illustrator India",
    "brand identity designer",
    "visual identity",
    "art direction",
    "exhibition design",
    "campaign design",
    "design portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_IN",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  // Matches the body background, so mobile browser chrome blends in.
  themeColor: "#f1f5f9",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
    >
      <head>
        {/* Adobe Fonts kit: Degular ("degular-variable", 200-800) and Ivy Ora ("ivyora-display", 100-700, upright + italic). */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="" />
        <link rel="stylesheet" href="https://use.typekit.net/exs8xre.css" />
      </head>
      <body className="flex min-h-full flex-col bg-slate-100 text-slate-900">
        {children}
        <MediaCursor />
      </body>
    </html>
  );
}
