'use client';

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, Sparkles, Terminal, Activity } from 'lucide-react';
import Image from 'next/image';
import { PERSONAL } from '@/lib/portfolio-data';
import Container from '@/components/ui/Container';
import CodeBioBlock from '@/components/ui/CodeBioBlock';
import LiveSystemStatus from '@/components/ui/LiveSystemStatus';

const SYSTEMS_SHIPPED = [
  'Distributed Backend APIs',
  'RAG Pipelines & pgvector',
  'AST PR Review Agents',
  'Realtime LLM Workflows',
  'High-Throughput Node.js Microservices',
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [systemIdx, setSystemIdx] = useState(0);
  const [currentText, setCurrentText] = useState(shouldReduceMotion ? SYSTEMS_SHIPPED[0] : '');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentText(SYSTEMS_SHIPPED[0]);
      return;
    }

    const fullText = SYSTEMS_SHIPPED[systemIdx];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setSystemIdx((prev) => (prev + 1) % SYSTEMS_SHIPPED.length);
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
  }, [currentText, isDeleting, systemIdx, shouldReduceMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden pt-24 pb-12 lg:pt-28"
    >
      <Container as="div" className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Column: Heading, Telemetry, Narrative, CTAs */}
        <div className="text-center lg:text-left">
          {/* Top Status Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[--border-strong] bg-[--bg-surface-2] px-3.5 py-1.5 font-mono text-xs font-medium text-[--accent-cool]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--accent-cool] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[--accent-cool]" />
              </span>
              AVAILABLE FOR ROLES
            </div>

            <LiveSystemStatus relativeTime="Active today" repoName="rajendra-bist" isRecent={true} />
          </div>

          {/* Giant Display Name */}
          <h1 className="fluid-hero mt-5 font-black uppercase tracking-tight text-[--text-primary]">
            Rajendra <span className="text-[--accent-warm]">Bist</span>
          </h1>

          {/* Systems I've Shipped Ticker */}
          <div className="mt-3 flex min-h-[32px] items-center justify-center lg:justify-start font-mono text-sm sm:text-base text-[--accent-warm]">
            <span className="text-[--text-tertiary] mr-2">&gt; systems:</span>
            <span className="font-semibold text-[--text-primary]">{currentText}</span>
            <span className="ml-0.5 inline-block w-2 bg-[--accent-warm] animate-cursor-blink font-normal">
              _
            </span>
          </div>

          {/* Systems-First Engineering Narrative */}
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[--text-secondary] sm:text-base">
            Full-stack &amp; backend software engineer building typed React interfaces, high-throughput
            Node.js APIs, RAG pipelines, and autonomous AI systems deployed for real users.
          </p>

          {/* Action CTAs */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 lg:justify-start font-mono text-xs">
            <a
              href="#projects"
              className="premium-button-primary inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-2.5 font-semibold transition-all duration-200"
            >
              View Projects
            </a>
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              className="premium-button-secondary inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-all duration-200"
            >
              <Download size={14} className="text-[--accent-warm]" />
              Download Resume
            </a>
          </div>

          {/* Social Links Row */}
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
                  className="rounded-lg border border-[--border-subtle] bg-[--bg-surface-2] p-2 transition-all duration-200 hover:border-[--border-strong] hover:text-[--accent-warm]"
                >
                  <Icon size={17} />
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Column: rajendra.config.ts Visual Centerpiece + Profile Badge */}
        <div className="relative flex flex-col gap-4">
          <CodeBioBlock />

          {/* Compact Profile Micro-strip */}
          <div className="flex items-center justify-between rounded-xl border border-[--border-subtle] bg-[--bg-surface] p-3 font-mono text-xs text-[--text-secondary]">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[--accent-warm]">
                <Image
                  src="/images/rajendra-bist.jpeg"
                  alt="Rajendra Bist"
                  fill
                  sizes="40px"
                  className="object-cover object-[50%_18%]"
                />
              </div>
              <div>
                <p className="font-semibold text-[--text-primary]">Rajendra Bist</p>
                <p className="text-[11px] text-[--text-tertiary]">Full-Stack &amp; AI Systems</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-[--accent-cool]">
              <span className="h-1.5 w-1.5 rounded-full bg-[--accent-cool] animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Subtle Scroll Indicator */}
      <div className="mx-auto mt-8 flex flex-col items-center gap-1 text-[--text-tertiary] font-mono text-[10px]">
        <span className="tracking-widest uppercase">01 // EXPLORE SYSTEMS</span>
        <ArrowDown size={12} className="animate-bounce text-[--accent-warm]" />
      </div>
    </section>
  );
}
