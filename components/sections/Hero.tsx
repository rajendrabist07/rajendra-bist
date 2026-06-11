"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

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
      <div className="relative mx-auto flex max-w-6xl flex-col justify-center gap-8 pt-20 text-center md:text-left">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          transition={itemTransition}
        >
          <p className="text-sm uppercase tracking-[0.36em] text-slate-500">
            Hi, I&apos;m
          </p>
          <h1 className="mt-4 text-5xl font-semibold text-white sm:text-6xl">
            Rajendra Bist
          </h1>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          transition={{ ...itemTransition, delay: 0.15 }}
        >
          <p className="text-4xl font-semibold text-transparent text-gradient sm:text-5xl">
            Full-Stack Web Developer
          </p>
        </motion.div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          transition={{ ...itemTransition, delay: 0.3 }}
          className="mx-auto max-w-3xl text-lg text-slate-300 sm:mx-0"
        >
          I build systems, design backends, and ship products that work.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          transition={{ ...itemTransition, delay: 0.45 }}
          className="mx-auto flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-start"
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center rounded-full bg-[#6366f1] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4f46e5]"
          >
            View My Work
          </a>
          <button
            type="button"
            onClick={openChat}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10"
          >
            <MessageSquare size={18} /> Talk to My AI Agent
          </button>
        </motion.div>
      </div>
    </section>
  );
}
