'use client';

import React, { useState, useRef } from 'react';
import Container from '@/components/ui/Container';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiNextdotjs,
  SiExpress,
  SiPrisma,
  SiReact,
  SiZod,
  SiTailwindcss,
  SiRedis,
  SiSupabase,
  SiGit,
  SiGithubactions,
  SiVitest,
  SiTurborepo,
  SiDocker,
  SiPython,
  SiMongodb,
  SiVercel,
  SiFramer,
} from 'react-icons/si';
import type { IconType } from 'react-icons';

type Tier = 'Core' | 'Working' | 'Exploring';
type Category = 'all' | 'backend' | 'frontend' | 'databases' | 'devops' | 'exploring';

interface StackItem {
  name: string;
  category: 'backend' | 'frontend' | 'databases' | 'devops' | 'exploring';
  tier: Tier;
  icon?: IconType;
  monogram?: string;
  context: string;
}

const STACK_DATA: StackItem[] = [
  // Core (at most 8, all in shipped projects)
  { name: 'TypeScript', category: 'backend', tier: 'Core', icon: SiTypescript, context: 'End-to-end typing in Sovereign, Chronicle & DevGuard' },
  { name: 'Node.js', category: 'backend', tier: 'Core', icon: SiNodedotjs, context: 'Server runtime in Express API & GitHub webhook services' },
  { name: 'PostgreSQL', category: 'databases', tier: 'Core', icon: SiPostgresql, context: 'Database engine with RLS isolation in Sovereign & Chronicle' },
  { name: 'Next.js 15', category: 'frontend', tier: 'Core', icon: SiNextdotjs, context: 'App Router with ISR & Server Actions across projects' },
  { name: 'Express.js', category: 'backend', tier: 'Core', icon: SiExpress, context: 'REST API service for Chronicle with JWT authentication' },
  { name: 'React', category: 'frontend', tier: 'Core', icon: SiReact, context: 'UI component architecture and hooks state management' },
  { name: 'Prisma ORM', category: 'databases', tier: 'Core', icon: SiPrisma, context: 'Data modeling and boot-time migrations in Chronicle' },
  { name: 'Zod', category: 'backend', tier: 'Core', icon: SiZod, context: 'Runtime boundary validation on API inputs and AI outputs' },

  // Working (all appear in shipped projects)
  { name: 'Tailwind CSS', category: 'frontend', tier: 'Working', icon: SiTailwindcss, context: 'Design token based layout & responsive utility architecture' },
  { name: 'Inngest', category: 'backend', tier: 'Working', monogram: 'IN', context: 'Durable workflow execution and approval loops in Sovereign' },
  { name: 'Upstash Redis', category: 'databases', tier: 'Working', icon: SiRedis, context: 'Token-bucket rate limiting in DevGuard AI' },
  { name: 'Supabase', category: 'databases', tier: 'Working', icon: SiSupabase, context: 'Managed PostgreSQL instance with pgvector extension' },
  { name: 'Vitest', category: 'devops', tier: 'Working', icon: SiVitest, context: 'Unit and integration test suites in Chronicle & DevGuard' },
  { name: 'GitHub Actions', category: 'devops', tier: 'Working', icon: SiGithubactions, context: 'Automated CI pipelines for linting, tests, and builds' },
  { name: 'Turborepo', category: 'devops', tier: 'Working', icon: SiTurborepo, context: 'Monorepo workspace orchestration in Sovereign' },
  { name: 'Git', category: 'devops', tier: 'Working', icon: SiGit, context: 'Version control discipline, atomic commits and branch hygiene' },
  { name: 'MongoDB', category: 'databases', tier: 'Working', icon: SiMongodb, context: 'Document database modeling in Vcare training projects' },
  { name: 'Vercel', category: 'devops', tier: 'Working', icon: SiVercel, context: 'Edge deployment and hosting for Next.js applications' },
  { name: 'Framer Motion', category: 'frontend', tier: 'Working', icon: SiFramer, context: 'Fluid micro-interactions and layout transitions' },

  // Exploring (clearly labelled)
  { name: 'Docker', category: 'exploring', tier: 'Exploring', icon: SiDocker, context: 'Local containerization of multi-service architectures' },
  { name: 'Python', category: 'exploring', tier: 'Exploring', icon: SiPython, context: 'Scripting and evaluation routines for AI datasets' },
];

