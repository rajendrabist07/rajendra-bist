"use client";

import { motion } from "framer-motion";
import { Blocks, BrainCircuit, Database, GraduationCap, Network, Rocket } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import CodeBioBlock from "@/components/ui/CodeBioBlock";

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

const strengths = [
  {
    title: "Systems-first mindset",
    description: "Mapping database schemas, validation requirements, and failure modes prior to frontend execution.",
    icon: Network,
  },
  {
    title: "Full-stack execution",
    description: "Bridging complex user interface state with structured, type-safe API communication patterns.",
    icon: Blocks,
  },
  {
    title: "Backend depth",
    description: "Architecting secure authentications, real-time WebSockets, and predictable REST API contracts.",
    icon: Database,
  },
  {
    title: "AI integration rigor",
    description: "Applying validation guardrails and structured generation patterns to yield deterministic LLM outputs.",
    icon: BrainCircuit,
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeader subtitle="About" title="Who I Am" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-12 space-y-6 text-base leading-relaxed text-slate-300 sm:text-lg sm:leading-8"
        >
          <motion.p variants={itemVariants}>
            I&apos;m a backend developer and systems engineer based in Nepal working primarily with Node.js, TypeScript, and PostgreSQL. I don&apos;t build superficial demo projects — I design systems from first principles to handle real users, high concurrency, and real-world failure modes.
          </motion.p>
          <motion.p variants={itemVariants}>
            My engineering strategy is systems-first: establish rigid database schemas, enforce schema validation, and define fault-tolerant state boundaries before writing client-facing flows. I&apos;ve shipped production architectures including autonomous PR review agents with AST static verification, persistent cognitive learning engines, and vector similarity search with automated CI/CD pipelines.
          </motion.p>
          <motion.p variants={itemVariants}>
            In modern AI engineering, I bridge probabilistic LLMs with deterministic software rigor — implementing self-hosted pgvector embeddings, grounded RAG retrieval pipelines, and multi-model fallback routers that eliminate hallucinations and guarantee uptime under strict rate limits.
          </motion.p>
          <motion.p variants={itemVariants}>
            Formally grounded in Computer Science fundamentals with continuous applied engineering depth. Open to backend engineering, distributed systems, and AI infrastructure roles onsite in Nepal or remote worldwide.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
          className="mt-10"
        >
          <CodeBioBlock />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {strengths.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={itemVariants}
                className="surface-panel rounded-2xl p-5 transition-all duration-200 hover:border-sky-400/40 hover:bg-white/[0.04]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
