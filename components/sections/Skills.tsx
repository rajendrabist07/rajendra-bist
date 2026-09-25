'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Binary,
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Network,
  Server,
  ShieldCheck,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/ui/Container';

interface ToolItem {
  name: string;
  category: 'backend' | 'databases' | 'devops' | 'frontend' | 'aiml';
  badge: 'CORE' | 'EXPLORING';
  icon: LucideIcon;
}

const ALL_TOOLS: ToolItem[] = [
  // Backend Core
  { name: 'Node.js', category: 'backend', badge: 'CORE', icon: Server },
  { name: 'TypeScript', category: 'backend', badge: 'CORE', icon: Code2 },
  { name: 'Express.js', category: 'backend', badge: 'CORE', icon: Server },
  { name: 'REST APIs', category: 'backend', badge: 'CORE', icon: Network },
  { name: 'Zod Validation', category: 'backend', badge: 'CORE', icon: ShieldCheck },
  { name: 'JWT Security', category: 'backend', badge: 'CORE', icon: ShieldCheck },
  { name: 'WebSockets', category: 'backend', badge: 'CORE', icon: Zap },

  // Databases Core
  { name: 'PostgreSQL', category: 'databases', badge: 'CORE', icon: Database },
  { name: 'MongoDB Atlas', category: 'databases', badge: 'CORE', icon: Database },
  { name: 'Supabase pgvector', category: 'databases', badge: 'CORE', icon: Database },
  { name: 'Mongoose ORM', category: 'databases', badge: 'CORE', icon: Database },
  { name: 'Upstash Redis', category: 'databases', badge: 'CORE', icon: Database },

  // DevOps & Cloud
  { name: 'Docker', category: 'devops', badge: 'CORE', icon: Cloud },
  { name: 'Git & GitHub', category: 'devops', badge: 'CORE', icon: GitBranch },
  { name: 'GitHub Actions CI/CD', category: 'devops', badge: 'CORE', icon: Workflow },
  { name: 'Vercel Edge', category: 'devops', badge: 'CORE', icon: Cloud },
  { name: 'Linux / Bash', category: 'devops', badge: 'CORE', icon: Cpu },

  // Frontend
  { name: 'Next.js 15 (App Router)', category: 'frontend', badge: 'CORE', icon: Layers },
  { name: 'React 19', category: 'frontend', badge: 'CORE', icon: Code2 },
  { name: 'Tailwind CSS v4', category: 'frontend', badge: 'CORE', icon: Zap },
  { name: 'Framer Motion', category: 'frontend', badge: 'CORE', icon: Zap },

  // AI & Systems
  { name: 'RAG Pipelines', category: 'aiml', badge: 'CORE', icon: BrainCircuit },
  { name: 'Google Gemini 2.5', category: 'aiml', badge: 'CORE', icon: Bot },
  { name: 'Groq LLM Engine', category: 'aiml', badge: 'CORE', icon: Zap },
  { name: 'Tool-Calling Agents', category: 'aiml', badge: 'CORE', icon: Bot },
  { name: 'Vector Embeddings', category: 'aiml', badge: 'CORE', icon: BrainCircuit },
  { name: 'LangChain.js', category: 'aiml', badge: 'EXPLORING', icon: Binary },
  { name: 'LLM-as-Judge Evals', category: 'aiml', badge: 'EXPLORING', icon: ShieldCheck },
];

const TABS = [
  { id: 'all', label: 'ALL' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'databases', label: 'DATABASES' },
  { id: 'devops', label: 'DEVOPS & CLOUD' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'aiml', label: 'AI & VECTOR' },
] as const;

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredTools =
    activeTab === 'all'
      ? ALL_TOOLS
      : ALL_TOOLS.filter((t) => t.category === activeTab);

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-[--border-subtle]">
      <Container>
        <SectionHeader
          eyebrow="02 // TECH ARSENAL"
          title="Production Stack & Tooling"
          description="Technologies verified through real-world deployment, typed contracts, and measurable throughput."
        />

        {/* Filter Tabs */}
        <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-[--border-subtle] pb-4 font-mono text-xs">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-md px-3 py-1.5 font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm] ${
                  isActive
                    ? 'text-[--accent-warm]'
                    : 'text-[--text-secondary] hover:text-[--text-primary]'
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-[--accent-warm] shadow-[0_0_10px_var(--accent-warm)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tools Grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 font-mono text-xs"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              const isCore = tool.badge === 'CORE';

              return (
                <motion.div
                  key={tool.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.18 }}
                  className={`group relative flex items-center justify-between gap-2 rounded-xl p-3.5 transition-all duration-200 hover:-translate-y-0.5 ${
                    isCore
                      ? 'border border-[--border-strong] bg-[--bg-surface-2] text-[--text-primary] hover:border-[--accent-warm]'
                      : 'border border-dashed border-[--border-subtle] bg-[--bg-surface] text-[--text-secondary] hover:border-[--border-strong]'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Icon
                      size={16}
                      className={`shrink-0 transition-colors group-hover:text-[--accent-warm] ${
                        isCore ? 'text-[--accent-warm]' : 'text-[--text-tertiary]'
                      }`}
                    />
                    <span className="truncate font-medium">{tool.name}</span>
                  </div>

                  <span
                    className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider ${
                      isCore
                        ? 'border border-[--accent-cool-dim] bg-[--accent-cool-dim] text-[--accent-cool]'
                        : 'border border-[--border-subtle] bg-[--bg-surface] text-[--text-tertiary]'
                    }`}
                  >
                    {tool.badge}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
