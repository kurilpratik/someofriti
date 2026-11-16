import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import ProjectsAtAGlance from "@/components/ProjectsAtAGlance";
import { PROJECTS } from "@/lib/projects";
import {
  AUTHOR_NAME,
  AUTHOR_ROLE,
  SHARE_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

/**
 * Structured data: tells search engines who the site belongs to, what she does
 * and where she works, so the portfolio can surface as a knowledge panel.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}${SHARE_IMAGE.url}`,
  jobTitle: AUTHOR_ROLE,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressRegion: "Delhi",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Brand identity",
    "Visual systems",
    "Illustration",
    "Art direction",
    "Exhibition design",
    "Campaign design",
    "Editorial design",
  ],
  worksFor: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en-IN",
  author: { "@type": "Person", name: AUTHOR_NAME },
  hasPart: PROJECTS.map((project) => ({
    "@type": "CreativeWork",
    name: project.title,
    url: `${SITE_URL}/projects/${project.slug}`,
    ...(project.year ? { dateCreated: String(project.year) } : {}),
    creator: { "@type": "Person", name: AUTHOR_NAME },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([personJsonLd, websiteJsonLd]).replace(
            /</g,
            "\u003c",
          ),
        }}
      />
      <Preloader />
      <Hero />
      <Navbar />
      <ProjectsAtAGlance />
    </>
  );
}
