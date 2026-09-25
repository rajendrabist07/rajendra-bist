'use client';

import React from 'react';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import BootSequence from '@/components/ui/BootSequence';
import CustomCursor from '@/components/ui/CustomCursor';
import CommandPalette from '@/components/ui/CommandPalette';
import PremiumBackground from '@/components/ui/PremiumBackground';
import FloatingAskAI from '@/components/ui/FloatingAskAI';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Process from '@/components/sections/Process';
import Experience from '@/components/sections/Experience';
import Credentials from '@/components/sections/Credentials';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';
import ChatAgent from '@/components/sections/ChatAgent';

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[--bg-void] text-[--text-primary] selection:bg-[--accent-warm] selection:text-[#050608]">
        {/* Boot Sequence Loader */}
        <BootSequence />

        {/* Custom Interactive Cursor (fine-pointer only) */}
        <CustomCursor />

        {/* ⌘K Command Palette */}
        <CommandPalette />

        {/* Fixed Mesh Gradient & Noise Background */}
        <PremiumBackground />

        {/* Navigation & Header */}
        <Navbar />

        {/* Floating Quick Comms */}
        <FloatingAskAI />

        {/* Main Content Sections */}
        <main className="relative z-10">
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
