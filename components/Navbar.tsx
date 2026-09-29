"use client";

import React, { useState } from "react";
import type { MouseEvent } from "react";
import { Terminal, Download, Menu, X, Command } from "lucide-react";
import { PERSONAL } from "@/lib/portfolio-data";
import Container from "@/components/ui/Container";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Case Studies", href: "/projects" },
  { label: "Notes", href: "/blog" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleAnchorClick =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith("#")) return;
      event.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setOpen(false);
    };

  const triggerCmdk = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true }),
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/[0.06] bg-[#050608]/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.45)]">
      <Container
        as="div"
        className="flex items-center justify-between gap-4 py-3"
      >
        {/* Brand Monogram */}
        <a
          href="#home"
          onClick={handleAnchorClick("#home")}
          className="group flex items-center gap-2.5 font-mono text-sm font-bold tracking-tight text-[--text-primary] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm] rounded px-1"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#FF7A33]/40 bg-[#10131A] text-xs font-black text-[#FF7A33] shadow-[0_0_12px_rgba(255,122,51,0.2)] transition-all group-hover:border-[#FF7A33] group-hover:shadow-[0_0_16px_rgba(255,122,51,0.35)]">
            RB
          </span>
          <span className="text-xs tracking-wider text-[--text-secondary] transition-colors group-hover:text-[--text-primary]">
            rajendra<span className="text-[#FF7A33]">.dev</span>
          </span>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden items-center gap-1 xl:gap-2 lg:flex font-mono text-xs">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleAnchorClick(item.href)}
              className="relative px-3 py-1.5 text-[--text-secondary] transition-colors duration-150 hover:text-[--text-primary] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm] rounded-md hover:bg-white/[0.04]"
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Action Stack: ⌘K Trigger + Download CV */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* ⌘K Trigger Button */}
          <button
            type="button"
            onClick={triggerCmdk}
            aria-label="Open Command Palette"
            className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5 font-mono text-xs text-[--text-secondary] transition-all duration-200 hover:border-white/[0.18] hover:bg-white/[0.05] hover:text-[--text-primary] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm]"
          >
            <Command size={13} className="text-[#FF7A33]" />
            <span className="hidden md:inline text-[11px]">Search</span>
            <kbd className="hidden sm:inline-block rounded border border-white/[0.08] bg-white/[0.04] px-1.5 py-0.2 text-[10px] text-[--text-tertiary]">
              ⌘K
            </kbd>
          </button>

          {/* Download CV CTA */}
          <a
            href={PERSONAL.resumeUrl}
            download="Rajendra-Bist-Resume.pdf"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#FF7A33]/40 bg-[#FF7A33]/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-[#FF7A33] shadow-[0_0_12px_rgba(255,122,51,0.15)] transition-all duration-200 hover:border-[#FF7A33] hover:bg-[#FF7A33] hover:text-[#050608] hover:shadow-[0_0_20px_rgba(255,122,51,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm]"
          >
            <Download size={13} />
            <span>Resume</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[--text-secondary] transition-all duration-200 lg:hidden cursor-pointer hover:text-[--text-primary] hover:border-white/[0.16] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm]"
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
        <div
          id="mobile-nav-menu"
          className="border-t border-white/[0.08] bg-[#050608]/95 px-6 py-5 backdrop-blur-2xl lg:hidden font-mono text-sm"
        >
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleAnchorClick(item.href)}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-[--text-secondary] transition-colors hover:bg-white/[0.04] hover:text-[--text-primary]"
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#FF7A33]">&rarr;</span>
              </a>
            ))}

            <div className="mt-4 flex flex-col gap-2.5 border-t border-white/[0.08] pt-4">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  triggerCmdk();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] py-2.5 text-xs text-[--text-primary]"
              >
                <Command size={14} className="text-[#FF7A33]" />
                Command Palette (⌘K)
              </button>

              <a
                href={PERSONAL.resumeUrl}
                download="Rajendra-Bist-Resume.pdf"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FF7A33] py-2.5 text-xs font-semibold text-[#050608]"
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
