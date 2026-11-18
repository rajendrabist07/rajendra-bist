'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { FACTS } from '@/content/facts';
import { ThemeToggle } from '@/components/primitives/ThemeToggle';
import { Icon } from '@/components/primitives/Icon';

const NAV_ITEMS = [
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Stack', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Process', href: '#process', id: 'process' },
  { label: 'Notes', href: '/blog', id: 'blog' },
  { label: 'Contact', href: '#contact', id: 'contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [platformKey, setPlatformKey] = useState<string>('⌘K');
  const drawerRef = useRef<HTMLDivElement>(null);

  // Platform-aware keyboard shortcut hint
  useEffect(() => {
    if (typeof navigator !== 'undefined' && !/Mac|iPhone|iPad|iPod/.test(navigator.userAgent)) {
      setPlatformKey('Ctrl+K');
    }
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'skills', 'experience', 'process', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Focus trap for mobile drawer
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleAnchorClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) return;
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const openCommandPalette = (mode: 'search' | 'ai' = 'search') => {
    window.dispatchEvent(
      new CustomEvent('open-cmdk', { detail: { mode } })
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[--border-hairline] bg-[--bg-page]/85 backdrop-blur-md supports-[backdrop-filter:none]:bg-[--bg-page] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Brand Monogram */}
        <a
          href="#home"
          onClick={handleAnchorClick('#home')}
          className="group flex items-center gap-2.5 font-mono text-sm font-bold tracking-tight text-[--text-primary] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] rounded-[--radius-control] p-1"
          aria-label="Rajendra Bist - Home"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-[--radius-control] border border-[--accent] bg-[--accent-dim] text-xs font-bold text-[--accent] transition-transform group-hover:scale-105">
            RB
          </span>
          <span className="text-xs tracking-wider text-[--text-secondary] group-hover:text-[--text-primary] transition-colors hidden sm:inline">
            bistrajendra<span className="text-[--accent]">.com.np</span>
          </span>
        </a>

        {/* Desktop Nav Items with Active State Highlight */}
        <nav
          className="hidden lg:flex items-center gap-1 font-mono text-xs"
          aria-label="Main Navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              (item.id === 'blog' && false) ||
              activeSection === item.id ||
              (item.id === 'skills' && activeSection === 'skills');

            return (
              <a
                key={item.href}
                href={item.href}
                onClick={handleAnchorClick(item.href)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-3 py-1.5 rounded-[--radius-control] transition-all duration-[--duration-micro] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] ${
                  isActive
                    ? 'text-[--accent] bg-[--accent-dim] font-semibold'
                    : 'text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Stack: Theme Toggle + ⌘K Trigger + Resume CTA */}
        <div className="flex items-center gap-2.5">
          {/* Theme Switcher Toggle */}
          <ThemeToggle showLabel={false} />

          {/* ⌘K Command Palette Trigger */}
          <button
            type="button"
            onClick={() => openCommandPalette('search')}
            aria-label="Open Command Palette"
            className="flex items-center gap-2 px-2.5 py-1.5 font-mono text-xs text-[--text-secondary] bg-[--bg-surface-2] border border-[--border-hairline] hover:border-[--border-strong] hover:text-[--text-primary] rounded-[--radius-control] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
          >
            <Icon name="terminal" size={13} className="text-[--accent]" />
            <span className="hidden md:inline text-[11px]">Search</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-[--border-hairline] bg-[--bg-surface-3] text-[10px] text-[--text-tertiary]">
              {platformKey}
            </kbd>
          </button>

          {/* Download Resume Button */}
          <a
            href={FACTS.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-medium text-[--accent] bg-[--accent-dim] border border-[--accent] hover:brightness-110 rounded-[--radius-control] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
          >
            <span>Resume</span>
          </a>

          {/* Mobile Sheet Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
            className="lg:hidden p-2 text-[--text-secondary] hover:text-[--text-primary] border border-[--border-hairline] bg-[--bg-surface-2] rounded-[--radius-control] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] cursor-pointer"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Sheet Menu */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="lg:hidden border-t border-[--border-hairline] bg-[--bg-page] px-6 py-6 font-mono text-sm space-y-4"
        >
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleAnchorClick(item.href)}
                className="flex items-center justify-between px-3 py-2.5 rounded-[--radius-control] text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-[--accent]">→</span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-[--border-hairline] flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                openCommandPalette('search');
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[--bg-surface-2] border border-[--border-hairline] rounded-[--radius-control] text-xs font-mono text-[--text-primary]"
            >
              <Icon name="terminal" size={14} className="text-[--accent]" />
              Command Palette ({platformKey})
            </button>

            <a
              href={FACTS.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[--accent] text-[--accent-ink] font-medium rounded-[--radius-control] text-xs font-mono"
            >
              Download Resume (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
