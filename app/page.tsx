import dynamic from "next/dynamic";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import BlueprintBackground from "@/components/ui/BlueprintBackground";
import IntroSequence from "@/components/ui/IntroSequence";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingAskAI from "@/components/ui/FloatingAskAI";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";

const CommandPalette = dynamic(() => import("@/components/ui/CommandPalette"));
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Experience from "@/components/sections/Experience";
import Credentials from "@/components/sections/Credentials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import ChatAgent from "@/components/sections/ChatAgent";

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[--bg-void] text-[--text-primary]">
        {/* Top Viewport Scroll Progress Bar */}
        <ScrollProgress />

        {/* First visit session intro (≤900ms, real font readiness) */}
        <IntroSequence />

        {/* ⌘K Command Palette */}
        <CommandPalette />

        {/* Fixed Blueprint Grid Background */}
        <BlueprintBackground />

        {/* Navigation & Header */}
        <Navbar />

        {/* Floating Quick Comms */}
        <FloatingAskAI />

        {/* Main Content Sections */}
        <main id="main-content" className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Process />
          <Experience />
          <Credentials />
          <Contact />
        </main>

        {/* Telemetry Footer */}
        <Footer />

        {/* Gemini 2.5 AI Assistant Modal */}
        <ChatAgent />
      </div>
    </SmoothScrollProvider>
  );
}
