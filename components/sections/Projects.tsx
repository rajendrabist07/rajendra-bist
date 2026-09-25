'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, ExternalLink, Eye, Github, Sparkles, Zap, Activity, Cpu } from 'lucide-react';
import Image from 'next/image';
import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/ui/Container';

const CASE_STUDIES = [
  {
    tag: 'PRODUCTION SYSTEM • 2026',
    title: 'DevGuard AI',
    tagline: 'Autonomous PR Security & Code Review Agent',
    image: '/images/devguard-ai-card.svg',
    lighthouse: '99/100 Perf • 0.8s LCP',
    terminalContent: `PR Webhook → [AST Static Linter]
              ↓
         [OSV.dev CVE Scanner]
              ↓
         [Vitest Test Runner]
              ↓
         [3-Tier LLM Fallback] → Verified PR Patch`,
    architectureSvg: (
      <svg viewBox="0 0 440 200" className="w-full h-auto text-[--text-secondary] font-mono text-[10px]">
        {/* Nodes */}
        <rect x="15" y="20" width="105" height="34" rx="6" fill="#10131A" stroke="#FF7A33" strokeWidth="1.5" />
        <text x="67" y="41" fill="#EDEFF2" textAnchor="middle" fontWeight="bold">PR Webhook</text>

        <rect x="165" y="20" width="110" height="34" rx="6" fill="#10131A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="220" y="41" fill="#EDEFF2" textAnchor="middle">AST Parser</text>

        <rect x="320" y="20" width="105" height="34" rx="6" fill="#10131A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="372" y="41" fill="#EDEFF2" textAnchor="middle">CVE Scanner</text>

        <rect x="80" y="120" width="125" height="34" rx="6" fill="#10131A" stroke="#34D8B0" strokeWidth="1.5" />
        <text x="142" y="141" fill="#34D8B0" textAnchor="middle" fontWeight="bold">3-Tier LLM Router</text>

        <rect x="250" y="120" width="120" height="34" rx="6" fill="#10131A" stroke="#FF7A33" strokeWidth="1.5" />
        <text x="310" y="141" fill="#FF7A33" textAnchor="middle" fontWeight="bold">GitHub Comment</text>

        {/* Connecting Animated Paths */}
        <path d="M 120 37 L 165 37" stroke="#FF7A33" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
        <path d="M 275 37 L 320 37" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <path d="M 372 54 L 372 90 L 142 90 L 142 120" stroke="#34D8B0" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M 205 137 L 250 137" stroke="#FF7A33" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
      </svg>
    ),
    problem:
      'Most AI PR reviewers hallucinate syntax and miss security vulnerabilities because they lack runtime static analysis and test validation.',
    solution:
      'Empirical tool-calling review loop that executes AST linters and vulnerability scanners before synthesizing 1-click GitHub PR review comments.',
    keyDecision:
      'Engineered a 3-tier fallback model router (Groq Llama 3.3 ➡️ Gemini 2.5 Flash ➡️ Deterministic AST rules) guaranteeing review uptime resilience under strict rate limits.',
    frontendImplementation:
      'Designed the dashboard experience around traceable review states, exposing agent steps, PR simulation, and review evidence without hiding the backend verification flow.',
    metrics: [
      { value: '3-Tier', label: 'Failover Router' },
      { value: '5 Max', label: 'Agentic Loop Cap' },
      { value: 'AST-Verified', label: 'Syntax Assurance' },
    ],
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind v4',
      'Supabase',
      'Groq 70B',
      'Gemini 2.5',
      'GitHub App API',
    ],
    liveUrl: 'https://dev-guard-ai.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/dev-guard-ai',
  },
  {
    tag: 'PRODUCTION SYSTEM • 2026',
    title: 'EduMethod AI',
    tagline: 'Cognitive EdTech Platform With Persistent Memory & pgvector RAG',
    image: '/images/edumethod-ai-card.svg',
    lighthouse: '98/100 Perf • 0.9s LCP',
    terminalContent: `Syllabus Upload → [pgvector Embeddings]
                    ↓
               [Persistent Student Memory]
                    ↓
               [Verification Audit Layer]
                    ↓
               [SM-2 Spaced Repetition] → Mastery`,
    architectureSvg: (
      <svg viewBox="0 0 440 200" className="w-full h-auto text-[--text-secondary] font-mono text-[10px]">
        <rect x="15" y="20" width="115" height="34" rx="6" fill="#10131A" stroke="#FF7A33" strokeWidth="1.5" />
        <text x="72" y="41" fill="#EDEFF2" textAnchor="middle" fontWeight="bold">Syllabus PDF</text>

        <rect x="175" y="20" width="110" height="34" rx="6" fill="#10131A" stroke="#34D8B0" strokeWidth="1.5" />
        <text x="230" y="41" fill="#34D8B0" textAnchor="middle">pgvector Store</text>

        <rect x="325" y="20" width="100" height="34" rx="6" fill="#10131A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="375" y="41" fill="#EDEFF2" textAnchor="middle">Memory Log</text>

        <rect x="80" y="120" width="125" height="34" rx="6" fill="#10131A" stroke="#34D8B0" strokeWidth="1.5" />
        <text x="142" y="141" fill="#34D8B0" textAnchor="middle" fontWeight="bold">SM-2 Algorithm</text>

        <rect x="250" y="120" width="120" height="34" rx="6" fill="#10131A" stroke="#FF7A33" strokeWidth="1.5" />
        <text x="310" y="141" fill="#FF7A33" textAnchor="middle" fontWeight="bold">Grounded Output</text>

        <path d="M 130 37 L 175 37" stroke="#34D8B0" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
        <path d="M 285 37 L 325 37" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
        <path d="M 375 54 L 375 90 L 142 90 L 142 120" stroke="#34D8B0" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M 205 137 L 250 137" stroke="#FF7A33" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
      </svg>
    ),
    problem:
      'Generic AI chatbots forget student weak areas between sessions and hallucinate answers on complex syllabus materials without grounding.',
    solution:
      'End-to-end cognitive workspace pairing long-term student memory profiles in Supabase with pgvector document grounding and an independent verification audit layer.',
    keyDecision:
      'Chose self-hosted pgvector inside PostgreSQL over external vector databases to eliminate cold starts and keep user data and vector embeddings in a single atomic transaction.',
    frontendImplementation:
      'Built the learning workspace around authenticated Next.js/React flows that connect upload, memory, verification, and spaced-repetition states to typed backend responses.',
    metrics: [
      { value: 'pgvector', label: 'Syllabus Grounding' },
      { value: 'SM-2', label: 'Spaced Repetition' },
      { value: '7 Engines', label: 'Cognitive Core' },
    ],
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Clerk Auth',
      'Supabase (pgvector)',
      'Upstash Redis',
      'Groq Router',
      'Gemini 2.5',
    ],
    liveUrl: 'https://edumethod-ai.vercel.app',
    githubUrl: 'https://github.com/rajendrabist07/edumethod-ai',
  },
  {
    tag: 'PRODUCTION SYSTEM • 2026',
    title: 'SocraticAI',
    tagline: 'Guided Reasoning & Cognitive Questioning Assistant',
    image: '/images/socratic-ai-card.svg',
    lighthouse: '99/100 Perf • 0.7s LCP',
    terminalContent: `Student Query → [Negative Constraint Filter]
                    ↓
               [Step-by-Step Reasoning Coach]
                    ↓
               [MongoDB Session Persistence]`,
    architectureSvg: (
      <svg viewBox="0 0 440 200" className="w-full h-auto text-[--text-secondary] font-mono text-[10px]">
        <rect x="20" y="20" width="110" height="34" rx="6" fill="#10131A" stroke="#FF7A33" strokeWidth="1.5" />
        <text x="75" y="41" fill="#EDEFF2" textAnchor="middle" fontWeight="bold">Student Query</text>

        <rect x="170" y="20" width="120" height="34" rx="6" fill="#10131A" stroke="#34D8B0" strokeWidth="1.5" />
        <text x="230" y="41" fill="#34D8B0" textAnchor="middle">Negative Mask</text>

        <rect x="170" y="120" width="120" height="34" rx="6" fill="#10131A" stroke="#FF7A33" strokeWidth="1.5" />
        <text x="230" y="141" fill="#FF7A33" textAnchor="middle" fontWeight="bold">Socratic Guide</text>

        <rect x="320" y="120" width="105" height="34" rx="6" fill="#10131A" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="372" y="141" fill="#EDEFF2" textAnchor="middle">MongoDB Log</text>

        <path d="M 130 37 L 170 37" stroke="#FF7A33" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
        <path d="M 230 54 L 230 120" stroke="#34D8B0" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d="M 290 137 L 320 137" stroke="#FF7A33" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
      </svg>
    ),
    problem:
      'Students use AI to copy direct answers instead of learning core problem-solving intuition and deep conceptual reasoning.',
    solution:
      'Constrained LLM agent that enforces strict negative prompt boundaries and locked temperature (0.4–0.6) to guide students through Socratic step-by-step reasoning.',
    keyDecision:
      'Implemented persistent session storage in MongoDB Atlas with structured feedback loops rather than stateless chat sessions.',
    frontendImplementation:
      'Shaped the chat interface around saved learning sessions and guided-question pacing so the UI reinforces Socratic learning instead of direct answer delivery.',
    metrics: [
      { value: 'Zero-Direct', label: 'Solution Masking' },
      { value: '0.4–0.6', label: 'Locked Temperature' },
      { value: 'MongoDB', label: 'Session Retention' },
    ],
    stack: [
      'Next.js 15',
      'Gemini API',
      'MongoDB',
      'Node.js',
      'TypeScript',
      'Tailwind CSS',
    ],
    liveUrl: 'https://socratic-ai-tau.vercel.app/',
    githubUrl: 'https://github.com/rajendrabist07/socratic-ai.git',
  },
];

