'use client';

import React from 'react';
import { useTheme } from '@/components/theme-provider';
import { Icon } from './Icon';

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = true,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to Light Drafting Paper' : 'Switch to Dark Ink Navy';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="button"
      aria-pressed={isDark}
      aria-label={label}
      title={label}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-[--radius-control] font-mono text-xs border border-[--border-hairline] bg-[--bg-surface-2] text-[--text-secondary] hover:text-[--text-primary] hover:border-[--border-strong] hover:bg-[--accent-dim] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] ${className}`}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={14} className="text-[--accent]" />
      {showLabel && <span>{isDark ? 'Drafting Paper' : 'Ink Navy'}</span>}
    </button>
  );
};
