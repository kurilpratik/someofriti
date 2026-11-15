import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/Navbar";
import { getProject, PROJECTS } from "@/lib/projects";

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

  return { title: project ? `${project.title} | someofriti` : "Project" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="text-brand-ivory min-h-screen bg-black px-6 pt-10 pb-24 sm:px-10 lg:px-14">
        <div className="mx-auto w-full max-w-[1180px]">
          <Link
            href="/#projects"
            className="text-muted-foreground hover:text-brand-ivory text-[0.72rem] font-medium tracking-[0.22em] uppercase transition-colors"
          >
            ← Projects
          </Link>

          <h1 className="mt-8 text-[clamp(2.2rem,5vw,4rem)] leading-[1.05] font-light tracking-tight">
            {project.title}
          </h1>

          <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden">
            <Image
              src={project.src}
              alt={project.alt}
              fill
              priority
              sizes="(max-width: 1180px) 100vw, 1180px"
              className="object-contain"
            />
          </div>
        </div>
      </main>
    </>
  );
}
