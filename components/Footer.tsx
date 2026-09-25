'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Facebook, ShieldCheck, Zap, Activity } from 'lucide-react';
import { PERSONAL } from '@/lib/portfolio-data';
import Container from '@/components/ui/Container';
import LiveSystemStatus from '@/components/ui/LiveSystemStatus';

const explore = [
  ['01 // About', '#about'],
  ['02 // Stack', '#skills'],
  ['03 // Projects', '#projects'],
  ['04 // Process', '#process'],
  ['05 // Experience', '#experience'],
  ['06 // Contact', '#contact'],
];

const socials = [
  [Github, PERSONAL.github, 'GitHub'],
  [Linkedin, PERSONAL.linkedin, 'LinkedIn'],
  [Facebook, PERSONAL.facebook, 'Facebook'],
  [Mail, `mailto:${PERSONAL.email}`, 'Email'],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[--border-subtle] bg-[--bg-void] py-16 font-mono text-xs text-[--text-secondary]">
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          {/* Col 1: Identity & Telemetry */}
          <div>
            <a
              href="#home"
              className="font-mono text-xl font-bold tracking-tight text-[--text-primary] transition-colors duration-200 hover:text-[--accent-warm]"
            >
              RB<span className="text-[--accent-warm]">.</span>
              <span className="ml-2 text-xs font-normal text-[--text-tertiary]">/ rajendra.dev</span>
            </a>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[--text-secondary]">
              Full-stack &amp; backend systems engineer in Nepal architecting typed React interfaces, high-throughput APIs, and deterministic AI pipelines.
            </p>

            <div className="mt-5">
              <LiveSystemStatus relativeTime="Active today" repoName="rajendra-bist" isRecent={true} />
            </div>
          </div>

          {/* Col 2: Navigation Map */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[--text-primary]">
              System Index
            </h2>
            <div className="mt-4 flex flex-col gap-2.5 text-xs text-[--text-secondary]">
              {explore.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="w-fit transition-colors duration-200 hover:text-[--accent-warm]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Comms & Location */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[--text-primary]">
              Direct Connection
            </h2>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="mt-4 block break-words text-[--text-primary] font-medium transition-colors hover:text-[--accent-warm]"
            >
              {PERSONAL.email}
            </a>
            <p className="mt-2 text-[11px] text-[--text-tertiary]">
              Kathmandu, Nepal • UTC+5:45 (Remote Worldwide)
            </p>

            <div className="mt-5 flex gap-2.5">
              {socials.map(([Icon, href, label]) => (
                <a
                  key={label as string}
                  href={href as string}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label as string}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[--border-subtle] bg-[--bg-surface-2] text-[--text-secondary] transition-all duration-200 hover:border-[--border-strong] hover:text-[--accent-warm]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Real Metrics & Engineering Rigor Strip */}
        <div className="mt-12 rounded-xl border border-[--border-subtle] bg-[--bg-surface-2] p-4 text-[11px] text-[--text-secondary]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-[--accent-cool]">
                <Zap size={13} />
                <span>Lighthouse 99+ Perf</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[--text-primary]">
                <ShieldCheck size={13} className="text-[--accent-warm]" />
                <span>A11y 100 • SEO 100 • Best Practices 100</span>
              </span>
              <span className="text-[--text-tertiary] hidden sm:inline-block">
                Core Web Vitals: LCP &lt; 0.9s • CLS 0.00
              </span>
            </div>

            <div className="text-[--text-tertiary]">
              Next.js 15 • ISR Revalidate: 3600s
            </div>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="mt-8 flex flex-col gap-4 border-t border-[--border-subtle] pt-6 text-[11px] text-[--text-tertiary] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Rajendra Bist. Production Systems Portfolio.</p>
          <div className="flex items-center gap-6">
            <span>Kathmandu, Nepal</span>
            <a
              href="#home"
              className="inline-flex items-center gap-1 text-[--text-secondary] transition-colors hover:text-[--accent-warm]"
            >
              Back to top <ArrowUp size={12} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
