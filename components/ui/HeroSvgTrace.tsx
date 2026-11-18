'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * HeroSvgTrace: Exactly ONE slow architectural trace line in the hero background.
 * Pauses when offscreen (IntersectionObserver), when document is hidden (visibilitychange),
 * and under prefers-reduced-motion. Zero unnecessary main-thread overhead.
 */
export default function HeroSvgTrace() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    // 1. Reduced motion check
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setIsPaused(true);
      return;
    }

    // 2. Tab visibility listener
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // 3. Offscreen intersection observer
    let observer: IntersectionObserver;
    if (containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            setIsPaused(!entry.isIntersecting);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(containerRef.current);
    }

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full opacity-35"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M -50,450 L 320,450 L 480,280 L 960,280 L 1120,520 L 1500,520"
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeDasharray="8 12"
          className={isPaused ? '' : 'animate-blueprint-trace'}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running',
          }}
        />
      </svg>
      <style jsx>{`
        @keyframes blueprintTrace {
          from {
            stroke-dashoffset: 200;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-blueprint-trace {
          animation: blueprintTrace 24s linear infinite;
        }
      `}</style>
    </div>
  );
}
