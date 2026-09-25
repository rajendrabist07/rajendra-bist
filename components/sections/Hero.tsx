'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { PERSONAL } from '@/lib/portfolio-data';
import Container from '@/components/ui/Container';
import LiveSystemStatus from '@/components/ui/LiveSystemStatus';

const TYPED_ROLES = [
  'Full-Stack Developer & Backend Systems',
  'Building Resilient APIs & RAG Pipelines',
  'LLM Integrations & Vector Embeddings (pgvector)',
  'Autonomous AST PR Review Agents & Tooling',
  'Designing Fault-Tolerant Distributed Architectures',
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState(shouldReduceMotion ? TYPED_ROLES[0] : '');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentText(TYPED_ROLES[0]);
      return;
    }

    const fullText = TYPED_ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % TYPED_ROLES.length);
    } else {
      const speed = isDeleting ? 25 : 55;
      timeout = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? fullText.substring(0, currentText.length - 1)
            : fullText.substring(0, currentText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex, shouldReduceMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden pt-24 pb-12 lg:pt-32"
    >
      <Container as="div" className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left Column: Telemetry, Big Name, Typewriter Role, Narrative, CTAs */}
        <div className="relative z-10 text-center lg:text-left">
          {/* Consolidated Telemetry Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-[--border-strong] bg-[--bg-surface-2] px-3.5 py-1.5 font-mono text-xs text-[--text-secondary] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--accent-cool] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[--accent-cool]" />
              </span>
              <span className="text-[--text-primary] font-medium">Available for roles</span>
              <span className="text-[--text-tertiary]">•</span>
              <span className="text-[--accent-cool]">Active on GitHub</span>
            </div>
          </div>

          {/* Big Bold Name (Paileko Style with High Contrast) */}
          <h1 className="fluid-hero mt-5 font-black uppercase tracking-tight text-[--text-primary]">
            Rajendra <br className="hidden sm:inline" />
            <span className="text-[--accent-warm]">Bist</span>
          </h1>

          {/* Dynamic Typewriter Role Display with Cursor */}
          <div className="mt-3 flex min-h-[34px] items-center justify-center lg:justify-start font-mono text-sm sm:text-base md:text-lg text-[--accent-warm]">
            <span className="text-[--text-tertiary] mr-2">&gt;</span>
            <span className="font-semibold text-[--text-primary]">{currentText}</span>
            <span className="ml-1 inline-block w-2.5 h-4 bg-[--accent-warm] animate-cursor-blink font-normal" />
          </div>

          {/* Punchy Systems-First Narrative */}
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[--text-secondary] sm:text-base md:text-lg">
            Full-stack &amp; backend software engineer based in Nepal architecting typed React interfaces,
            high-throughput APIs, RAG pipelines, and autonomous AI systems deployed for real users.
          </p>

          {/* Action Buttons: Solid Accent-Warm vs Ghost Outline */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start font-mono text-xs">
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
              Download CV
            </a>
          </div>

          {/* Monospace Socials Row */}
          <div className="mt-6 flex items-center justify-center gap-4 lg:justify-start text-[--text-secondary]">
            {[
              { href: PERSONAL.github, icon: Github, label: 'GitHub' },
              { href: PERSONAL.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: `mailto:${PERSONAL.email}`, icon: Mail, label: 'Email' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="rounded-lg border border-[--border-subtle] bg-[--bg-surface-2] p-2.5 transition-all duration-200 hover:border-[--border-strong] hover:text-[--accent-warm] hover:scale-105 active:scale-95"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: Natural Cinematic Portrait Blending Seamlessly into Dark Void */}
        <div className="relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-[320px] sm:max-w-[370px] lg:max-w-[400px] aspect-[4/5]"
          >
            {/* Soft Ambient Radial Halo */}
            <div
              className="absolute -inset-4 pointer-events-none opacity-25 blur-3xl"
              style={{
                background: 'radial-gradient(circle at 60% 40%, #FF7A33 0%, #34D8B0 35%, transparent 70%)',
              }}
            />

            {/* Sharp Natural Portrait with Seamless Edge Vignette */}
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-[--border-strong] bg-[#050608] shadow-2xl">
              <Image
                src="/images/rajendra-bist.jpeg"
                alt="Rajendra Bist - Full-Stack & Backend Systems Engineer"
                fill
                priority
                sizes="(min-width: 1024px) 400px, 85vw"
                className="object-cover object-[50%_18%] filter contrast-[108%] brightness-[96%]"
              />

              {/* Natural Dark Vignette Bleed (fades photo edges smoothly into #050608) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `
                    radial-gradient(circle at 50% 28%, transparent 45%, #050608 94%),
                    linear-gradient(to top, #050608 0%, rgba(5,6,8,0.6) 24%, transparent 52%),
                    linear-gradient(to right, #050608 0%, transparent 16%),
                    linear-gradient(to left, #050608 0%, transparent 16%)
                  `,
                }}
              />

              {/* Subtle Warm Rim Light Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-10 mix-blend-screen"
                style={{
                  background: 'radial-gradient(circle at 80% 20%, #FF7A33 0%, transparent 55%)',
                }}
              />

              {/* Floating Monospace Status Badge */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-[--border-subtle] bg-[#050608]/90 px-3.5 py-2 font-mono text-xs text-[--text-secondary] backdrop-blur-md">
                <span className="font-semibold text-[--text-primary]">Rajendra Bist</span>
                <span className="text-[--accent-cool] flex items-center gap-1.5 font-medium">
                  <span className="h-2 w-2 rounded-full bg-[--accent-cool] animate-pulse" />
                  ONLINE [UTC+5:45]
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Subtle Scroll Indicator */}
      <div className="mx-auto mt-8 flex flex-col items-center gap-1 font-mono text-[10px] text-[--text-tertiary]">
        <span className="tracking-widest uppercase">01 // EXPLORE SYSTEMS</span>
        <ArrowDown size={12} className="animate-bounce text-[--accent-warm]" />
      </div>
    </section>
  );
}
