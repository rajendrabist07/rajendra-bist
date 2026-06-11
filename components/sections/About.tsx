"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { EDUCATION } from "@/lib/portfolio-data";

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

export default function About() {
  return (
    <section id="about" className="px-6 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeader subtitle="About" title="About Me" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="space-y-6 text-slate-300"
        >
          <motion.p variants={itemVariants}>
            I&apos;m a full-stack developer from Nepal, trained at Vcare
            Technical Institute where I built a strong foundation across the
            entire web stack — from designing database schemas to shipping
            deployed frontends. I completed my +2 Science at KMC (Kailali
            Multiple Campus) and my schooling at Shree Phulwari Secondary
            School.
          </motion.p>
          <motion.p variants={itemVariants}>
            I&apos;m particularly passionate about backend systems, API
            architecture, and building AI-integrated products. I think in
            systems: how data flows, how services connect, and how to build
            things that are maintainable at scale. Currently building SocraticAI
            — a Socratic-method learning assistant.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-12 space-y-6 rounded-4xl border border-white/10 bg-white/5 p-8 shadow-glow"
        >
          {EDUCATION.map((item, idx) => (
            <motion.div
              key={item.school}
              variants={itemVariants}
              className="flex items-start gap-6"
            >
              <motion.div
                className="mt-1 h-3 w-3 rounded-full bg-indigo-500"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              />
              <div>
                <p className="text-base font-semibold text-white">
                  {item.school}
                </p>
                <p className="mt-1 text-sm text-slate-400">{item.degree}</p>
                <p className="mt-1 text-sm text-slate-500">{item.timeframe}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
