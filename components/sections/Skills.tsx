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
  SiFramer,
  type IconProps,
} from '@/components/icons/TechIcons';

type Tier = 'Core' | 'Working' | 'Basics' | 'Exploring';
type Category = 'all' | 'backend' | 'frontend' | 'databases' | 'devops' | 'basics_exploring';

interface StackItem {
  name: string;
  category: 'backend' | 'frontend' | 'databases' | 'devops';
  tier: Tier;
  icon?: React.FC<IconProps>;
  monogram?: string;
  context: string;
  proofUrl?: string;
}

const STACK_DATA: StackItem[] = [
  // Core (strictly 8, all verified in shipped projects)
  {
    name: 'TypeScript',
    category: 'backend',
    tier: 'Core',
    icon: SiTypescript,
    context: 'Strict typing across Sovereign, Chronicle & DevGuard',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/package.json',
  },
  {
    name: 'Node.js',
    category: 'backend',
    tier: 'Core',
    icon: SiNodedotjs,
    context: 'Server runtime in Express API & GitHub webhook services',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/package.json',
  },
  {
    name: 'PostgreSQL',
    category: 'databases',
    tier: 'Core',
    icon: SiPostgresql,
    context: 'Database engine with RLS tenant policies in Sovereign',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/packages/db/prisma/migrations/20261002111243_enable_rls/migration.sql',
  },
  {
    name: 'Next.js 15',
    category: 'frontend',
    tier: 'Core',
    icon: SiNextdotjs,
    context: 'App Router with ISR & Server Actions across projects',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/package.json',
  },
  {
    name: 'React',
    category: 'frontend',
    tier: 'Core',
    icon: SiReact,
    context: 'UI component architecture and hooks state management',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/package.json',
  },
  {
    name: 'Prisma ORM',
    category: 'databases',
    tier: 'Core',
    icon: SiPrisma,
    context: 'Data modeling and boot-time migrations in Chronicle API',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/content-platform/main/package.json',
  },
  {
    name: 'Zod',
    category: 'backend',
    tier: 'Core',
    icon: SiZod,
    context: 'Runtime boundary validation on API inputs and AI outputs',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/lib/validation/schemas.ts',
  },
  {
    name: 'Express.js',
    category: 'backend',
    tier: 'Core',
    icon: SiExpress,
    context: 'REST API service for Chronicle with JWT authentication',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/content-platform/main/package.json',
  },

  // Working (verified in shipped projects and this portfolio)
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    tier: 'Working',
    icon: SiTailwindcss,
    context: 'Design token based layout & responsive utility architecture',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/package.json',
  },
  {
    name: 'Inngest',
    category: 'backend',
    tier: 'Working',
    monogram: 'IN',
    context: 'Durable workflow execution and approval loops in Sovereign',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/apps/web/package.json',
  },
  {
    name: 'Upstash Redis',
    category: 'databases',
    tier: 'Working',
    icon: SiRedis,
    context: 'Token-bucket rate limiting in DevGuard AI',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/package.json',
  },
  {
    name: 'Supabase',
    category: 'databases',
    tier: 'Working',
    icon: SiSupabase,
    context: 'Managed PostgreSQL instance with pgvector in DevGuard AI',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/dev-guard-ai/main/package.json',
  },
  {
    name: 'Vitest',
    category: 'devops',
    tier: 'Working',
    icon: SiVitest,
    context: 'Unit and integration test suites in Chronicle & DevGuard',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/package.json',
  },
  {
    name: 'GitHub Actions',
    category: 'devops',
    tier: 'Working',
    icon: SiGithubactions,
    context: 'Automated CI pipelines for linting, tests, and builds',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/chronicle/main/.github/workflows/ci.yml',
  },
  {
    name: 'Turborepo',
    category: 'devops',
    tier: 'Working',
    icon: SiTurborepo,
    context: 'Monorepo workspace orchestration in Sovereign',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/sovereign/main/package.json',
  },
  {
    name: 'Framer Motion',
    category: 'frontend',
    tier: 'Working',
    icon: SiFramer,
    context: 'Fluid micro-interactions and transitions in this portfolio',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/rajendra-bist/main/package.json',
  },

  // Basics (coursework or verified utility scripts with no exaggerated claims)
  {
    name: 'Docker',
    category: 'devops',
    tier: 'Basics',
    icon: SiDocker,
    context: '',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/content-platform/main/Dockerfile',
  },
  {
    name: 'Linux CLI',
    category: 'devops',
    tier: 'Basics',
    icon: SiGit,
    context: '',
    proofUrl: 'https://raw.githubusercontent.com/rajendrabist07/content-platform/main/scripts/smoke.sh',
  },
  {
    name: 'MongoDB',
    category: 'databases',
    tier: 'Basics',
    icon: SiMongodb,
    context: '',
  },
  {
    name: 'Python',
    category: 'backend',
    tier: 'Basics',
    icon: SiPython,
    context: '',
  },
];

const TABS: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Technologies' },
  { id: 'backend', label: 'Backend & Systems' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'databases', label: 'Databases & Storage' },
  { id: 'devops', label: 'DevOps & Tooling' },
  { id: 'basics_exploring', label: 'Basics & Exploring' },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<Category>('all');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filteredItems =
    activeTab === 'all'
      ? STACK_DATA
      : STACK_DATA.filter((item) =>
          activeTab === 'basics_exploring'
            ? item.tier === 'Basics' || item.tier === 'Exploring'
            : item.category === activeTab
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
                        : item.tier === 'Basics'
                        ? 'border-[--border-hairline] text-[--text-tertiary] bg-[--bg-surface-2]'
                        : 'border-dashed border-[--border-hairline] text-[--text-tertiary] bg-[--bg-surface-3]'
                    }`}
                  >
                    {item.tier}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[--text-primary] tracking-tight">
                  {item.name}
                </h3>

                {item.context ? (
                  <p className="mt-1 text-xs text-[--text-secondary] leading-relaxed line-clamp-2">
                    {item.context}
                  </p>
                ) : null}
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
