"use client";

import { useState } from "react";
import { Terminal, Copy, Check } from "lucide-react";

export default function CodeBioBlock() {
  const [copied, setCopied] = useState(false);

  const codeString = `const engineer: BackendDeveloper = {
  name: "Rajendra Bist",
  location: "Nepal (UTC+5:45)",
  status: "Open to remote work / Full-time",
  architecture: ["Systems-First", "Type-Safe", "Deterministic-AI"],
  primaryStack: {
    runtime: "Node.js 20+",
    frameworks: ["Next.js 15/16", "Express.js"],
    databases: ["PostgreSQL (pgvector)", "MongoDB"],
    aiPipelines: ["Tool Calling", "RAG Grounding", "Multi-Tier Fallbacks"],
  },
  principles: [
    "Schema validation before UI",
    "Deterministic LLM guardrails",
    "Zero speculative claims",
  ],
};`;

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="surface-panel overflow-hidden rounded-2xl border border-white/10 font-mono text-xs sm:text-[13px] shadow-2xl backdrop-blur-xl transition hover:border-indigo-400/40">
      {/* Window Header */}
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]/80" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/80" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]/80" />
          <span className="ml-2 inline-flex items-center gap-1.5 text-[11px] text-slate-400">
            <Terminal size={12} className="text-indigo-400" />
            rajendra.config.ts
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-slate-400 transition hover:bg-white/10 hover:text-slate-200 cursor-pointer"
          title="Copy config"
        >
          {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto p-4 sm:p-5 text-slate-300 leading-relaxed custom-scrollbar">
        <div className="table w-full">
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">01</span>
            <span className="table-cell">
              <span className="text-indigo-400">const</span>{" "}
              <span className="text-sky-300">engineer</span>:{" "}
              <span className="text-amber-300">BackendDeveloper</span> = &#123;
            </span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">02</span>
            <span className="table-cell pl-4">
              <span className="text-sky-300">name</span>:{" "}
              <span className="text-emerald-300">&quot;Rajendra Bist&quot;</span>,
            </span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">03</span>
            <span className="table-cell pl-4">
              <span className="text-sky-300">location</span>:{" "}
              <span className="text-emerald-300">&quot;Nepal (UTC+5:45)&quot;</span>,
            </span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">04</span>
            <span className="table-cell pl-4">
              <span className="text-sky-300">status</span>:{" "}
              <span className="text-emerald-300">&quot;Open to remote work / Full-time&quot;</span>,
            </span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">05</span>
            <span className="table-cell pl-4">
              <span className="text-sky-300">architecture</span>: [
              <span className="text-emerald-300">&quot;Systems-First&quot;</span>,{" "}
              <span className="text-emerald-300">&quot;Type-Safe&quot;</span>,{" "}
              <span className="text-emerald-300">&quot;Deterministic-AI&quot;</span>],
            </span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">06</span>
            <span className="table-cell pl-4">
              <span className="text-sky-300">primaryStack</span>: &#123;
            </span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">07</span>
            <span className="table-cell pl-8">
              <span className="text-sky-300">runtime</span>:{" "}
              <span className="text-emerald-300">&quot;Node.js 20+&quot;</span>,
            </span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">08</span>
            <span className="table-cell pl-8">
              <span className="text-sky-300">frameworks</span>: [
              <span className="text-emerald-300">&quot;Next.js 15/16&quot;</span>,{" "}
              <span className="text-emerald-300">&quot;Express.js&quot;</span>],
            </span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">09</span>
            <span className="table-cell pl-8">
              <span className="text-sky-300">databases</span>: [
              <span className="text-emerald-300">&quot;PostgreSQL (pgvector)&quot;</span>,{" "}
              <span className="text-emerald-300">&quot;MongoDB&quot;</span>],
            </span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">10</span>
            <span className="table-cell pl-8">
              <span className="text-sky-300">aiPipelines</span>: [
              <span className="text-emerald-300">&quot;Tool Calling&quot;</span>,{" "}
              <span className="text-emerald-300">&quot;RAG Grounding&quot;</span>,{" "}
              <span className="text-emerald-300">&quot;Multi-Tier Fallbacks&quot;</span>],
            </span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">11</span>
            <span className="table-cell pl-4">&#125;,</span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">12</span>
            <span className="table-cell pl-4">
              <span className="text-sky-300">principles</span>: [
              <span className="text-emerald-300">&quot;Schema validation before UI&quot;</span>,{" "}
              <span className="text-emerald-300">&quot;Deterministic LLM guardrails&quot;</span>],
            </span>
          </div>
          <div className="table-row">
            <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">13</span>
            <span className="table-cell">&#125;;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
