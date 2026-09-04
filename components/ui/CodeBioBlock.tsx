"use client";

import { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

const codeString = `const rajendra = {
  role: "Backend & Systems Engineer",
  location: "Nepal",
  timezone: "UTC+5:45",
  open: true,
  architecture: ["Distributed Systems", "PostgreSQL", "Node.js", "TypeScript"],
  ai_systems: ["RAG Pipelines", "pgvector", "Tool-Calling Agents", "LLM Fallbacks"],
  mindset: "Data integrity and failure modes first, UI second"
}`;

const codeRows = [
  <>
    <span className="text-indigo-400">const</span>{" "}
    <span className="text-slate-100">rajendra</span> = {"{"}
  </>,
  <>
    <span className="text-sky-300">role</span>:{" "}
    <span className="text-cyan-300">&quot;Backend &amp; Systems Engineer&quot;</span>,
  </>,
  <>
    <span className="text-sky-300">location</span>:{" "}
    <span className="text-cyan-300">&quot;Nepal&quot;</span>,
  </>,
  <>
    <span className="text-sky-300">timezone</span>:{" "}
    <span className="text-cyan-300">&quot;UTC+5:45&quot;</span>,
  </>,
  <>
    <span className="text-sky-300">open</span>: <span className="text-indigo-300">true</span>,
  </>,
  <>
    <span className="text-sky-300">architecture</span>: [
    <span className="text-cyan-300">&quot;Distributed Systems&quot;</span>,{" "}
    <span className="text-cyan-300">&quot;PostgreSQL&quot;</span>,{" "}
    <span className="text-cyan-300">&quot;Node.js&quot;</span>],
  </>,
  <>
    <span className="text-sky-300">ai_systems</span>: [
    <span className="text-cyan-300">&quot;RAG Pipelines&quot;</span>,{" "}
    <span className="text-cyan-300">&quot;pgvector&quot;</span>,{" "}
    <span className="text-cyan-300">&quot;Tool-Calling Agents&quot;</span>],
  </>,
  <>
    <span className="text-sky-300">mindset</span>:{" "}
    <span className="text-cyan-300">&quot;Data integrity and failure modes first, UI second&quot;</span>
  </>,
  <>{"}"}</>,
];

export default function CodeBioBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-card overflow-hidden rounded-[1.45rem] font-mono text-xs sm:text-sm shadow-2xl transition-all duration-200 hover:border-sky-400/40 hover:shadow-[0_0_30px_rgba(56,189,248,0.12)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]/80" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/80" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]/80" />
          <span className="ml-2 inline-flex items-center gap-1.5 text-[11px] text-slate-400">
            <Terminal size={12} className="text-sky-400" />
            rajendra.config.ts
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded px-2 py-0.5 text-[11px] text-slate-400 transition-all duration-200 hover:bg-white/10 hover:text-slate-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
          title="Copy config"
        >
          {copied ? <Check size={12} className="text-sky-400" /> : <Copy size={12} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      <div className="overflow-x-auto p-4 text-slate-200 leading-7 sm:leading-8 custom-scrollbar sm:p-6">
        <div className="table w-full min-w-max">
          {codeRows.map((row, index) => (
            <div className="table-row" key={index}>
              <span className="table-cell pr-4 text-right select-none text-slate-600 font-normal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={`table-cell ${index > 0 && index < codeRows.length - 1 ? "pl-4" : ""}`}>
                {row}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
