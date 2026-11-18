import React from 'react';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'status' | 'tech' | 'blueprint';
  activeDot?: boolean;
}

export const Chip: React.FC<ChipProps> = ({
  variant = 'tech',
  activeDot = false,
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    status:
      'bg-[--status-live-dim] text-[--status-live] border border-[--status-live] font-mono text-xs rounded-[--radius-pill] px-3 py-1 font-medium inline-flex items-center gap-1.5',
    tech:
      'bg-[--bg-surface-2] text-[--text-secondary] border border-[--border-hairline] font-mono text-xs rounded-[--radius-control] px-2.5 py-0.5 inline-flex items-center gap-1.5',
    blueprint:
      'bg-[--accent-dim] text-[--accent] border border-[--accent] font-mono text-xs uppercase tracking-wider px-2.5 py-0.5 rounded-[--radius-pill] font-medium inline-flex items-center gap-1.5',
  }[variant];

  return (
    <span className={`${variantStyles} ${className}`} {...props}>
      {activeDot && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-[--status-live] animate-pulse"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
