'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: () => {},
});

function getCookieTheme(): Theme | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )theme=([^;]*)/);
  if (match) {
    const val = decodeURIComponent(match[1]);
    if (val === 'light' || val === 'dark') return val;
  }
  return null;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    // Read from DOM attribute first (already set by layout inline script without flash)
    const domTheme = document.documentElement.getAttribute('data-theme') as Theme | null;
    const cookieTheme = getCookieTheme();
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const active = domTheme || cookieTheme || systemTheme;
    setThemeState(active);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!getCookieTheme()) {
        const next = e.matches ? 'light' : 'dark';
        applyTheme(next, false);
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const applyTheme = (nextTheme: Theme, persist = true) => {
    setThemeState(nextTheme);
    const root = document.documentElement;
    root.setAttribute('data-theme', nextTheme);
    root.dataset.theme = nextTheme;
    root.style.colorScheme = nextTheme;

    if (persist) {
      document.cookie = `theme=${nextTheme};path=/;max-age=31536000;SameSite=Lax`;
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    applyTheme(next, true);
  };

  const setTheme = (t: Theme) => {
    applyTheme(t, true);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
