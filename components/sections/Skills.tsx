import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Binary,
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers,
  Network,
  Server,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "@/components/ui/Container";

interface ToolItem {
  name: string;
  category: "backend" | "databases" | "devops" | "frontend" | "aiml";
  badge?: "LEARNING" | "CORE";
  icon: any;
}

const ALL_TOOLS: ToolItem[] = [
  // Backend
  { name: "Node.js", category: "backend", icon: Server },
  { name: "Express.js", category: "backend", icon: Server },
  { name: "TypeScript", category: "backend", icon: Code2 },
  { name: "REST APIs", category: "backend", icon: Network },
  { name: "Socket.io", category: "backend", icon: Zap },
  { name: "Zod Schema", category: "backend", icon: ShieldCheck },
  { name: "JWT Auth", category: "backend", icon: ShieldCheck },

  // Databases
  { name: "PostgreSQL", category: "databases", icon: Database },
  { name: "MongoDB", category: "databases", icon: Database },
  { name: "Redis", category: "databases", icon: Database },
  { name: "Supabase", category: "databases", icon: Database },
  { name: "Mongoose", category: "databases", icon: Database },
  { name: "PGVector", category: "databases", badge: "CORE", icon: Database },

  // DevOps & Cloud
  { name: "Docker", category: "devops", icon: Cloud },
  { name: "Git / GitHub", category: "devops", icon: GitBranch },
  { name: "GitHub Actions", category: "devops", icon: Workflow },
  { name: "Vercel", category: "devops", icon: Cloud },
  { name: "Railway", category: "devops", icon: Cloud },
  { name: "Linux", category: "devops", icon: Cpu },

  // Frontend
  { name: "Next.js 15", category: "frontend", icon: Layers },
  { name: "React 19", category: "frontend", icon: Code2 },
  { name: "Tailwind CSS v4", category: "frontend", icon: Zap },
  { name: "Framer Motion", category: "frontend", icon: Zap },

  // AI & ML
  { name: "RAG Pipelines", category: "aiml", badge: "CORE", icon: BrainCircuit },
  { name: "LLM Integration", category: "aiml", badge: "CORE", icon: Bot },
  { name: "Google Gemini API", category: "aiml", badge: "CORE", icon: Bot },
  { name: "Groq Model Router", category: "aiml", badge: "CORE", icon: Zap },
  { name: "LangChain.js", category: "aiml", badge: "LEARNING", icon: Binary },
  { name: "Vector Embeddings", category: "aiml", badge: "LEARNING", icon: BrainCircuit },
  { name: "LLM-as-Judge", category: "aiml", badge: "LEARNING", icon: ShieldCheck },
];

const TABS = [
  { id: "all", label: "ALL" },
  { id: "backend", label: "BACKEND" },
  { id: "databases", label: "DATABASES" },
  { id: "devops", label: "DEVOPS" },
  { id: "frontend", label: "FRONTEND" },
  { id: "aiml", label: "AI / ML (Learning)" },
] as const;

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredTools =
    activeTab === "all"
      ? ALL_TOOLS
      : ALL_TOOLS.filter((t) => t.category === activeTab);

  return (
    <section id="skills" className="py-20 md:py-28">
      <Container>
        <SectionHeader subtitle="Tech Stack" title="Technical Arsenal" />

        {/* Filter Tabs */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 border-b border-white/10 pb-4 sm:gap-6 md:justify-start">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-md px-3 py-2 text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                  isActive
                    ? "text-sky-400 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tools Grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.2 }}
                  className="group relative flex items-center justify-between gap-2.5 rounded-xl border border-white/[0.08] bg-[#0c1017]/80 px-4 py-3.5 backdrop-blur-sm transition-all duration-200 hover:border-sky-400/50 hover:bg-white/[0.04] hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Icon
                      size={17}
                      className="shrink-0 text-slate-400 transition-colors duration-200 group-hover:text-sky-400"
                    />
                    <span className="truncate text-xs font-medium text-slate-200 transition-colors duration-200 group-hover:text-white sm:text-sm">
                      {tool.name}
                    </span>
                  </div>

                  {tool.badge && (
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider ${
                        tool.badge === "CORE"
                          ? "bg-sky-500/20 text-sky-300 border border-sky-400/30"
                          : "bg-amber-500/15 text-amber-300 border border-amber-400/30"
                      }`}
                    >
                      {tool.badge}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
