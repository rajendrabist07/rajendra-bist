"use client";

import React from "react";
import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL } from "@/lib/portfolio-data";
import Container from "@/components/ui/Container";
import { ObfuscatedEmail } from "@/components/ui/ObfuscatedContact";

const explore = [
  ["01 // About", "#about"],
  ["02 // Stack", "#skills"],
  ["03 // Projects", "#projects"],
  ["04 // Process", "#process"],
  ["05 // Experience", "#experience"],
  ["06 // Contact", "#contact"],
];

const socials = [
  [Github, PERSONAL.github, "GitHub"],
  [Linkedin, PERSONAL.linkedin, "LinkedIn"],
  [Mail, `mailto:${PERSONAL.email}`, "Email"],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[--bg-page] py-16 font-mono text-xs text-[--text-secondary] border-t border-[--border-hairline]">
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          {/* Col 1: Identity & Telemetry */}
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
              Full-stack developer &amp; backend engineer based in New Delhi, India
              building typed full-stack applications: React interfaces, REST APIs, and
              AI-integrated backends.
            </p>
          </div>

          {/* Col 2: Navigation Map */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[--text-primary]">
              Navigation
            </h2>
            <div className="mt-4 flex flex-col gap-2.5 text-xs text-[--text-secondary]">
              {explore.map(([label, href]) => (
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

          {/* Col 3: Direct Comms & Location */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[--text-primary]">
              Contact
            </h2>
            <div className="mt-4 block break-words text-[--text-primary] font-medium transition-colors hover:text-[--accent]">
              <ObfuscatedEmail className="transition-colors hover:text-[--accent]" />
            </div>
            <p className="mt-2 text-[11px] text-[--text-tertiary]">
              New Delhi, India • Open to Delhi NCR &amp; Remote
            </p>

            <div className="mt-5 flex gap-2.5">
              {socials.map(([Icon, href, label]) => (
                <a
                  key={label as string}
                  href={href as string}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label as string}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] text-[--text-secondary] transition-all duration-200 hover:border-[--border-strong] hover:text-[--accent] hover:scale-105 active:scale-95"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Divider above Copyright */}
        <div className="my-8 border-t border-[--border-hairline]" />

        {/* Copyright & Back to Top */}
        <div className="flex flex-col gap-4 text-[11px] text-[--text-tertiary] md:flex-row md:items-center md:justify-between">
          <p>© 2026 Rajendra Bist.</p>
          <div className="flex items-center gap-6">
            <span>New Delhi, India</span>
            <a
              href="#home"
              className="inline-flex items-center gap-1 text-[--text-secondary] transition-colors hover:text-[--accent]"
            >
              Back to top <ArrowUp size={12} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
