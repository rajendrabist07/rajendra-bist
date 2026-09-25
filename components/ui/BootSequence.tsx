'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BootSequence() {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState(0);

  const lines = [
    '> initializing rajendra.dev kernel...',
    '> loading distributed systems telemetry...',
    '> systems online. welcome.',
  ];

  useEffect(() => {
    // 1. Accessibility guard: Skip immediately if prefers-reduced-motion is active
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(false);
      return;
    }

    // 2. Step progression
    const t1 = setTimeout(() => setStep(1), 250);
    const t2 = setTimeout(() => setStep(2), 550);
    const t3 = setTimeout(() => setVisible(false), 950);

    // 3. Hard 1.2s timeout fallback: Guarantee UI never blocks under any slow device conditions
    const hardTimeout = setTimeout(() => setVisible(false), 1200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(hardTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: '-100%', opacity: 0.9 }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#050608] p-6 sm:p-12 font-mono cursor-pointer select-none"
        >
          {/* Top Status */}
          <div className="flex items-center justify-between text-xs text-[#5A6270]">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#34D8B0] animate-pulse" />
              RB-KERNEL v2.6.4
            </span>
            <span>PRESS ESC OR CLICK TO SKIP [x]</span>
          </div>

          {/* Terminal Output Lines */}
          <div className="max-w-xl space-y-2.5 my-auto">
            {lines.slice(0, step + 1).map((line, idx) => (
              <div
                key={idx}
                className={`text-sm sm:text-base ${
                  idx === step ? 'text-[#FF7A33]' : 'text-[#8E97A3]'
                }`}
              >
                <span>{line}</span>
                {idx === step && (
                  <span className="ml-1 inline-block w-2 bg-[#FF7A33] animate-cursor-blink">_</span>
                )}
              </div>
            ))}
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between border-t border-white/5 pt-4 text-[11px] text-[#5A6270]">
            <span>LOC: KATHMANDU, NEPAL (UTC+5:45)</span>
            <span>MEM: 64MB / STACK: NEXT.JS 15</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
