import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import DemosSection from "@/components/DemosSection";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main style={{ paddingTop: 60 }}>
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Experience />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <DemosSection />
        <div className="divider" />
        <Education />
        <Contact />
      </main>
    </>
  );
}
