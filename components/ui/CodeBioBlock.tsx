'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

const codeString = `export const engineer = {
  name: "Rajendra Bist",
  role: "Full-Stack & Backend Systems Engineer",
  location: "Kathmandu, Nepal [UTC+5:45]",
  status: "Available for worldwide remote roles",
  core_stack: ["TypeScript", "Next.js 15", "Node.js", "PostgreSQL", "MongoDB"],
  ai_systems: ["RAG Pipelines", "Supabase pgvector", "Tool-Calling Agents", "Gemini 2.5"],
  philosophy: "Data integrity, typed contracts, and failure modes first"
};`;

const codeRows = [
  <>
    <span className="text-[--accent-warm]">export const</span>{' '}
    <span className="text-[--text-primary] font-semibold">engineer</span> = {'{'}
  </>,
  <>
    <span className="text-[--text-secondary]">name</span>:{' '}
    <span className="text-[--accent-cool]">&quot;Rajendra Bist&quot;</span>,
  </>,
  <>
    <span className="text-[--text-secondary]">role</span>:{' '}
    <span className="text-[--accent-cool]">&quot;Full-Stack &amp; Backend Systems Engineer&quot;</span>,
  </>,
  <>
    <span className="text-[--text-secondary]">location</span>:{' '}
    <span className="text-[--text-primary]">&quot;Kathmandu, Nepal [UTC+5:45]&quot;</span>,
  </>,
  <>
    <span className="text-[--text-secondary]">status</span>:{' '}
    <span className="text-[--accent-cool]">&quot;Available for worldwide remote roles&quot;</span>,
  </>,
  <>
    <span className="text-[--text-secondary]">core_stack</span>: [
    <span className="text-[--accent-warm]">&quot;TypeScript&quot;</span>,{' '}
    <span className="text-[--accent-warm]">&quot;Next.js 15&quot;</span>,{' '}
    <span className="text-[--accent-warm]">&quot;Node.js&quot;</span>,{' '}
    <span className="text-[--accent-warm]">&quot;PostgreSQL&quot;</span>],
  </>,
  <>
    <span className="text-[--text-secondary]">ai_systems</span>: [
    <span className="text-[--accent-cool]">&quot;RAG Pipelines&quot;</span>,{' '}
    <span className="text-[--accent-cool]">&quot;pgvector&quot;</span>,{' '}
    <span className="text-[--accent-cool]">&quot;Tool-Calling Agents&quot;</span>],
  </>,
  <>
    <span className="text-[--text-secondary]">philosophy</span>:{' '}
    <span className="text-[--text-tertiary]">&quot;Data integrity, typed contracts, and failure modes first&quot;</span>
  </>,
  <>{'};'}</>,
];

export default function CodeBioBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-card overflow-hidden rounded-2xl border border-[--border-subtle] bg-[--bg-surface-2] font-mono text-xs sm:text-sm shadow-2xl transition-all duration-200 hover:border-[--border-strong]">
      {/* Titlebar */}
      <div className="flex items-center justify-between border-b border-[--border-subtle] bg-[--bg-surface] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#FF5D5D]/80" />
          <span className="h-3 w-3 rounded-full bg-[#FF7A33]/80" />
          <span className="h-3 w-3 rounded-full bg-[#34D8B0]/80" />
          <span className="ml-2 inline-flex items-center gap-1.5 text-[11px] text-[--text-secondary]">
            <Terminal size={12} className="text-[--accent-warm]" />
            rajendra.config.ts
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded border border-[--border-subtle] bg-[--bg-surface-2] px-2 py-0.5 text-[11px] text-[--text-secondary] transition-all duration-200 hover:border-[--border-strong] hover:text-[--text-primary] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm]"
          title="Copy config to clipboard"
          aria-label="Copy config to clipboard"
        >
          {copied ? <Check size={12} className="text-[--accent-cool]" /> : <Copy size={12} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      {/* Code Rows */}
      <div className="overflow-x-auto p-4 leading-7 sm:leading-8 custom-scrollbar sm:p-5">
        <div className="table w-full min-w-max">
          {codeRows.map((row, index) => (
            <div className="table-row font-mono" key={index}>
              <span className="table-cell pr-4 text-right select-none text-[--text-tertiary] font-normal text-xs">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={`table-cell ${index > 0 && index < codeRows.length - 1 ? 'pl-3' : ''}`}>
                {row}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
