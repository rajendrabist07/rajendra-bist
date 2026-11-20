import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import BlueprintBackground from "@/components/ui/BlueprintBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/Footer";
import ClientModals from "@/components/providers/ClientModals";

const About = dynamic(() => import("@/components/sections/About"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const Skills = dynamic(() => import("@/components/sections/Skills"));
const Experience = dynamic(() => import("@/components/sections/Experience"));
const Credentials = dynamic(() => import("@/components/sections/Credentials"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[--bg-page] text-[--text-primary] overflow-x-clip">
        {/* Top Viewport Scroll Progress Bar */}
        <ScrollProgress />

        {/* Fixed Blueprint Grid Background */}
        <BlueprintBackground />

        {/* Navigation & Header */}
        <Navbar />

        {/* Main Content Sections */}
        <main id="main-content" className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Credentials />
          <Contact />
        </main>

        {/* Telemetry Footer */}
        <Footer />

        {/* Client Interactive Modals (Command Palette, Floating Quick Comms, Chat Agent) */}
        <ClientModals />
      </div>
    </SmoothScrollProvider>
  );
}
