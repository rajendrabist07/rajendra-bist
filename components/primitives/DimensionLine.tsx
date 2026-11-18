import React from 'react';

export interface DimensionLineProps {
  label?: string;
  className?: string;
}

export const DimensionLine: React.FC<DimensionLineProps> = ({
  label = 'SYSTEM BOUNDARY',
  className = '',
}) => {
  return (
    <div
      role="separator"
      aria-label={label}
      className={`w-full flex items-center gap-3 my-6 font-mono text-[11px] text-[--text-tertiary] ${className}`}
    >
      <span className="w-1.5 h-3 border-l-2 border-t border-b border-[--border-strong] shrink-0" />
      <span className="h-px bg-[--border-hairline] flex-1" />
      <span className="tracking-widest uppercase shrink-0 px-2 text-[--text-tertiary]">
        |-- {label} --|
      </span>
      <span className="h-px bg-[--border-hairline] flex-1" />
      <span className="w-1.5 h-3 border-r-2 border-t border-b border-[--border-strong] shrink-0" />
    </div>
  );
};
