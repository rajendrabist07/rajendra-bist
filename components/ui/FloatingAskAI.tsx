'use client';

import React from 'react';
import { Bot } from 'lucide-react';

export default function FloatingAskAI() {
  const openChat = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-chat-widget'));
    }
  };

  return (
    <button
      type="button"
      onClick={openChat}
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full border border-[--border-strong] bg-[--bg-surface-2] px-4 py-2.5 font-mono text-xs font-semibold text-[--text-primary] shadow-2xl backdrop-blur-xl transition-all duration-200 hover:border-[--accent-warm] hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-warm]"
      aria-label="Ask AI Assistant"
    >
      <Bot size={15} className="text-[--accent-cool] animate-pulse" />
      <span>AI Assistant</span>
      <span className="rounded border border-[--border-subtle] bg-[--bg-surface] px-1.5 py-0.5 text-[10px] text-[--text-tertiary]">
        ⌘K
      </span>
    </button>
  );
}
