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
import StarryBackground from "@/components/ui/StarryBackground";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#060708] text-white selection:bg-sky-500 selection:text-white">
      <StarryBackground />
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
