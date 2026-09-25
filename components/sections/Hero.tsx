'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { PERSONAL } from '@/lib/portfolio-data';
import Container from '@/components/ui/Container';
import LiveSystemStatus from '@/components/ui/LiveSystemStatus';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden pt-24 pb-12 lg:pt-32"
    >
      <Container as="div" className="relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Left Column: Statement-as-Hero, Byline, Body Prose, Actions */}
        <div className="relative z-10 text-left">
          {/* Consolidated Telemetry Pill */}
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-[--border-strong] bg-[--bg-surface-2] px-3.5 py-1 font-mono text-xs text-[--text-secondary] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--accent-cool] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[--accent-cool]" />
              </span>
              <span className="text-[--text-primary] font-medium">Available for roles</span>
              <span className="text-[--text-tertiary]">•</span>
              <span className="text-[--accent-cool]">Active on GitHub</span>
            </div>
          </div>

          {/* Statement Headline: clamp(48px, 8vw, 108px) */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5.25rem] font-bold tracking-tight text-[--text-primary] leading-[1.05]">
            Systems That Don&apos;t <br />
            <span className="text-[--accent-warm]">Break Under Load.</span>
          </h1>

          {/* Quiet Byline in JetBrains Mono */}
          <p className="mt-5 font-mono text-sm sm:text-base md:text-lg font-medium text-[--text-secondary]">
            Rajendra Bist <span className="text-[--text-tertiary]">—</span> Full-Stack &amp; Backend Systems Engineer, Nepal
          </p>

          {/* Body Narrative (Single Size: 17-19px, max-width 52ch) */}
          <p className="mt-4 max-w-[52ch] text-base sm:text-lg leading-relaxed text-[--text-secondary]">
            Typed APIs, RAG pipelines, and fault-tolerant architecture — shipped for real users, not demos.
          </p>

          {/* Action Buttons: Solid Accent-Warm vs Ghost Outline */}
          <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs">
            <a
              href="#projects"
              className="premium-button-primary inline-flex min-h-12 items-center justify-center rounded-xl px-7 py-3 font-semibold transition-all duration-200"
            >
              View Projects
            </a>
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              className="premium-button-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold transition-all duration-200 hover:border-[--accent-warm]"
            >
              <Download size={14} className="text-[--accent-warm]" />
              Resume
            </a>
          </div>

          {/* Quiet Monospace Socials Row */}
          <div className="mt-8 flex items-center gap-5 font-mono text-xs text-[--text-tertiary]">
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-[--text-primary]"
            >
              <Github size={15} />
              <span>GitHub</span>
            </a>
            <span>•</span>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 transition-colors hover:text-[--text-primary]"
            >
              <Linkedin size={15} />
              <span>LinkedIn</span>
            </a>
            <span>•</span>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="flex items-center gap-1.5 transition-colors hover:text-[--text-primary]"
            >
              <Mail size={15} />
              <span>Email</span>
            </a>
          </div>
        </div>

        {/* Right Column: Cinematic Portrait Anchor with Low-Key Vignette & Rim-Light */}
        <div className="relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[380px] overflow-hidden rounded-3xl border border-[--border-strong] bg-[--bg-surface-2] shadow-2xl"
          >
            {/* Cinematic Portrait with Low-Key Desaturation */}
            <Image
              src="/images/rajendra-bist.jpeg"
              alt="Rajendra Bist - Systems Engineer"
              fill
              priority
              sizes="(min-width: 1024px) 380px, 80vw"
              className="object-cover object-[50%_18%] filter grayscale-[70%] contrast-[110%] brightness-[90%]"
            />

            {/* Dark Vignette Scrim Bleed */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(circle at 50% 25%, transparent 45%, #050608 95%),
                  linear-gradient(to top, #050608 0%, transparent 45%),
                  linear-gradient(to right, #050608 0%, transparent 20%)
                `,
              }}
            />

            {/* Warm-Accent Rim-Light Overlay (12% Opacity Screen Blend) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-15 mix-blend-screen"
              style={{
                background: 'radial-gradient(circle at 80% 20%, #FF7A33 0%, transparent 60%)',
              }}
            />

            {/* Micro Terminal Overlay Tag */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-[--border-subtle] bg-[#050608]/85 px-3 py-2 font-mono text-[11px] text-[--text-secondary] backdrop-blur-md">
              <span className="text-[--text-primary] font-medium">RB // SYS_ARCH</span>
              <span className="text-[--accent-cool] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[--accent-cool] animate-pulse" />
                ONLINE [UTC+5:45]
              </span>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Subtle Bottom Section Indicator */}
      <div className="mx-auto mt-10 flex flex-col items-center gap-1 font-mono text-[10px] text-[--text-tertiary]">
        <span className="tracking-widest uppercase">01 // EXPLORE SYSTEMS</span>
        <ArrowDown size={12} className="animate-bounce text-[--accent-warm]" />
      </div>
    </section>
  );
}
