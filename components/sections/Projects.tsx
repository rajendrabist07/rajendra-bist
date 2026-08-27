"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ExternalLink, Eye, Github, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

const CASE_STUDIES = [
  {
    tag: "PRODUCTION SYSTEM • 2026",
    title: "DevGuard AI",
    tagline: "Autonomous PR Security & Code Review Agent",
    image: "/images/dev-guard-ai.png",
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
      "Engineered a 3-tier fallback model router (Groq Llama 3.3 ➡️ Gemini 2.5 Flash ➡️ Deterministic AST rules) guaranteeing 100% review uptime under strict rate limits.",
    metrics: [
      { value: "100%", label: "Review Uptime" },
      { value: "5 Iterations", label: "Tool Calling Cap" },
      { value: "0", label: "Hallucinations" },
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
    image: "/images/edumethod-innovative.png",
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
    metrics: [
      { value: "~95%", label: "Grounding Accuracy" },
      { value: "SM-2", label: "Spaced Repetition" },
      { value: "7 Engines", label: "Cognitive Core" },
    ],
    stack: [
      "Next.js 16",
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
    metrics: [
      { value: "100%", label: "Guided Inquiry" },
      { value: "0.4–0.6", label: "Locked Temperature" },
      { value: "MongoDB", label: "Session Retention" },
    ],
    stack: ["Next.js", "Gemini API", "MongoDB", "Node.js", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://socratic-ai-tau.vercel.app/",
    githubUrl: "https://github.com/rajendrabist07/socratic-ai.git",
  },
];

function ProjectVisualCard({ project }: { project: typeof CASE_STUDIES[number] }) {
  const [activeView, setActiveView] = useState<"preview" | "architecture">("preview");

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c1017] shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        {/* Window Titlebar with View Switcher */}
        <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex items-center rounded-lg border border-white/10 bg-black/40 p-0.5">
            <button
              type="button"
              onClick={() => setActiveView("preview")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors duration-150 cursor-pointer ${
                activeView === "preview"
                  ? "bg-sky-500/20 text-sky-300 shadow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye size={12} />
              Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveView("architecture")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors duration-150 cursor-pointer ${
                activeView === "architecture"
                  ? "bg-sky-500/20 text-sky-300 shadow"
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
                className="relative aspect-video w-full overflow-hidden bg-[#06080d]"
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
                <pre className="overflow-x-auto whitespace-pre text-sky-300 font-mono">
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
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(37,99,235,0.35)] transition-all duration-200 hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:scale-[1.02] active:scale-[0.98]"
          >
            Live Demo <ExternalLink size={15} />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-sky-400/60 hover:bg-sky-500/10 hover:scale-[1.02] active:scale-[0.98]"
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
    <section id="projects" className="px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
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
                <span className="text-xs font-bold tracking-widest uppercase text-sky-400">
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
                    <p className="mt-1 italic text-slate-300">&ldquo;{project.problem}&rdquo;</p>
                  </div>

                  <div>
                    <span className="font-semibold uppercase tracking-wider text-xs text-slate-400">
                      The Solution
                    </span>
                    <p className="mt-1 italic text-slate-300">&ldquo;{project.solution}&rdquo;</p>
                  </div>
                </div>

                {/* Key Decision Card */}
                <div className="mt-6 rounded-xl border border-sky-500/30 bg-sky-500/[0.05] p-4 text-xs leading-relaxed text-slate-300">
                  <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-sky-300">
                    <Zap size={14} className="text-sky-400" />
                    <span>Key Decision</span>
                  </div>
                  <p className="mt-2">{project.keyDecision}</p>
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
                      className="rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
