"use client";

import About from "@/components/sections/About";
import ChatAgent from "@/components/sections/ChatAgent";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Process />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <ChatAgent />
    </div>
  );
}
