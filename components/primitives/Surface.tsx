import React from 'react';

export interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 1 | 2 | 3;
  interactive?: boolean;
}

export const Surface: React.FC<SurfaceProps> = ({
  level = 1,
  interactive = false,
  className = '',
  children,
  ...props
}) => {
  const levelStyles = {
    1: 'bg-[--bg-surface-1] border border-[--border-hairline] rounded-[--radius-card]',
    2: 'bg-[--bg-surface-2] border border-[--border-strong] rounded-[--radius-card]',
    3: 'bg-[--bg-surface-3] border border-[--border-hairline] rounded-[--radius-control]',
  }[level];

  const interactiveStyles = interactive
    ? 'hover:border-[--border-strong] hover:shadow-[0_0_24px_var(--accent-dim)] transition-all duration-[--duration-standard]'
    : '';

  return (
    <div
      className={`${levelStyles} ${interactiveStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
