'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { EXPERIENCE } from '@/lib/portfolio-data';
import Container from '@/components/ui/Container';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28 border-t border-[--border-subtle]">
      <Container>
        <SectionHeader
          eyebrow="05 // EXPERIENCE & TIMELINE"
          title="Work & Systems Timeline"
          description="Track record of shipping production APIs, AI workflows, and type-safe web applications."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="relative ml-3 border-l-2 border-[--border-strong] pl-6 sm:ml-6 sm:pl-10 space-y-12"
        >
          {EXPERIENCE.map((exp, index) => (
            <motion.div key={index} variants={itemVariants} className="relative group">
              {/* Timeline Indicator Dot */}
              <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[--accent-warm] bg-[--bg-void] shadow-[0_0_12px_rgba(255,122,51,0.35)]">
                <span className="h-2 w-2 rounded-full bg-[--accent-warm]" />
              </span>

              {/* Experience Card */}
              <article className="surface-panel rounded-2xl p-6 sm:p-8 transition-all duration-200 hover:-translate-y-1 hover:border-[--border-strong]">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[--border-strong] bg-[--bg-surface-2] px-3 py-1 font-mono text-xs font-semibold text-[--accent-warm] mb-3">
                      <Briefcase size={13} />
                      {exp.company}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-[--text-primary] tracking-tight">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[--text-tertiary]">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[--border-subtle] bg-[--bg-surface-2] px-2.5 py-1">
                      <Calendar size={13} className="text-[--accent-warm]" />
                      {exp.timeframe}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[--border-subtle] bg-[--bg-surface-2] px-2.5 py-1">
                      <MapPin size={13} className="text-[--text-tertiary]" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[--text-secondary]">
                  {exp.description}
                </p>

                {/* Key Measurable Outcomes */}
                <div className="mt-5 space-y-2">
                  {exp.achievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[--text-secondary]">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[--accent-cool]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Stack Chips */}
                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-[--border-subtle] font-mono text-xs">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[--border-subtle] bg-[--bg-surface-2] px-2.5 py-1 text-[11px] text-[--text-secondary]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
