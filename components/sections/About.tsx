"use client";

import { motion } from "framer-motion";
import { Blocks, BrainCircuit, Database, GraduationCap, Network, Rocket } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

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

const strengths = [
  {
    title: "Systems-first mindset",
    description: "I think through data flow, API boundaries, failure cases, and maintainability before polishing the UI.",
    icon: Network,
  },
  {
    title: "Full-stack execution",
    description: "Comfortable moving from responsive interfaces to Node.js APIs, MongoDB schemas, and deployment workflows.",
    icon: Blocks,
  },
  {
    title: "Backend depth",
    description: "Focused on authentication, database modelling, REST contracts, real-time systems, and production-ready foundations.",
    icon: Database,
  },
  {
    title: "AI product thinking",
    description: "Building LLM-powered experiences where prompts, context, streaming UX, and persistence work together.",
    icon: BrainCircuit,
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader subtitle="About" title="Builder With a Systems Mindset" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <motion.div variants={itemVariants} className="surface-panel rounded-3xl p-8 shadow-glow">
            <p className="text-xl leading-9 text-slate-200">
              I&apos;m Rajendra Bist, a full-stack developer trained in Full-Stack Web Development at
              Vcare Technical Institute. I build with a systems-first approach: clear data models,
              predictable APIs, resilient backend logic, and interfaces that feel fast and focused.
            </p>
            <p className="mt-6 text-base leading-8 text-slate-400">
              My strongest direction is backend-heavy full-stack work: Node.js, MongoDB, API architecture,
              real-time communication, and AI-integrated products. I care about the engineering behind the
              screen as much as the pixels on it, because useful products need both good experience and
              solid foundations.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <GraduationCap className="text-indigo-300" size={24} />
                <p className="mt-4 text-sm text-slate-500">Training</p>
                <p className="mt-1 font-semibold text-white">Full-Stack Web Development</p>
                <p className="mt-1 text-sm text-slate-400">Vcare Technical Institute</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <Rocket className="text-indigo-300" size={24} />
                <p className="mt-4 text-sm text-slate-500">Current Focus</p>
                <p className="mt-1 font-semibold text-white">SocraticAI and backend architecture</p>
                <p className="mt-1 text-sm text-slate-400">LLM UX, streaming, MongoDB, APIs</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={containerVariants} className="grid gap-4 sm:grid-cols-2">
            {strengths.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={itemVariants}
                  className="surface-panel rounded-3xl p-6 transition hover:border-indigo-400/40"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