const TABS: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Technologies' },
  { id: 'backend', label: 'Backend & Systems' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'databases', label: 'Databases & Storage' },
  { id: 'devops', label: 'DevOps & Tooling' },
  { id: 'exploring', label: 'Exploring' },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredItems =
    activeTab === 'all'
      ? STACK_DATA
      : STACK_DATA.filter((item) =>
          activeTab === 'exploring' ? item.tier === 'Exploring' : item.category === activeTab
        );

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % TABS.length;
      setActiveTab(TABS[next].id);
      tabRefs.current[next]?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + TABS.length) % TABS.length;
      setActiveTab(TABS[prev].id);
      tabRefs.current[prev]?.focus();
    }
  };

  return (
    <section id="skills" className="relative py-20 md:py-28 border-b border-[--border-hairline]">
      <div id="stack" className="absolute -top-24" />
      <Container>
        <SectionHeader
          eyebrow="TECHNICAL STACK & ARSENAL"
          title="Verified Production Tooling"
          description="Every core and working technology is anchored in shipped project code."
        />

        {/* Accessible Category Tablist */}
        <div className="mt-12 overflow-x-auto pb-2">
          <div
            role="tablist"
            aria-label="Technology Stack Categories"
            className="flex items-center gap-1.5 p-1 rounded-[--radius-card] bg-[--bg-surface-2] border border-[--border-hairline] w-max max-w-full font-mono text-xs"
          >
            {TABS.map((tab, idx) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isSelected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`px-3.5 py-1.5 rounded-[--radius-control] transition-all cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] ${
                    isSelected
                      ? 'bg-[--bg-surface-1] text-[--text-primary] font-semibold shadow-sm border border-[--border-hairline]'
                      : 'text-[--text-tertiary] hover:text-[--text-primary] border border-transparent'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stack Grid Panel */}
        <div
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                tabIndex={0}
                className="group rounded-[--radius-card] border border-[--border-hairline] bg-[--bg-surface-1] p-4 transition-all hover:border-[--border-strong] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
              >
                <div className="flex items-center justify-between mb-3">
                  {/* Real SVG brand logo: monochrome until hover/focus */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-[--radius-control] bg-[--bg-surface-2] border border-[--border-hairline] text-[--text-secondary] transition-colors group-hover:text-[--accent] group-focus-within:text-[--accent]">
                    {Icon ? (
                      <Icon size={18} aria-hidden="true" />
                    ) : (
                      /* Monogram fallback when no SVG icon exists (e.g. Inngest) */
                      <span className="font-mono font-bold text-xs text-[--text-primary]" aria-hidden="true">
                        {item.monogram}
                      </span>
                    )}
                  </div>

                  {/* Subtle Tier Label */}
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-[--radius-pill] border ${
                      item.tier === 'Core'
                        ? 'border-[--accent] text-[--accent] bg-[--accent-dim] font-semibold'
                        : item.tier === 'Working'
                        ? 'border-[--border-hairline] text-[--text-secondary] bg-[--bg-surface-2]'
                        : 'border-dashed border-[--border-hairline] text-[--text-tertiary] bg-[--bg-surface-3]'
                    }`}
                  >
                    {item.tier}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[--text-primary] tracking-tight">
                  {item.name}
                </h4>

                <p className="mt-1 text-xs text-[--text-secondary] leading-relaxed line-clamp-2">
                  {item.context}
                </p>
              </div>
            );
          })}
        </div>

        {/* Trademark & Attribution Disclaimer */}
        <div className="mt-10 pt-4 border-t border-[--border-hairline] text-center font-mono text-[11px] text-[--text-tertiary]">
          Logos are trademarks of their respective owners. CC0 simple-icons implementation.
        </div>
      </Container>
    </section>
  );
}
