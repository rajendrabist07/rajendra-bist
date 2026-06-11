"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Braces,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Server,
  Zap,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { SKILLS } from "@/lib/portfolio-data";
import SkillBadge from "@/components/ui/SkillBadge";

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
    transition: { duration: 0.6 },
  },
};

const categoryIcons = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  "Tools & DevOps": Cloud,
  "AI & APIs": Bot,
};

const skillIcons = {
  React: Braces,
  "Next.js 15": Layers3,
  TypeScript: Code2,
  "Tailwind CSS": Zap,
  HTML5: Code2,
  CSS3: Code2,
  "Node.js": Server,
  "Express.js": Server,
  "REST APIs": Braces,
  "Socket.io": Zap,
  MongoDB: Database,
  Mongoose: Database,
  PostgreSQL: Database,
  Git: GitBranch,
  GitHub: GitBranch,
  Vercel: Cloud,
  Railway: Cloud,
  Docker: Cloud,
  "Gemini API": Bot,
  "Vercel AI SDK": Bot,
  "LangChain.js": Bot,
};

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader subtitle="Skills" title="Engineering Toolkit" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2"
        >
          {SKILLS.map((skill) => (
            <motion.div
              key={skill.category}
              variants={itemVariants}
              className="surface-panel group rounded-3xl border border-white/10 p-6 transition hover:border-indigo-400/40 hover:bg-white/[0.045]"
            >
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300 transition group-hover:bg-indigo-500 group-hover:text-white">
                  {(() => {
                    const Icon = categoryIcons[skill.category as keyof typeof categoryIcons] || Code2;
                    return <Icon size={22} />;
                  })()}
                </span>
                <div>
                  <p className="text-lg font-semibold text-white">{skill.category}</p>
                  <p className="mt-1 text-sm text-slate-500">{skill.items.length} production-focused tools</p>
                </div>
              </div>
              <motion.div
                className="mt-5 flex flex-wrap gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, staggerChildren: 0.05 }}
              >
                {skill.items.map((item) => (
                  <motion.div
                    key={item}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    <SkillBadge label={item} icon={skillIcons[item as keyof typeof skillIcons]} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
