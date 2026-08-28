"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SkillBadge from "@/components/ui/SkillBadge";
import { EXPERIENCE } from "@/lib/portfolio-data";
import Container from "@/components/ui/Container";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="py-20 md:py-28">
      <Container>
        <SectionHeader subtitle="Experience" title="Work & Engineering Timeline" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="relative ml-3 border-l-2 border-indigo-500/20 pl-6 sm:ml-6 sm:pl-10 space-y-12"
        >
          {EXPERIENCE.map((exp, index) => (
            <motion.div key={index} variants={itemVariants} className="relative group">
              {/* Timeline Indicator Dot */}
              <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-indigo-400/80 bg-[#0a0a0f] shadow-[0_0_12px_rgba(99,102,241,0.5)]">
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
              </span>

              {/* Experience Card */}
              <article className="surface-panel rounded-3xl p-6 sm:p-8 shadow-glow border border-white/10 transition hover:border-indigo-400/30">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 mb-3">
                      <Briefcase size={13} />
                      {exp.company}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1">
                      <Calendar size={14} className="text-indigo-400" />
                      {exp.timeframe}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.03] px-2.5 py-1">
                      <MapPin size={14} className="text-slate-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-300">
                  {exp.description}
                </p>

                {/* Key Achievements Bullet points */}
                <div className="mt-5 space-y-2">
                  {exp.achievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-400">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Tags */}
                <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {exp.stack.map((tech) => (
                    <SkillBadge key={tech} label={tech} />
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
