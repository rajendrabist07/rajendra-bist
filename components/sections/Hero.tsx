"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { PERSONAL } from "@/lib/portfolio-data";

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const itemTransition = { duration: 0.5 };

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden px-6 pt-32 pb-12 md:px-8 lg:pt-36"
    >
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="text-center md:text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={itemTransition}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)] animate-pulse" />
              Available for Work
            </div>
            
            <h1 className="mt-6 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Rajendra<br />
              <span className="bg-gradient-to-r from-blue-500 via-sky-400 to-cyan-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
                Bist
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.15 }}
            className="mt-4 text-xl font-semibold text-sky-400 sm:text-2xl"
          >
            Backend Developer & AI Systems Engineer
          </motion.p>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.3 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            Production backend systems built with Node.js, TypeScript, and PostgreSQL — deployed on cloud infrastructure, used by real people. Currently deepening my work in AI systems & RAG architectures.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.45 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-200 hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] hover:scale-[1.02] active:scale-[0.98]"
            >
              View Projects
            </a>
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:border-sky-400/60 hover:bg-sky-500/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download size={16} className="text-sky-300" />
              Download CV
            </a>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.6 }}
            className="mt-8 flex items-center justify-center gap-4 md:justify-start"
          >
            {[
              { href: PERSONAL.github, icon: Github, label: "GitHub" },
              { href: PERSONAL.linkedin, icon: Linkedin, label: "LinkedIn" },
              { href: `mailto:${PERSONAL.email}`, icon: Mail, label: "Email" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="text-slate-400 transition-colors duration-200 hover:text-sky-300 hover:scale-110 active:scale-95"
                >
                  <Icon size={22} />
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
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px]">
            {/* Glowing Blue Ambient Halo */}
            <div className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.45),rgba(37,99,235,0.25)_40%,transparent_70%)] blur-2xl animate-pulse" />
            
            <div className="relative aspect-square overflow-hidden rounded-full border-2 border-sky-400/80 bg-[#0c1017] p-2 shadow-[0_0_80px_rgba(56,189,248,0.35)]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#0c1017]">
                <Image
                  src="/images/rajendra-bist.jpeg"
                  alt="Rajendra Bist - Backend Developer from Nepal profile photo"
                  fill
                  priority
                  sizes="(min-width: 1024px) 400px, 80vw"
                  className="object-cover object-[50%_18%]"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="mx-auto mt-12 flex flex-col items-center gap-1.5 text-slate-500">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-slate-400">Scroll</span>
        <ArrowDown size={14} className="animate-bounce text-sky-400" />
      </div>
    </section>
  );
}
