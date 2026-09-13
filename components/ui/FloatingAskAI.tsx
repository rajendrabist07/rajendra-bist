"use client";

import { Sparkles } from "lucide-react";

export default function FloatingAskAI() {
  const openChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-chat-widget"));
    }
  };

  return (
    <button
      type="button"
      onClick={openChat}
      className="premium-button-secondary fixed top-20 right-6 sm:top-22 sm:right-10 md:top-24 md:right-12 z-50 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold shadow-[0_18px_46px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--accent-primary] focus-visible:ring-offset-2 focus-visible:ring-offset-[--bg-primary]"
      aria-label="Ask AI Agent"
    >
      <Sparkles size={14} className="text-[--accent-primary] animate-pulse" />
      <span>Ask AI</span>
      <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-[--accent-secondary]">
        ⌘K
      </span>
    </button>
  );
}
