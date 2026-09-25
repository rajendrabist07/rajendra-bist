"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { PERSONAL } from "@/lib/portfolio-data";
import Container from "@/components/ui/Container";

const ROLES = [
  "Full-Stack Developer | Backend-Focused AI Systems",
  "Typed React Interfaces & Production APIs",
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
  const [currentText, setCurrentText] = useState(
    shouldReduceMotion ? ROLES[0] : "",
  );
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
            : fullText.substring(0, currentText.length + 1),
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
      <Container
        as="div"
        className="relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]"
      >
        {/* Left: Text & Bio Content */}
        <div className="text-center md:text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={itemTransition}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(56,189,248,0.25)] bg-[rgba(1,138,190,0.12)] px-3 py-1 text-xs font-medium text-[--success]">
              <span className="h-2 w-2 rounded-full bg-[--success] shadow-[0_0_10px_rgba(56,189,248,0.72)] animate-pulse" />
              Available for Work
            </div>

            <h1 className="mt-5 text-5xl font-black uppercase tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.05]">
              Rajendra
              <br />B<span className="text-[--accent-primary]">IST</span>
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
            <p className="text-base font-semibold text-[--accent-primary] sm:text-lg">
              <span>{currentText}</span>
              <span className="ml-0.5 inline-block w-2 animate-pulse text-[--accent-secondary] font-normal">
                |
              </span>
            </p>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            transition={{ ...itemTransition, delay: 0.3 }}
            className="mt-3 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base"
          >
            Production full-stack systems built with React, Next.js, Node.js,
            TypeScript, and PostgreSQL — typed interfaces, reliable API
            contracts, and AI workflows deployed for real users.
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
              className="premium-button-primary inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              View Projects
            </a>
            <a
              href={PERSONAL.resumeUrl}
              download="Rajendra-Bist-Resume.pdf"
              className="premium-button-secondary inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              <Download size={15} className="text-[--accent-primary]" />
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
                  className="text-[--text-muted] transition-all duration-200 ease-out hover:text-[--accent-primary] hover:scale-105 active:scale-95"
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
            {/* Oceanic ambient halo */}
            <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(1,138,190,0.35),rgba(2,69,122,0.2)_45%,transparent_70%)] blur-xl" />

            <div className="relative aspect-square overflow-hidden rounded-full border-2 border-[--accent-primary] bg-[--bg-code] p-1.5 shadow-[0_0_60px_rgba(1,138,190,0.28)]">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[--bg-code]">
                <Image
                  src="/images/rajendra-bist.jpeg"
                  alt="Rajendra Bist - Full-Stack Developer from Nepal profile photo"
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
        <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-400">
          Scroll
        </span>
        <ArrowDown
          size={13}
          className="animate-bounce text-[--accent-primary]"
        />
      </div>
    </section>
  );
}
