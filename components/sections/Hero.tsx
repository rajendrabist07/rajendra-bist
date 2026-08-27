"use client";

import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { PERSONAL } from "@/lib/portfolio-data";

const heroVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const itemTransition = { duration: 0.6 };

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pb-20 pt-28 md:px-8 md:pb-24"
    >
      <div className="hero-grid" />
      <div className="star-field" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 pt-10 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="text-center md:text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={itemTransition}
          >
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-sm font-medium text-sky-200 md:mx-0">
              <span className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_18px_rgba(56,189,248,0.8)]" />
              Available for Work
            </p>
            <h1 className="mt-8 text-6xl font-black uppercase leading-[0.88] tracking-normal sm:text-7xl lg:text-8xl">
              <span className="hero-name-gradient">Rajendra</span>
              <span className="mt-2 block text-white">Bist</span>
            </h1>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.15 }}
            className="hero-role-text mx-auto mt-8 max-w-xl text-2xl font-semibold leading-snug sm:text-3xl md:mx-0"
          >
            Building RAG pipelines, LLM integrations, and verified AI workflows
          </motion.p>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.3 }}
            className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-300 sm:mx-0"
          >
            Backend developer from Nepal building scalable APIs, database-driven products, RAG pipelines, and production AI integrations with a systems-first engineering mindset.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.45 }}
            className="mx-auto mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex min-h-12 min-w-40 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600 bg-size-200 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] hover:scale-[1.02] active:scale-[0.98]"
            >
              View Work
            </a>
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              className="inline-flex min-h-12 min-w-40 items-center justify-center gap-2 rounded-2xl border border-sky-400/30 bg-sky-500/10 px-6 py-3 text-sm font-semibold text-sky-100 transition-all duration-300 hover:border-sky-300/60 hover:bg-sky-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download size={18} className="text-sky-300" /> Download CV
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.6 }}
            className="mt-8 flex justify-center gap-3.5 md:justify-start"
          >
            {[
              { href: PERSONAL.github, icon: Github, label: "GitHub", color: "hover:text-sky-300 hover:border-sky-400/60 hover:shadow-[0_0_20px_rgba(56,189,248,0.35)]" },
              { href: PERSONAL.linkedin, icon: Linkedin, label: "LinkedIn", color: "hover:text-blue-400 hover:border-blue-400/60 hover:shadow-[0_0_20px_rgba(96,165,250,0.35)]" },
              { href: `mailto:${PERSONAL.email}`, icon: Mail, label: "Email", color: "hover:text-emerald-300 hover:border-emerald-400/60 hover:shadow-[0_0_20px_rgba(52,211,153,0.35)]" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className={`group relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-300 transition-all duration-300 hover:scale-110 active:scale-95 ${item.color}`}
                >
                  <Icon size={20} className="transition-transform group-hover:scale-110" />
                </a>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          transition={{ ...itemTransition, delay: 0.35 }}
          className="relative mx-auto flex w-full max-w-[520px] flex-col items-center lg:mr-0 lg:items-center"
        >
          <div className="relative w-full max-w-[340px] lg:max-w-[420px]">
            <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.34),rgba(56,189,248,0.12)_45%,transparent_70%)] blur-2xl" />
            <div className="relative aspect-square overflow-hidden rounded-full border-2 border-sky-400/70 bg-[#10131c] p-2 shadow-[0_0_90px_rgba(99,102,241,0.26)]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#10131c]">
                <Image
                  src="/images/rajendra-bist.jpeg"
                  alt="Rajendra Bist - Backend Developer from Nepal profile photo"
                  fill
                  priority
                  sizes="(min-width: 1024px) 360px, 82vw"
                  className="object-cover object-[50%_18%]"
                />
              </div>
            </div>
          </div>

          <div className="mt-7 grid w-full gap-3 sm:grid-cols-3">
            {[
              ["3", "AI products"],
              ["Node", "backend focus"],
              ["NP", "remote ready"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3">
                <p className="text-lg font-semibold text-white">{value}</p>
                <p className="mt-1 text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
