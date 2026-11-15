import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import ProjectsAtAGlance from "@/components/ProjectsAtAGlance";

export default function Home() {
  return (
    <>
      <Preloader />
      <Hero />
      <Navbar />
      <ProjectsAtAGlance />
    </>
  );
}
