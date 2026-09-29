"use client";

import React from "react";
import { ArrowUp, Github, Linkedin, Mail, Facebook } from "lucide-react";
import { PERSONAL } from "@/lib/portfolio-data";
import Container from "@/components/ui/Container";

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
  [Facebook, PERSONAL.facebook, "Facebook"],
  [Mail, `mailto:${PERSONAL.email}`, "Email"],
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[--bg-void] py-16 font-mono text-xs text-[--text-secondary]">
      <div className="divider-gradient absolute top-0 left-0 right-0" />

      {/* Full-Width Dual Ambient Glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 10% 30%, rgba(255, 122, 51, 0.045) 0%, transparent 55%),
            radial-gradient(circle at 90% 70%, rgba(52, 216, 176, 0.035) 0%, transparent 55%)
          `,
        }}
        aria-hidden="true"
      />

      {/* Subtle Matrix Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          {/* Col 1: Identity & Telemetry */}
          <div>
            <a
              href="#home"
              className="font-mono text-xl font-bold tracking-tight text-[--text-primary] transition-colors duration-200 hover:text-[--accent-warm]"
            >
              RB<span className="text-[--accent-warm]">.</span>
              <span className="ml-2 text-xs font-normal text-[--text-tertiary]">
                / rajendra.dev
              </span>
            </a>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[--text-secondary]">
              Full-stack &amp; backend systems engineer in Nepal architecting
              typed React interfaces, high-throughput APIs, and deterministic AI
              pipelines.
            </p>
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-[--text-secondary] transition-all duration-200 hover:border-[--accent-warm]/40 hover:text-[--accent-warm] hover:scale-105 active:scale-95"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Divider above Copyright */}
        <div className="divider-gradient my-8" />

        {/* Copyright & Back to Top */}
        <div className="flex flex-col gap-4 text-[11px] text-[--text-tertiary] md:flex-row md:items-center md:justify-between">
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
