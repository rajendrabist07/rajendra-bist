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
              className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(99,102,241,0.25)] transition hover:bg-indigo-500"
            >
              View My Work
            </a>
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-sky-300/30 hover:bg-sky-400/10"
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
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-sky-400/40 hover:text-white"
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
          className="relative mx-auto flex w-full max-w-[560px] flex-col items-center lg:mr-0 lg:min-h-[570px] lg:items-end"
        >
          <div className="relative w-full max-w-[340px] lg:max-w-[390px]">
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

          <div className="mt-7 w-full lg:absolute lg:bottom-20 lg:left-0 lg:mt-0 lg:max-w-[430px]">
            <CodeBioBlock />
          </div>

          <div className="mt-4 grid w-full gap-3 sm:grid-cols-3 lg:absolute lg:bottom-0 lg:left-10 lg:max-w-[500px]">
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
