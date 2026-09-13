"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ExternalLink, Eye, Github, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";

const CASE_STUDIES = [
  {
    tag: "PRODUCTION SYSTEM • 2026",
    title: "DevGuard AI",
    tagline: "Autonomous PR Security & Code Review Agent",
    image: "/images/devguard-ai-card.svg",
    terminalTitle: "devguard-pipeline.sh",
    terminalContent: `PR Webhook → [AST Static Linter]
                  ↓
             [OSV.dev CVE Scanner]
                  ↓
             [Vitest Test Runner]
                  ↓
             [3-Tier LLM Fallback] → Verified PR Patch`,
    problem:
      "Most AI PR reviewers hallucinate syntax and miss security vulnerabilities because they lack runtime static analysis and test validation.",
    solution:
      "Empirical tool-calling review loop that executes AST linters and vulnerability scanners before synthesizing 1-click GitHub PR review comments.",
    keyDecision:
      "Engineered a 3-tier fallback model router (Groq Llama 3.3 ➡️ Gemini 2.5 Flash ➡️ Deterministic AST rules) guaranteeing review uptime resilience under strict rate limits.",
    frontendImplementation:
      "Designed the dashboard experience around traceable review states, exposing agent steps, PR simulation, and review evidence without hiding the backend verification flow.",
    metrics: [
      { value: "3-Tier", label: "Failover Router" },
      { value: "5 Max", label: "Agentic Loop Cap" },
      { value: "AST-Verified", label: "Syntax Assurance" },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind v4",
      "Supabase",
      "Groq 70B",
      "Gemini 2.5",
      "GitHub App",
    ],
    liveUrl: "https://dev-guard-ai.vercel.app/",
    githubUrl: "https://github.com/rajendrabist07/dev-guard-ai",
  },
  {
    tag: "PRODUCTION SYSTEM • 2026",
    title: "EduMethod AI",
    tagline: "Cognitive EdTech Platform With Persistent Memory & pgvector RAG",
    image: "/images/edumethod-ai-card.svg",
    terminalTitle: "edumethod-arch.sh",
    terminalContent: `Syllabus Upload → [pgvector Embeddings]
                        ↓
                   [Persistent Student Memory]
                        ↓
                   [Verification Audit Layer]
                        ↓
                   [SM-2 Spaced Repetition] → Mastery`,
    problem:
      "Generic AI chatbots forget student weak areas between sessions and hallucinate answers on complex syllabus materials without grounding.",
    solution:
      "End-to-end cognitive workspace pairing long-term student memory profiles in Supabase with pgvector document grounding and an independent verification audit layer.",
    keyDecision:
      "Chose self-hosted pgvector inside PostgreSQL over external vector databases to eliminate cold starts and keep user data and vector embeddings in a single atomic transaction.",
    frontendImplementation:
      "Built the learning workspace around authenticated Next.js/React flows that connect upload, memory, verification, and spaced-repetition states to typed backend responses.",
    metrics: [
      { value: "pgvector", label: "Syllabus Grounding" },
      { value: "SM-2", label: "Spaced Repetition" },
      { value: "7 Engines", label: "Cognitive Core" },
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Clerk Auth",
      "Supabase (pgvector)",
      "Upstash Redis",
      "Groq Router",
      "Gemini 2.5",
    ],
    liveUrl: "https://edumethod-ai.vercel.app",
    githubUrl: "https://github.com/rajendrabist07/edumethod-ai",
  },
  {
    tag: "PRODUCTION SYSTEM • 2026",
    title: "SocraticAI",
    tagline: "Guided Reasoning & Cognitive Questioning Assistant",
    image: "/images/socratic-ai-card.svg",
    terminalTitle: "socratic-loop.ts",
    terminalContent: `Student Query → [Negative Constraint Filter]
                        ↓
                   [Step-by-Step Reasoning Coach]
                        ↓
                   [MongoDB Session Persistence]`,
    problem:
      "Students use AI to copy direct answers instead of learning core problem-solving intuition and deep conceptual reasoning.",
    solution:
      "Constrained LLM agent that enforces strict negative prompt boundaries and locked temperature (0.4–0.6) to guide students through Socratic step-by-step reasoning.",
    keyDecision:
      "Implemented persistent session storage in MongoDB Atlas with structured feedback loops rather than stateless chat sessions.",
    frontendImplementation:
      "Shaped the chat interface around saved learning sessions and guided-question pacing so the UI reinforces Socratic learning instead of direct answer delivery.",
    metrics: [
      { value: "Zero-Direct", label: "Solution Masking" },
      { value: "0.4–0.6", label: "Locked Temperature" },
      { value: "MongoDB", label: "Session Retention" },
    ],
    stack: [
      "Next.js 15",
      "Gemini API",
      "MongoDB",
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    liveUrl: "https://socratic-ai-tau.vercel.app/",
    githubUrl: "https://github.com/rajendrabist07/socratic-ai.git",
  },
];

function ProjectVisualCard({
  project,
}: {
  project: (typeof CASE_STUDIES)[number];
}) {
  const [activeView, setActiveView] = useState<"preview" | "architecture">(
    "preview",
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-2xl border border-[--border] bg-[--bg-code] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Window Titlebar with View Switcher */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#e0b9a6]/80" />
            <span className="h-3 w-3 rounded-full bg-[#e0c49d]/80" />
            <span className="h-3 w-3 rounded-full bg-[#bfe2d8]/80" />
          </div>

          <div className="flex items-center rounded-lg border border-[--border] bg-black/35 p-0.5">
            <button
              type="button"
              onClick={() => setActiveView("preview")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-primary] ${
                activeView === "preview"
                  ? "bg-[rgba(224,185,166,0.16)] text-[--accent-primary] shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye size={12} />
              Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveView("architecture")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-primary] ${
                activeView === "architecture"
                  ? "bg-[rgba(224,185,166,0.16)] text-[--accent-primary] shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Code2 size={12} />
              Architecture Flow
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="relative min-h-[260px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeView === "preview" ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative aspect-video w-full overflow-hidden bg-[--bg-primary]"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} live interface preview`}
                  fill
                  sizes="(min-width: 1024px) 500px, 90vw"
                  className="object-cover"
                />
              </motion.div>
            ) : (
              <motion.div
                key="architecture"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center p-6 font-mono text-xs leading-relaxed text-slate-300"
              >
                <pre className="overflow-x-auto whitespace-pre text-[--accent-secondary] font-mono">
                  {project.terminalContent}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="premium-button-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-primary] focus-visible:ring-offset-2 focus-visible:ring-offset-[--bg-primary]"
          >
            Live Demo <ExternalLink size={15} />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="premium-button-secondary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-primary] focus-visible:ring-offset-2 focus-visible:ring-offset-[--bg-primary]"
          >
            GitHub <Github size={15} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28">
      <Container>
        <SectionHeader subtitle="Featured Work" title="Production Systems" />

        <div className="mt-16 space-y-28">
          {CASE_STUDIES.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start"
            >
              {/* Left Column: Visual Card with Preview & Architecture Switcher */}
              <ProjectVisualCard project={project} />

              {/* Right Column: Case Study Narrative */}
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-widest uppercase text-[--accent-primary]">
                  {project.tag}
                </span>

                <h3 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-base font-medium text-slate-400">
                  {project.tagline}
                </p>

                <div className="mt-6 space-y-4 text-sm leading-relaxed">
                  <div>
                    <span className="font-semibold uppercase tracking-wider text-xs text-slate-400">
                      The Problem
                    </span>
                    <p className="mt-1 italic text-slate-300">
                      &ldquo;{project.problem}&rdquo;
                    </p>
                  </div>

                  <div>
                    <span className="font-semibold uppercase tracking-wider text-xs text-slate-400">
                      The Solution
                    </span>
                    <p className="mt-1 italic text-slate-300">
                      &ldquo;{project.solution}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Key Decision Card */}
                <div className="mt-6 rounded-xl border border-[rgba(224,185,166,0.28)] bg-[rgba(224,185,166,0.065)] p-4 text-xs leading-relaxed text-slate-300">
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[--accent-primary]">
                    <Zap size={14} className="text-[--accent-primary]" />
                    <span>Key Decision</span>
                  </div>
                  <p className="mt-2">{project.keyDecision}</p>
                </div>

                <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.025] p-4 text-xs leading-relaxed text-slate-300">
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-300">
                    <Sparkles size={14} className="text-[--accent-primary]" />
                    <span>Frontend Implementation</span>
                  </div>
                  <p className="mt-2">{project.frontendImplementation}</p>
                </div>

                {/* Metrics Grid */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3 text-center"
                    >
                      <p className="text-base font-bold text-white sm:text-lg">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-[11px] text-slate-400">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="premium-chip rounded-lg px-2.5 py-1 text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
