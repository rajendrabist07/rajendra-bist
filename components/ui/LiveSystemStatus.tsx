'use client';

import React from 'react';
import { GitCommit, Activity } from 'lucide-react';

interface LiveSystemStatusProps {
  relativeTime?: string;
  repoName?: string;
  isRecent?: boolean;
}

export default function LiveSystemStatus({
  relativeTime = 'Active today',
  repoName = 'rajendra-bist',
  isRecent = true,
}: LiveSystemStatusProps) {
  return (
    <div
      aria-live="polite"
      className="inline-flex items-center gap-2.5 rounded-full border border-[--border-subtle] bg-[--bg-surface-2] px-3.5 py-1.5 font-mono text-xs text-[--text-secondary] backdrop-blur-md shadow-sm transition-all duration-200 hover:border-[--border-strong]"
    >
      <span className="relative flex h-2 w-2 items-center justify-center">
        {isRecent ? (
          <>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[--accent-cool] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[--accent-cool] shadow-[0_0_8px_var(--accent-cool)]" />
          </>
        ) : (
          <span className="h-2 w-2 rounded-full bg-slate-500" />
        )}
      </span>

      <span className="flex items-center gap-1.5">
        <GitCommit size={13} className="text-[--text-tertiary]" />
        <span className="text-[--text-primary] font-medium">{repoName}</span>
        <span className="text-[--text-tertiary]">•</span>
        <span className="text-[--accent-cool]">{relativeTime}</span>
      </span>
    </div>
  );
}
