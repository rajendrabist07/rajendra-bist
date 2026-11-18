'use client';

import React, { useState } from 'react';

export interface CodeWindowProps {
  title?: string;
  tag?: string;
  code: string;
  language?: string;
  className?: string;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({
  title = 'schema.sql',
  tag = 'SPEC // 01',
  code,
  language = 'sql',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      className={`rounded-[--radius-card] bg-[--bg-surface-3] border border-[--border-hairline] overflow-hidden ${className}`}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[--border-hairline] bg-[--bg-surface-2]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[--border-strong]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[--border-strong]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[--border-strong]" />
          <span className="ml-2 font-mono text-xs text-[--text-secondary]">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {tag && (
            <span className="font-mono text-[11px] text-[--accent] tracking-wider uppercase">
              [{tag}]
            </span>
          )}
          <button
            onClick={handleCopy}
            className="text-xs font-mono text-[--text-tertiary] hover:text-[--text-primary] px-2 py-1 rounded-[--radius-control] border border-[--border-hairline] hover:border-[--border-strong] transition-colors focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
            aria-label="Copy code to clipboard"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed text-[--text-primary]">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
