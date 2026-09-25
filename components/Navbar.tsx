'use client';

import React, { useState } from 'react';
import type { MouseEvent } from 'react';
import { Terminal, Download, Menu, X, Command } from 'lucide-react';
import { PERSONAL } from '@/lib/portfolio-data';
import Container from '@/components/ui/Container';

const navItems = [
  { id: '01', label: 'About', href: '#about' },
  { id: '02', label: 'Stack', href: '#skills' },
  { id: '03', label: 'Projects', href: '#projects' },
  { id: '04', label: 'Process', href: '#process' },
  { id: '05', label: 'Experience', href: '#experience' },
  { id: '06', label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleAnchorClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) return;
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
  };

  const triggerCmdk = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[--border-subtle] bg-[--bg-void]/85 backdrop-blur-xl">
      <Container as="div" className="flex items-center justify-between gap-4 py-3.5">
        {/* Brand Monogram */}
        <a
          href="#home"
          onClick={handleAnchorClick('#home')}
          className="flex items-center gap-2 font-mono text-sm font-bold tracking-tight text-[--text-primary] transition-colors duration-200 hover:text-[--accent-warm] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm] rounded px-1"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[--border-strong] bg-[--bg-surface-2] text-[--accent-warm]">
            RB
          </span>
          <span className="hidden sm:inline-block text-xs text-[--text-secondary]">
            rajendra.dev
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden items-center gap-6 lg:flex font-mono text-xs">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleAnchorClick(item.href)}
              className="group text-[--text-secondary] transition-colors duration-200 hover:text-[--text-primary] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm] rounded px-1 py-0.5"
            >
              <span className="text-[--text-tertiary] transition-colors group-hover:text-[--accent-warm]">
                {item.id}
              </span>{' '}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Action Stack: ⌘K Trigger + Download CV */}
        <div className="flex items-center gap-2.5">
          {/* ⌘K Trigger Button */}
          <button
            type="button"
            onClick={triggerCmdk}
            aria-label="Open Command Palette"
            className="flex items-center gap-1.5 rounded-lg border border-[--border-subtle] bg-[--bg-surface-2] px-2.5 py-1.5 font-mono text-xs text-[--text-secondary] transition-all duration-200 hover:border-[--border-strong] hover:text-[--text-primary] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm]"
          >
            <Command size={13} className="text-[--accent-warm]" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="rounded border border-[--border-subtle] bg-[--bg-surface] px-1 py-0.2 text-[10px] text-[--text-tertiary]">
              ⌘K
            </kbd>
          </button>

          {/* Download CV CTA */}
          <a
            href={PERSONAL.resumeUrl}
            download="Rajendra-Bist-Resume.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[--border-strong] bg-[--bg-surface-2] px-3 py-1.5 font-mono text-xs font-medium text-[--text-primary] transition-all duration-200 hover:border-[--accent-warm] hover:text-[--accent-warm] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm]"
          >
            <Download size={13} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[--border-subtle] bg-[--bg-surface-2] text-[--text-secondary] transition-all duration-200 lg:hidden cursor-pointer hover:text-[--text-primary] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm]"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {open && (
        <div id="mobile-nav-menu" className="border-t border-[--border-subtle] bg-[--bg-void] px-6 py-5 lg:hidden font-mono text-sm">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleAnchorClick(item.href)}
                className="flex items-center gap-2 py-2 text-[--text-secondary] transition-colors hover:text-[--text-primary]"
              >
                <span className="text-[--accent-warm]">{item.id}</span>
                <span>{item.label}</span>
              </a>
            ))}

            <div className="mt-4 flex flex-col gap-2.5 border-t border-[--border-subtle] pt-4">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerCmdk();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-[--border-subtle] bg-[--bg-surface-2] py-2.5 text-xs text-[--text-primary]"
              >
                <Command size={14} className="text-[--accent-warm]" />
                Command Palette (⌘K)
              </button>

              <a
                href={PERSONAL.resumeUrl}
                download="Rajendra-Bist-Resume.pdf"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[--accent-warm] py-2.5 text-xs font-semibold text-[#050608]"
              >
                <Download size={14} />
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
