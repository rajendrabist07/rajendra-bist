"use client";

import About from "@/components/sections/About";
import ChatAgent from "@/components/sections/ChatAgent";
import Experience from "@/components/sections/Experience";
import Credentials from "@/components/sections/Credentials";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PremiumBackground from "@/components/ui/PremiumBackground";
import FloatingAskAI from "@/components/ui/FloatingAskAI";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[--bg-primary] text-[--text-primary] selection:bg-[--accent-primary] selection:text-[#15110e]">
      <PremiumBackground />
      <FloatingAskAI />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Process />
        <Skills />
        <Projects />
        <Experience />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <ChatAgent />
    </div>
  );
}
