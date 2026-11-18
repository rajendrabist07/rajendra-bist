import React from 'react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import { Hammer, GraduationCap, Calendar, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface TimelineEntry {
  title: string;
  organization: string;
  timeframe: string;
  outcome: string;
  stack?: string[];
  link?: string;
}

const BUILDING_MILESTONES: TimelineEntry[] = [
  {
    title: 'Sovereign — Multi-Tenant B2B SaaS',
    organization: 'Independent Project',
    timeframe: 'Oct 2026 – Present',
    outcome: 'Architected PostgreSQL RLS tenant isolation with Inngest durable workflow runs and human approval UI.',
    stack: ['PostgreSQL (RLS)', 'Next.js 15', 'Inngest', 'Turborepo'],
    link: '#projects',
  },
  {
    title: 'Chronicle — Publishing Platform',
    organization: 'Independent Project',
    timeframe: 'Sep 2026',
    outcome: 'Shipped two-service architecture (Next.js on Vercel + Express on Render) with Zod-validated Gemini AI tools.',
    stack: ['Next.js', 'Express', 'Prisma', 'PostgreSQL'],
    link: '#projects',
  },
  {
    title: 'DevGuard AI — PR Review App',
    organization: 'Independent Project',
    timeframe: 'Jul 2026 – Aug 2026',
    outcome: 'Engineered GitHub App with 3-tier model router (Groq → Gemini → rules), HMAC webhooks, and AST linting.',
    stack: ['Node.js', 'Groq', 'Gemini', 'Redis'],
    link: '#projects',
  },
];

const LEARNING_MILESTONES: TimelineEntry[] = [
  {
    title: 'Diploma in IT (Full-Stack Web Dev)',
    organization: 'Vcare Technical Institute · India',
    timeframe: '2025 – 2026',
    outcome: 'Completed practical engineering training in REST APIs, JWT authentication, MongoDB, and production deployment.',
    stack: ['Node.js', 'Express', 'React', 'MongoDB'],
  },
  {
    title: 'Higher Secondary (+2 Science)',
    organization: 'Kailali Multiple Campus · Nepal',
    timeframe: '2022',
    outcome: 'Rigorous foundational background in Physics, Chemistry, and Mathematics (Class XII equivalent).',
    stack: ['Mathematics', 'Physics', 'Chemistry'],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-28 border-b border-[--border-hairline]">
      <Container>
        <SectionHeader
          eyebrow="CHRONOLOGY & TRACK RECORD"
          title="Dual-Lane Experience Timeline"
          description="Parallel progression across self-directed production software and structured technical education."
        />

        {/* "Today" Live Marker */}
        <div className="mt-12 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[--border-strong] bg-[--bg-surface-2] px-4 py-1.5 font-mono text-xs text-[--text-primary] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[--status-live] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[--status-live]" />
            </span>
            <span className="font-semibold text-[--text-primary]">Today</span>
            <span className="text-[--text-tertiary]">·</span>
            <span className="text-[--text-secondary]">Active SDE Search (Delhi NCR / Remote)</span>
          </div>
        </div>

        {/* Dual Lane Desktop Grid / Single Column Mobile */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative">
          {/* Subtle center dividing guideline on desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-[--border-hairline] -translate-x-1/2 pointer-events-none" />

          {/* Lane 1: Building */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[--border-hairline] font-mono text-xs text-[--accent] font-semibold uppercase tracking-wider">
              <Hammer size={15} />
              <span>Building · Shipped Software</span>
            </div>

            <div className="space-y-4">
              {BUILDING_MILESTONES.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-5 transition-all hover:border-[--border-strong] focus-within:ring-2 focus-within:ring-[--focus-ring]"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-[--text-primary] tracking-tight">
                      {item.link ? (
                        <Link
                          href={item.link}
                          className="hover:text-[--accent] inline-flex items-center gap-1 focus:outline-none"
                        >
                          {item.title}
                          <ArrowUpRight size={13} className="text-[--text-tertiary]" />
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h4>
                    <span className="shrink-0 inline-flex items-center gap-1 font-mono text-[11px] text-[--text-tertiary] bg-[--bg-surface-2] px-2 py-0.5 rounded-[--radius-control]">
                      <Calendar size={11} />
                      {item.timeframe}
                    </span>
                  </div>

                  <p className="text-xs text-[--text-secondary] leading-relaxed mb-3">
                    {item.outcome}
                  </p>

                  {item.stack && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[--border-hairline]">
                      {item.stack.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-[--text-tertiary] bg-[--bg-surface-2] px-2 py-0.5 rounded-[--radius-control]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          {/* Lane 2: Learning */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[--border-hairline] font-mono text-xs text-[--text-secondary] font-semibold uppercase tracking-wider">
              <GraduationCap size={15} className="text-[--accent]" />
              <span>Learning · Education & Training</span>
            </div>

            <div className="space-y-4">
              {LEARNING_MILESTONES.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-5 transition-all hover:border-[--border-strong] focus-within:ring-2 focus-within:ring-[--focus-ring]"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-[--text-primary] tracking-tight">
                      {item.title}
                    </h4>
                    <span className="shrink-0 inline-flex items-center gap-1 font-mono text-[11px] text-[--text-tertiary] bg-[--bg-surface-2] px-2 py-0.5 rounded-[--radius-control]">
                      <Calendar size={11} />
                      {item.timeframe}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-[--accent] mb-2">
                    {item.organization}
                  </div>

                  <p className="text-xs text-[--text-secondary] leading-relaxed mb-3">
                    {item.outcome}
                  </p>

                  {item.stack && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[--border-hairline]">
                      {item.stack.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] text-[--text-tertiary] bg-[--bg-surface-2] px-2 py-0.5 rounded-[--radius-control]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
