'use client';

import React, { useEffect } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const storedTheme = window.localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const resolvedTheme = storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : systemTheme;

    root.dataset.theme = resolvedTheme;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemTheme = (event: MediaQueryListEvent) => {
      if (!window.localStorage.getItem('theme')) {
        root.dataset.theme = event.matches ? 'light' : 'dark';
      }
    };

    mediaQuery.addEventListener('change', handleSystemTheme);
    return () => mediaQuery.removeEventListener('change', handleSystemTheme);
  }, []);

  return <>{children}</>;
}
