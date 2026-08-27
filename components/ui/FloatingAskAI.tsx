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
      className="fixed top-3.5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-sky-400/40 bg-[#0c1017]/95 px-3.5 py-1.5 text-xs font-semibold text-sky-200 shadow-[0_0_25px_rgba(56,189,248,0.25)] backdrop-blur-xl transition-all duration-200 hover:border-sky-300 hover:bg-sky-500/20 hover:text-white hover:scale-105 active:scale-95 cursor-pointer sm:top-3.5 sm:right-6 sm:px-4 sm:py-1.5"
      aria-label="Ask AI Agent"
    >
      <Sparkles size={13} className="text-sky-300 animate-pulse" />
      <span>Ask AI</span>
      <span className="rounded bg-white/10 px-1 py-0.5 text-[10px] font-mono text-sky-300">
        ⌘K
      </span>
    </button>
  );
}
