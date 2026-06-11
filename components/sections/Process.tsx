"use client";

import { motion } from "framer-motion";
import { Code2, Database, Rocket, Search } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

const steps = [
  {
    title: "Understand",
    description: "Clarify the product goal, user flow, and technical constraints before writing code.",
    icon: Search,
  },
  {
    title: "Design",
    description: "Plan data models, API boundaries, UI states, and deployment needs with maintainability in mind.",
    icon: Database,
  },
  {
    title: "Build",
    description: "Ship focused frontend and backend slices, keeping components reusable and APIs predictable.",
    icon: Code2,
  },
  {
    title: "Deploy",
    description: "Test the build, configure environment variables, and deploy through Vercel with clean documentation.",
    icon: Rocket,
  },
];

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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55 },
  },
};

export default function Process() {
  return (
    <section id="process" className="px-6 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader subtitle="Process" title="How I Build Products" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid gap-4 md:grid-cols-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.title}
                variants={itemVariants}
                className="surface-panel relative overflow-hidden rounded-3xl p-6"
              >
                <p className="text-sm text-slate-500">0{index + 1}</p>
                <div className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300">
                  <Icon size={20} />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
