'use client';

import React from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { PERSONAL } from '@/lib/portfolio-data';
import Container from '@/components/ui/Container';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Notes', href: '/blog' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  { icon: Github, href: PERSONAL.github, label: 'GitHub' },
  { icon: Linkedin, href: PERSONAL.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: `mailto:${PERSONAL.email}`, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[--bg-page] py-16 font-mono text-xs text-[--text-secondary] border-t border-[--border-hairline]">
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          {/* Col 1: Identity & Brand */}
          <div>
            <a
              href="#home"
              className="font-mono text-xl font-bold tracking-tight text-[--text-primary] transition-colors duration-200 hover:text-[--accent]"
            >
              RB<span className="text-[--accent]">.</span>
              <span className="ml-2 text-xs font-normal text-[--text-tertiary]">
                / bistrajendra.com.np
              </span>
            </a>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[--text-secondary]">
              Full-stack developer building typed applications, multi-tenant boundaries, and resilient backends.
            </p>
          </div>

          {/* Col 2: Navigation Map */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[--text-primary]">
              Navigation
            </h2>
            <div className="mt-4 flex flex-col gap-2.5 text-xs text-[--text-secondary]">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="w-fit transition-colors duration-200 hover:text-[--accent]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Direct Comms & Socials */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[--text-primary]">
              Direct Connection
            </h2>
            <a
              href={`mailto:${PERSONAL.email}`}
              className="mt-4 block break-words text-[--text-primary] font-medium transition-colors hover:text-[--accent]"
            >
              {PERSONAL.email}
            </a>
            <p className="mt-2 text-[11px] text-[--text-tertiary]">
              New Delhi, India · Available for Delhi NCR &amp; Remote
            </p>

            <div className="mt-5 flex gap-2.5">
              {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] text-[--text-secondary] transition-all duration-200 hover:border-[--border-strong] hover:text-[--accent] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--focus-ring]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Divider */}
        <div className="my-8 border-t border-[--border-hairline]" />

        {/* Bottom Bar: Copyright, Last updated & Back to top */}
        <div className="flex flex-col gap-4 text-[11px] text-[--text-tertiary] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Rajendra Bist. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Last updated: Nov 2026</span>
            <a
              href="#home"
              className="inline-flex items-center gap-1 text-[--text-secondary] transition-colors hover:text-[--accent] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--focus-ring]"
            >
              Back to top <ArrowUp size={12} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
