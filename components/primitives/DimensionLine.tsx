import React from 'react';

export interface DimensionLineProps {
  label: string;
  className?: string;
}

/**
 * DimensionLine: Technical section boundary line with endpoint ticks and a real content label.
 * Free of fake terminal decorations (|-- --|).
 */
export const DimensionLine: React.FC<DimensionLineProps> = ({
  label,
  className = '',
}) => {
  return (
    <div
      role="separator"
      aria-label={label}
      className={`w-full flex items-center gap-3 my-8 font-mono text-xs text-[--text-tertiary] ${className}`}
    >
      <span className="w-1.5 h-2.5 border-l-2 border-t border-b border-[--border-strong] shrink-0" aria-hidden="true" />
      <span className="h-px bg-[--border-hairline] flex-1" aria-hidden="true" />
      <span className="shrink-0 px-2 font-medium tracking-wide uppercase text-[--text-tertiary]">
        {label}
      </span>
      <span className="h-px bg-[--border-hairline] flex-1" aria-hidden="true" />
      <span className="w-1.5 h-2.5 border-r-2 border-t border-b border-[--border-strong] shrink-0" aria-hidden="true" />
    </div>
  );
};