function ProjectVisualCard({ project }: { project: (typeof CASE_STUDIES)[number] }) {
  const [activeView, setActiveView] = useState<'preview' | 'architecture'>('preview');

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-2xl border border-[--border-strong] bg-[--bg-surface-2] shadow-2xl">
        {/* Titlebar with Tab Switcher & Lighthouse Badge */}
        <div className="flex items-center justify-between border-b border-[--border-subtle] bg-[--bg-surface] px-4 py-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#FF5D5D]/80" />
            <span className="h-3 w-3 rounded-full bg-[#FF7A33]/80" />
            <span className="h-3 w-3 rounded-full bg-[#34D8B0]/80" />
            <span className="ml-2 text-[11px] text-[--accent-cool] hidden sm:inline-block">
              {project.lighthouse}
            </span>
          </div>

          <div className="flex items-center rounded-lg border border-[--border-subtle] bg-[--bg-surface-2] p-0.5">
            <button
              type="button"
              onClick={() => setActiveView('preview')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm] ${
                activeView === 'preview'
                  ? 'bg-[--accent-warm] text-[#050608] shadow'
                  : 'text-[--text-secondary] hover:text-[--text-primary]'
              }`}
            >
              <Eye size={12} />
              Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveView('architecture')}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm] ${
                activeView === 'architecture'
                  ? 'bg-[--accent-warm] text-[#050608] shadow'
                  : 'text-[--text-secondary] hover:text-[--text-primary]'
              }`}
            >
              <Code2 size={12} />
              Architecture Flow
            </button>
          </div>
        </div>

        {/* Visual Content Box */}
        <div className="relative min-h-[260px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeView === 'preview' ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative aspect-video w-full overflow-hidden bg-[--bg-void]"
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
                className="flex flex-col items-center justify-center p-6 bg-[--bg-surface-2]"
              >
                {project.architectureSvg}
                <div className="mt-4 w-full rounded-lg border border-[--border-subtle] bg-[--bg-surface] p-3 text-[11px] font-mono text-[--accent-cool] overflow-x-auto">
                  <pre>{project.terminalContent}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 font-mono text-xs">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="premium-button-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm]"
          >
            Live System <ExternalLink size={14} />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="premium-button-secondary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm]"
          >
            Source Code <Github size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 border-t border-[--border-subtle]">
      <Container>
        <SectionHeader
          eyebrow="03 // FEATURED PROJECTS"
          title="Production Systems & Case Studies"
          description="Real-world architectures structured around Problem, Solution, Key Decision, and Frontend Implementation."
        />

        <div className="mt-14 space-y-24">
          {CASE_STUDIES.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start"
            >
              {/* Left Column: Visual Card with Architecture Draw-In */}
              <ProjectVisualCard project={project} />

              {/* Right Column: Staff-Level Case Study Narrative */}
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-[--accent-warm]">
                  {project.tag}
                </span>

                <h3 className="mt-2 text-2xl font-black tracking-tight text-[--text-primary] sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-[--text-secondary]">
                  {project.tagline}
                </p>

                {/* Problem & Solution */}
                <div className="mt-5 space-y-3.5 text-sm leading-relaxed">
                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[--text-tertiary]">
                      The Problem
                    </span>
                    <p className="mt-1 italic text-[--text-secondary]">
                      &ldquo;{project.problem}&rdquo;
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[--text-tertiary]">
                      The Solution
                    </span>
                    <p className="mt-1 italic text-[--text-secondary]">
                      &ldquo;{project.solution}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Key Decision Callout Card */}
                <div className="mt-5 rounded-xl border border-[--border-strong] bg-[--bg-surface-2] p-4 text-xs leading-relaxed text-[--text-secondary]">
                  <div className="flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider text-[--accent-warm]">
                    <Zap size={14} className="text-[--accent-warm]" />
                    <span>Key Architectural Decision</span>
                  </div>
                  <p className="mt-2 text-[--text-primary]">{project.keyDecision}</p>
                </div>

                {/* Frontend Implementation */}
                <div className="mt-3 rounded-xl border border-[--border-subtle] bg-[--bg-surface] p-4 text-xs leading-relaxed text-[--text-secondary]">
                  <div className="flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider text-[--accent-cool]">
                    <Sparkles size={14} className="text-[--accent-cool]" />
                    <span>Frontend Implementation</span>
                  </div>
                  <p className="mt-2">{project.frontendImplementation}</p>
                </div>

                {/* Metrics Grid */}
                <div className="mt-5 grid grid-cols-3 gap-2.5 font-mono">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-xl border border-[--border-subtle] bg-[--bg-surface-2] p-3 text-center"
                    >
                      <p className="text-sm font-bold text-[--text-primary] sm:text-base">
                        {metric.value}
                      </p>
                      <p className="mt-0.5 text-[10px] text-[--text-tertiary]">
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Chips */}
                <div className="mt-5 flex flex-wrap gap-1.5 font-mono text-xs">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[--border-subtle] bg-[--bg-surface-2] px-2.5 py-1 text-[11px] text-[--text-secondary]"
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
