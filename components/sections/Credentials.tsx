'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Calendar, CheckCircle2, Clock } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { CREDENTIALS } from '@/lib/portfolio-data';
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

export default function Credentials() {
  return (
    <section id="credentials" className="py-20 md:py-28 border-t border-[--border-subtle]">
      <Container>
        <SectionHeader
          eyebrow="06 // CREDENTIALS & TRAINING"
          title="Education & Verified Training"
          description="Formal software engineering foundation and industry-standard technical accreditations."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2"
        >
          {CREDENTIALS.map((item, index) => {
            const isCompleted = item.status === 'Completed';
            return (
              <motion.article
                key={index}
                variants={itemVariants}
                className="surface-panel relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all duration-200 hover:-translate-y-1 hover:border-[--border-strong]"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4 font-mono text-xs">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[--bg-surface-2] border border-[--border-subtle] text-[--accent-warm]">
                      {isCompleted ? <Award size={20} /> : <BookOpen size={20} />}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold border ${
                        isCompleted
                          ? 'bg-[--accent-cool-dim] text-[--accent-cool] border-[--accent-cool-dim]'
                          : 'bg-[--accent-warm-dim] text-[--accent-warm] border-[--accent-warm-dim]'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                      {item.status}
                    </span>
                  </div>

                  <p className="font-mono text-xs uppercase tracking-wider text-[--accent-warm] font-semibold">
                    {item.credentialType}
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-[--text-primary] tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-[--text-secondary]">
                    {item.institution}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-[--text-tertiary]">
                    <Calendar size={13} className="text-[--text-tertiary]" />
                    <span>{item.timeframe}</span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-[--text-secondary]">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[--border-subtle]">
                  <p className="font-mono text-[11px] font-semibold text-[--text-tertiary] mb-2.5 uppercase tracking-wider">
                    Core Focus &amp; Topics
                  </p>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {item.topics.map((topic) => (
                      <span
                        key={topic}
                        className="rounded-md border border-[--border-subtle] bg-[--bg-surface-2] px-2.5 py-1 text-[11px] text-[--text-secondary]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
