'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Rocket, Search, ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/ui/Container';

const steps = [
  {
    step: '01',
    title: 'Understand',
    tag: 'CONSTRAINTS & SCOPE',
    description: 'Map data flows, failure modes, rate limits, and latency budgets before writing code.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Design',
    tag: 'SCHEMA & CONTRACTS',
    description: 'Model database schemas, establish strict JSON schema contracts, and architect fallback routers.',
    icon: Database,
  },
  {
    step: '03',
    title: 'Build',
    tag: 'TYPESAFE EXECUTION',
    description: 'Develop vertical slices with full TypeScript type-safety, robust validation, and clean state handling.',
    icon: Code2,
  },
  {
    step: '04',
    title: 'Deploy',
    tag: 'CI/CD & MONITORING',
    description: 'Continuous deployment with edge caching, automated build validation, and uptime telemetry.',
    icon: Rocket,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function Process() {
  return (
    <section id="process" className="py-20 md:py-28 border-t border-[--border-subtle]">
      <Container>
        <SectionHeader
          eyebrow="04 // ENGINEERING PROCESS"
          title="How I Architect & Ship Systems"
          description="A deterministic 4-stage development pipeline designed to prevent regressions and guarantee production reliability."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                variants={itemVariants}
                className="surface-panel group relative overflow-hidden rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[--border-strong]"
              >
                <div className="flex items-center justify-between font-mono text-xs text-[--text-tertiary]">
                  <span className="font-bold text-[--accent-warm]">{step.step}</span>
                  <span className="rounded border border-[--border-subtle] bg-[--bg-surface-2] px-2 py-0.5 text-[9px] text-[--accent-cool]">
                    {step.tag}
                  </span>
                </div>

                <div className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[--bg-surface-2] border border-[--border-subtle] text-[--accent-warm] transition-colors group-hover:border-[--accent-warm]">
                  <Icon size={19} />
                </div>

                <h3 className="mt-4 font-mono text-base font-bold text-[--text-primary] tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[--text-secondary]">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
