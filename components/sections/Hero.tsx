"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { PERSONAL } from "@/lib/portfolio-data";
import Container from "@/components/ui/Container";

const ROLES = [
  "Backend Developer & AI Systems Engineer",
  "Building Scalable APIs & RAG Pipelines",
  "LLM Integrations & Vector Embeddings",
  "Autonomous Tool-Calling AI Systems",
  "Designing Fault-Tolerant Architectures",
];

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const itemTransition = { duration: 0.5 };

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState(shouldReduceMotion ? ROLES[0] : "");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrentText(ROLES[0]);
      return;
    }

    const fullText = ROLES[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    } else {
      const speed = isDeleting ? 30 : 65;
      timeout = setTimeout(() => {
        setCurrentText(
          isDeleting
            ? fullText.substring(0, currentText.length - 1)
            : fullText.substring(0, currentText.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, roleIndex, shouldReduceMotion]);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col justify-between overflow-hidden pt-28 pb-10 lg:pt-32"
    >
      <Container as="div" className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: Text & Bio Content */}
        <div className="text-center md:text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={itemTransition}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
              Available for Work
            </div>

            <h1 className="mt-5 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.05]">
              Rajendra<br />
              B<span className="text-sky-400">IST</span>
            </h1>
          </motion.div>

          {/* Typewriter Dynamic Role Display */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.15 }}
            className="mt-3 flex min-h-[32px] items-center justify-center md:justify-start"
          >
            <p className="text-base font-semibold text-sky-400 sm:text-lg">
              <span>{currentText}</span>
              <span className="ml-0.5 inline-block w-2 animate-pulse text-sky-300 font-normal">|</span>
            </p>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.3 }}
            className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base"
          >
            Production backend systems built with Node.js, TypeScript, and PostgreSQL — deployed on cloud infrastructure, used by real people. Currently deepening my work in AI engineering & RAG architectures.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.45 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3.5 md:justify-start"
          >
            <a
              href="#projects"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-sky-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(37,99,235,0.35)] transition-all duration-200 hover:shadow-[0_0_35px_rgba(56,189,248,0.5)] hover:scale-[1.02] active:scale-[0.98]"
            >
              View Projects
            </a>
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:border-sky-400/60 hover:bg-sky-500/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download size={15} className="text-sky-300" />
              Download CV
            </a>
          </motion.div>

          {/* Social Icons Row */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.6 }}
            className="mt-6 flex items-center justify-center gap-4 md:justify-start"
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
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        </div>

        {/* Right: Floating Circular Profile Photo with Animated Glowing Border */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroVariants}
          transition={{ ...itemTransition, delay: 0.35 }}
          className="relative flex justify-center lg:justify-end"
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[330px]"
          >
            {/* Glowing Blue Ambient Halo */}
            <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.4),rgba(37,99,235,0.2)_45%,transparent_70%)] blur-xl" />

            <div className="relative aspect-square overflow-hidden rounded-full border-2 border-sky-400/80 bg-[#0c1017] p-1.5 shadow-[0_0_60px_rgba(56,189,248,0.3)]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#0c1017]">
                <Image
                  src="/images/rajendra-bist.jpeg"
                  alt="Rajendra Bist - Backend Developer from Nepal profile photo"
                  fill
                  priority
                  sizes="(min-width: 1024px) 340px, 75vw"
                  className="object-cover object-[50%_18%]"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <div className="mx-auto mt-8 flex flex-col items-center gap-1 text-slate-500">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">Scroll</span>
        <ArrowDown size={13} className="animate-bounce text-sky-400" />
      </div>
    </section>
  );
}
