"use client";

import { motion } from "framer-motion";
import { Award, BookOpen, Calendar, CheckCircle2, Clock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import SkillBadge from "@/components/ui/SkillBadge";
import { CREDENTIALS } from "@/lib/portfolio-data";

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Credentials() {
  return (
    <section id="credentials" className="px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeader subtitle="Credentials" title="Education & Professional Training" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2"
        >
          {CREDENTIALS.map((item, index) => {
            const isCompleted = item.status === "Completed";
            return (
              <motion.article
                key={index}
                variants={itemVariants}
                className="surface-panel relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 shadow-glow border border-white/10 transition hover:border-indigo-400/30"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
                      {isCompleted ? <Award size={22} /> : <BookOpen size={22} />}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold border ${
                        isCompleted
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-300 border-amber-500/20"
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 size={13} /> : <Clock size={13} />}
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs uppercase tracking-wider text-indigo-400 font-semibold">
                    {item.credentialType}
                  </p>

                  <h3 className="mt-1 text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium text-slate-300">
                    {item.institution}
                  </p>

                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar size={13} className="text-slate-500" />
                    <span>{item.timeframe}</span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/5">
                  <p className="text-xs font-semibold text-slate-400 mb-2.5 uppercase tracking-wider">
                    Core Focus & Topics
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.topics.map((topic) => (
                      <SkillBadge key={topic} label={topic} />
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
