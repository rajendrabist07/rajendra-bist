"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import Image from "next/image";
import { PERSONAL } from "@/lib/portfolio-data";

const heroVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const itemTransition = { duration: 0.6 };

export default function Hero() {
  const openChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-chat-widget"));
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden px-6 py-28 md:px-8"
    >
      <div className="hero-grid" />
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-[10%] top-[26%] h-1 w-1 rounded-full bg-white/70" />
        <div className="absolute left-[38%] top-[18%] h-1 w-1 rounded-full bg-white/40" />
        <div className="absolute right-[14%] top-[34%] h-1 w-1 rounded-full bg-white/60" />
        <div className="absolute right-[30%] bottom-[18%] h-1 w-1 rounded-full bg-white/50" />
      </div>
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 pt-16 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="text-center md:text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={itemTransition}
          >
            <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 md:mx-0">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.8)]" />
              Available for Work
            </p>
            <h1 className="mt-8 text-6xl font-black uppercase leading-[0.86] tracking-normal text-white sm:text-7xl lg:text-8xl">
              Rajendra Bist
            </h1>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.15 }}
          >
            <p className="mt-8 text-xl font-semibold text-indigo-300 sm:text-2xl">
              Full-Stack Developer | Systems-First Thinking
            </p>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:mx-0"
          >
            Web architecture, backend foundations, performance-aware interfaces, and AI-integrated products built with clean engineering judgment.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.45 }}
            className="mx-auto mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-2xl bg-[#6366f1] px-7 py-4 text-sm font-semibold text-white shadow-glow transition hover:bg-[#4f46e5]"
            >
              View My Work
            </a>
            <button
              type="button"
              onClick={openChat}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10"
            >
              <MessageSquare size={18} /> Talk to My AI Agent
            </button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.6 }}
            className="mt-10 flex justify-center gap-4 md:justify-start"
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
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-indigo-400/40 hover:text-white"
                >
                  <Icon size={19} />
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
          className="relative mx-auto w-full max-w-[430px] lg:mr-0"
        >
          <div className="absolute -inset-7 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.42),rgba(14,165,233,0.16)_38%,transparent_68%)] blur-2xl" />
          <div className="relative aspect-square overflow-hidden rounded-full border-2 border-indigo-400/80 bg-[#11101b] p-2 shadow-[0_0_90px_rgba(99,102,241,0.28)]">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[#11101b]">
              <Image
                src="/images/rajendra-bist.jpeg"
                alt="Rajendra Bist"
                fill
                priority
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover object-[50%_18%]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
