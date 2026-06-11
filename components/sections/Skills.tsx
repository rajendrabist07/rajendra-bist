"use client";

import { motion } from "framer-motion";
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

export default function Skills() {
  return (
    <section id="skills" className="px-6 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader subtitle="Skills" title="Technical Skills" />
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
              className="surface-panel rounded-3xl border border-white/10 p-6 hover:border-white/20 transition"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
                {skill.category}
              </p>
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
                    <SkillBadge label={item} />
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
