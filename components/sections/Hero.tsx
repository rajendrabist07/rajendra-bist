"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import Image from "next/image";
import { PERSONAL } from "@/lib/portfolio-data";

import CodeBioBlock from "@/components/ui/CodeBioBlock";

const heroVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const itemTransition = { duration: 0.6 };

const titlePhrases = [
  "Backend Developer & AI Systems Engineer in Nepal",
  "Designing clean APIs, auth contracts, and database schemas",
  "Building RAG pipelines, LLM integrations, and verified AI workflows",
  "Shipping full-stack products on strong backend foundations",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % titlePhrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const openChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-chat-widget"));
    }
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden px-6 pb-20 pt-28 md:px-8 md:pb-24"
    >
      <div className="hero-grid" />
      <div className="star-field" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 pt-10 lg:grid-cols-[0.92fr_1.08fr]">
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
            <h1 className="mt-8 text-5xl font-black uppercase leading-[0.9] tracking-normal sm:text-6xl lg:text-7xl">
              <span className="hero-name-gradient">Rajendra</span>
              <span className="mt-2 block text-white">Bist</span>
            </h1>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.15 }}
          >
            <div className="mt-8 relative h-[96px] sm:h-[72px] overflow-hidden flex items-center justify-center md:justify-start">
              <AnimatePresence mode="wait">
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="hero-role-text text-xl font-semibold sm:text-2xl absolute inset-x-0 top-1/2 -translate-y-1/2 text-center md:text-left"
                >
                  {titlePhrases[index]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

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
            className="mx-auto mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(249,115,22,0.18)] transition hover:bg-orange-400"
            >
              View My Work
            </a>
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-orange-300/30 hover:bg-orange-400/10"
            >
              <Download size={18} /> Download CV
            </a>
            <button
              type="button"
              onClick={openChat}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10"
            >
              <MessageSquare size={18} /> Talk to My AI Agent
            </button>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.6 }}
            className="mt-8 flex justify-center gap-3 md:justify-start"
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-orange-400/40 hover:text-white"
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
          className="relative mx-auto w-full max-w-[560px] lg:mr-0"
        >
          <CodeBioBlock />
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
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
          <div className="sr-only">
            <Image
              src="/images/rajendra-bist.jpeg"
              alt="Rajendra Bist - Backend Developer from Nepal profile photo"
              width={320}
              height={320}
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
