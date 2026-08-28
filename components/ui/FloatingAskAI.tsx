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
      className="fixed top-20 right-6 sm:top-22 sm:right-10 md:top-24 md:right-12 z-50 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-[#0c1017]/90 px-4 py-2 text-xs font-semibold text-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.25)] backdrop-blur-xl transition-all duration-300 hover:border-sky-300 hover:bg-sky-500/20 hover:text-white hover:scale-105 active:scale-95 cursor-pointer"
      aria-label="Ask AI Agent"
    >
      <Sparkles size={14} className="text-sky-300 animate-pulse" />
      <span>Ask AI</span>
      <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-mono text-sky-300">
        ⌘K
      </span>
    </button>
  );
}
