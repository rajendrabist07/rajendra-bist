'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Blocks, BrainCircuit, Database, Network, ShieldCheck, Cpu } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Container from '@/components/ui/Container';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

const strengths = [
  {
    title: 'Systems-First Architecture',
    description: 'Establish strict database schemas, API contracts, and failure boundaries prior to client execution.',
    icon: Network,
    badge: 'ARCHITECTURE',
  },
  {
    title: 'Contract-Driven Full-Stack',
    description: 'Bridge complex client state with typed backend endpoints, ensuring zero runtime data mismatch.',
    icon: Blocks,
    badge: 'TYPESAFE',
  },
  {
    title: 'High-Throughput Backend',
    description: 'Architecting secure authentications, rate limiting, MongoDB & PostgreSQL transactions, and caching.',
    icon: Database,
    badge: 'PERFORMANCE',
  },
  {
    title: 'Deterministic AI Guardrails',
    description: 'Grounded RAG retrieval pipelines and multi-tier LLM fallback routers that eliminate hallucinations.',
    icon: BrainCircuit,
    badge: 'RELIABILITY',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 border-t border-[--border-subtle]">
      <Container>
        <SectionHeader
          eyebrow="01 // ARCHITECTURE & PHILOSOPHY"
          title="Engineering Systems with Rigor"
          description="Proof of competence through verifiable systems, strict typing, and fault-tolerant architecture."
        />

        {/* Systems Narrative */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-8 space-y-5 text-base leading-relaxed text-[--text-secondary] sm:text-lg sm:leading-8"
        >
          <motion.p variants={itemVariants}>
            I&apos;m a full-stack and backend systems engineer based in Nepal working primarily with{' '}
            <span className="text-[--text-primary] font-medium">React, Next.js 15, Node.js, TypeScript, and PostgreSQL</span>.
            My primary strength is backend architecture, but I build the inspectable, responsive frontend flows that make those systems reliable for real users.
          </motion.p>
          <motion.p variants={itemVariants}>
            My engineering strategy is <span className="text-[--accent-warm] font-semibold">systems-first</span>: define rigid database models, enforce schema validation, and architect fallback paths before writing UI code. I&apos;ve shipped production systems including AST static analysis review agents, vector similarity search with pgvector, and resilient multi-model LLM streaming pipelines.
          </motion.p>
          <motion.p variants={itemVariants}>
            In modern AI engineering, I bridge probabilistic LLMs with deterministic software rigor — implementing grounded RAG pipelines, schema guardrails, and automated token budgets that guarantee zero hallucination across mission-critical workflows.
          </motion.p>
        </motion.div>

        {/* 4 Architectural Strengths Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {strengths.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={itemVariants}
                className="surface-panel group rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[--border-strong]"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[--bg-surface-2] border border-[--border-subtle] text-[--accent-warm] transition-colors group-hover:border-[--accent-warm]">
                    <Icon size={19} />
                  </span>
                  <span className="rounded border border-[--border-subtle] bg-[--bg-surface-2] px-2 py-0.5 font-mono text-[10px] text-[--accent-cool]">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-4 font-mono text-sm font-bold text-[--text-primary] tracking-tight">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[--text-secondary]">{item.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
