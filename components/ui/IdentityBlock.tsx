'use client';

import React, { useState } from 'react';
import { Check, Copy, FileCode2 } from 'lucide-react';
import { CropMarks } from '@/components/primitives/CropMarks';

export interface IdentityBlockProps {
  highlightedHtml: string;
  rawCode: string;
}

export default function IdentityBlock({ highlightedHtml, rawCode }: IdentityBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(rawCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full">
      <CropMarks size={14}>
        <div className="overflow-hidden rounded-[--radius-card] border border-[--border-strong] bg-[--bg-surface-1] shadow-xl">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[--border-hairline] bg-[--bg-surface-2] px-4 py-2.5 font-mono text-xs">
            <div className="flex items-center gap-2 text-[--text-secondary]">
              <FileCode2 size={14} className="text-[--accent]" />
              <span className="font-semibold text-[--text-primary]">rajendra.identity.ts</span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-1.5 rounded-[--radius-control] border border-[--border-hairline] bg-[--bg-surface-3] px-2.5 py-1 text-xs text-[--text-secondary] transition-colors hover:border-[--border-strong] hover:text-[--text-primary] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
              aria-label={copied ? 'Code copied to clipboard' : 'Copy identity specification code'}
            >
              {copied ? (
                <>
                  <Check size={12} className="text-[--status-live]" />
                  <span className="text-[--status-live] font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Pre-highlighted code container (Server rendered HTML via Shiki, 0 client JS for parsing) */}
          <div className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[--bg-surface-1]">
            <div
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
              className="shiki-wrapper"
            />
          </div>

          {/* Technical footer metadata */}
          <div className="flex items-center justify-between border-t border-[--border-hairline] bg-[--bg-surface-2] px-4 py-2 font-mono text-[11px] text-[--text-tertiary]">
            <span>TypeScript 5.x · Static Verification</span>
            <span className="text-[--status-live]">✓ Valid Schema</span>
          </div>
        </div>
      </CropMarks>
    </div>
  );
}
