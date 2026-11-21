'use client';

import React from 'react';
import { Icon } from '@/components/primitives/Icon';

/**
 * FloatingAskAI: Bottom-right persistent trigger.
 * Opens the unified command palette directly in AI mode.
 * Styled with Blueprint design tokens (no hardcoded colors or radii).
 */
export default function FloatingAskAI() {
  const openChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cmdk', { detail: { mode: 'ai' } }));
    }
  };

  return (
    <button
      type="button"
      onClick={openChat}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-[--radius-pill] border border-[--line-soft] bg-[--bg-surface-2]/95 px-4 py-2.5 font-sans text-xs font-medium text-[--text-primary] shadow-xl backdrop-blur-md transition-all hover:border-[--accent] hover:bg-[--accent-dim] hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring]"
      aria-label="Ask AI assistant"
    >
      <Icon name="message-square" size={14} className="text-[--accent]" />
      <span>Ask AI</span>
    </button>
  );
}
