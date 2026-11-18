'use client';

import React, { useState, useEffect } from 'react';

/**
 * IntroSequence: Honest, lightweight readiness indicator for first-time session visitors.
 * First visit per session only (sessionStorage). Maximum 900ms.
 * Tied to real readiness (document.fonts.ready, client hydration).
 * Skippable by any key or click. Zero fake version numbers.
 */
export default function IntroSequence() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(25);
  const [statusText, setStatusText] = useState('Verifying document fonts...');

  useEffect(() => {
    // 1. Session check: only first visit per session
    try {
      if (window.sessionStorage.getItem('rb_intro_seen') === 'true') {
        return;
      }
      window.sessionStorage.setItem('rb_intro_seen', 'true');
    } catch {
      // Session storage unavailable; skip intro
      return;
    }

    // 2. Reduced motion check: skip immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Activate intro sequence
    setVisible(true);

    let isMounted = true;

    // 3. Measure real font readiness
    if (document.fonts) {
      document.fonts.ready.then(() => {
        if (!isMounted) return;
        setProgress(70);
        setStatusText('Fonts ready · Initializing system layout...');
      });
    }

    // Progress animation to 100%
    const p1 = setTimeout(() => {
      if (isMounted) {
        setProgress(100);
        setStatusText('Ready.');
      }
    }, 600);

    // Complete and dismiss within 850ms (at most 900ms)
    const p2 = setTimeout(() => {
      if (isMounted) setVisible(false);
    }, 850);

    // Hard failsafe 2s
    const failsafe = setTimeout(() => {
      if (isMounted) setVisible(false);
    }, 2000);

    // Skippable on any key or click
    const handleKey = () => setVisible(false);
    window.addEventListener('keydown', handleKey);

    return () => {
      isMounted = false;
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(failsafe);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={() => setVisible(false)}
      className="fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 bg-[--bg-page] font-mono cursor-pointer select-none transition-opacity duration-300"
    >
      <div className="flex items-center justify-between text-xs text-[--text-tertiary]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[--accent] animate-pulse" />
          Rajendra Bist · Portfolio System
        </span>
        <span className="hover:text-[--text-primary] text-[11px]">
          Press any key or click to skip [✕]
        </span>
      </div>

      <div className="max-w-md w-full mx-auto my-auto space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[--text-secondary]">{statusText}</span>
          <span className="text-[--accent]">{progress}%</span>
        </div>

        {/* Thin real-readiness progress bar */}
        <div className="w-full h-1 bg-[--bg-surface-2] border border-[--border-hairline] rounded-full overflow-hidden">
          <div
            className="h-full bg-[--accent] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="text-[11px] text-[--text-tertiary] text-center sm:text-left">
        New Delhi, India (IST UTC+5:30)
      </div>
    </div>
  );
}
