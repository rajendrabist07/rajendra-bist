'use client';

import React, { useEffect, useState } from 'react';

const PHRASES = [
  'Full-Stack Developer',
  'Node.js · TypeScript · PostgreSQL',
  'Apps from schema to deployment',
];

/**
 * TypedRole: Typed role line with zero layout shift.
 * Runs exactly ONE full cycle then permanently settles on "Full-Stack Developer".
 * SSR renders "Full-Stack Developer" for SEO.
 * Fully accessible: aria-hidden animated layer, screen-reader full list, static under reduced motion.
 */
export default function TypedRole() {
  const [displayText, setDisplayText] = useState('Full-Stack Developer');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Under prefers-reduced-motion, keep static final phrase immediately
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setIsDone(true);
      return;
    }

    let isMounted = true;
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let cycleCount = 0;

    // Start with empty to run typing cycle
    setDisplayText('');

    const typeSpeed = 50;
    const eraseSpeed = 25;
    const holdTime = 1600;

    let timeoutId: NodeJS.Timeout;

    function step() {
      if (!isMounted) return;

      const currentPhrase = PHRASES[phraseIdx];

      if (!isDeleting) {
        // Typing
        charIdx++;
        setDisplayText(currentPhrase.slice(0, charIdx));

        if (charIdx === currentPhrase.length) {
          // Finished typing current phrase
          if (cycleCount === 1 && phraseIdx === 0) {
            // One full cycle completed and settled on "Full-Stack Developer"
            setIsDone(true);
            return;
          }

          // Hold before deleting
          isDeleting = true;
          timeoutId = setTimeout(step, holdTime);
          return;
        }

        timeoutId = setTimeout(step, typeSpeed);
      } else {
        // Deleting
        charIdx--;
        setDisplayText(currentPhrase.slice(0, charIdx));

        if (charIdx === 0) {
          // Finished deleting current phrase
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % PHRASES.length;
          if (phraseIdx === 0) {
            cycleCount++;
          }
          timeoutId = setTimeout(step, 200);
          return;
        }

        timeoutId = setTimeout(step, eraseSpeed);
      }
    }

    timeoutId = setTimeout(step, 400);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      className="h-8 flex items-center font-mono text-base sm:text-lg text-[--accent] font-medium"
      style={{ minHeight: '2rem' }}
    >
      {/* Screen-reader accessible full text */}
      <span className="sr-only">
        {PHRASES.join(', ')}
      </span>

      {/* Visual animated layer */}
      <span aria-hidden="true" className="inline-block tracking-tight">
        {displayText}
      </span>
      <span
        aria-hidden="true"
        className={`ml-1 inline-block w-2 h-5 bg-[--accent] ${
          isDone ? 'opacity-80' : 'animate-pulse'
        }`}
        style={{
          verticalAlign: 'middle',
        }}
      />
    </div>
  );
}
