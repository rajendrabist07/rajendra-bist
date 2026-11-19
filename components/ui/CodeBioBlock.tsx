"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

const codeString = `export const engineer = {
  name: "Rajendra Bist",
  role: "Full-Stack Developer & Backend Engineer",
  location: "New Delhi, India [Available immediately · Delhi NCR / Remote]",
  focus: "Schema design, REST APIs, tenant isolation & reliable web apps",
  core_stack: ["TypeScript", "Node.js", "PostgreSQL", "Next.js 15", "Express"],
  current_project: "Sovereign — Multi-Tenant B2B SaaS on PostgreSQL RLS",
  philosophy: "Schema integrity, explicit error boundaries, and defensive architecture"
};`;

const codeRows = [
  <>
    <span className="text-[--accent]">export const</span>{" "}
    <span className="text-[--text-primary] font-semibold">engineer</span> ={" "}
    {"{"}
  </>,
  <>
    <span className="text-[--text-secondary]">name</span>:{" "}
    <span className="text-[--accent]">&quot;Rajendra Bist&quot;</span>,
  </>,
  <>
    <span className="text-[--text-secondary]">role</span>:{" "}
    <span className="text-[--accent]">
      &quot;Full-Stack Developer &amp; Backend Engineer&quot;
    </span>
    ,
  </>,
  <>
    <span className="text-[--text-secondary]">location</span>:{" "}
    <span className="text-[--text-primary]">
      &quot;New Delhi, India [Available immediately · Delhi NCR / Remote]&quot;
    </span>
    ,
  </>,
  <>
    <span className="text-[--text-secondary]">focus</span>:{" "}
    <span className="text-[--accent]">
      &quot;Schema design, REST APIs, tenant isolation &amp; reliable web apps&quot;
    </span>
    ,
  </>,
  <>
    <span className="text-[--text-secondary]">core_stack</span>: [
    <span className="text-[--accent]">&quot;TypeScript&quot;</span>,{" "}
    <span className="text-[--accent]">&quot;Node.js&quot;</span>,{" "}
    <span className="text-[--accent]">&quot;PostgreSQL&quot;</span>,{" "}
    <span className="text-[--accent]">&quot;Next.js 15&quot;</span>],
  </>,
  <>
    <span className="text-[--text-secondary]">current_project</span>:{" "}
    <span className="text-[--accent]">
      &quot;Sovereign — Multi-Tenant B2B SaaS (PostgreSQL RLS)&quot;
    </span>
    ,
  </>,
  <>
    <span className="text-[--text-secondary]">philosophy</span>:{" "}
    <span className="text-[--text-tertiary]">
      &quot;Schema integrity, explicit error boundaries, and defensive architecture&quot;
    </span>
  </>,
  <>{"};"}</>,
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
    <div className="code-card overflow-hidden rounded-[--radius-feature] border border-[--border-hairline] bg-[--bg-surface-2] font-mono text-xs sm:text-sm shadow-2xl transition-all duration-200 hover:border-[--border-strong]">
      {/* Titlebar */}
      <div className="flex items-center justify-between border-b border-[--border-hairline] bg-[--bg-surface-1] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[--border-strong]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[--border-strong]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[--border-strong]" />
          <span className="ml-2 inline-flex items-center gap-1.5 text-[11px] text-[--text-secondary]">
            <Terminal size={12} className="text-[--accent]" />
            rajendra.config.ts
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-2] px-2 py-0.5 text-[11px] text-[--text-secondary] transition-all duration-200 hover:border-[--border-strong] hover:text-[--text-primary] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
          title="Copy config to clipboard"
          aria-label="Copy config to clipboard"
        >
          {copied ? (
            <Check size={12} className="text-[--status-live]" />
          ) : (
            <Copy size={12} />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* Code Rows */}
      <div className="overflow-x-auto p-4 leading-7 sm:leading-8 custom-scrollbar sm:p-5">
        <div className="table w-full min-w-max">
          {codeRows.map((row, index) => (
            <div className="table-row font-mono" key={index}>
              <span className="table-cell pr-4 text-right select-none text-[--text-tertiary] font-normal text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={`table-cell ${index > 0 && index < codeRows.length - 1 ? "pl-3" : ""}`}
              >
                {row}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
