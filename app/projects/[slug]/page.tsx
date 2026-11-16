import type { Metadata } from "next";
import { notFound } from "next/navigation";

import NextProject from "@/components/project/NextProject";
import ProjectSubHero from "@/components/project/ProjectSubHero";
import { getProject, PROJECTS } from "@/lib/projects";
import { AUTHOR_NAME, pageMetadata } from "@/lib/site";

/**
 * Fallback for projects that don't have a hand-coded page yet. To build one,
 * create app/projects/<slug>/page.tsx — a static folder wins over this route.
 * See app/projects/bangalore-art-weekend/page.tsx for the pattern.
 */

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project" };

  // No bespoke page yet, so the description is built from what lib/projects.ts knows.
  const work = project.workTypes?.length
    ? `${project.workTypes.join(", ")}.`
    : "";
  const description = [
    `${project.title}${project.client ? ` for ${project.client}` : ""}${
      project.year ? `, ${project.year}` : ""
    } — ${project.alt}.`,
    work,
    `Design by ${AUTHOR_NAME}.`,
  ]
    .filter(Boolean)
    .join(" ");

  return pageMetadata({
    title: project.title,
    description,
    path: `/projects/${project.slug}`,
    type: "article",
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <>
      <ProjectSubHero project={project} />
      <NextProject slug={project.slug} />
    </>
  );
}
