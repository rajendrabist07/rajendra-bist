'use client';

import React, { useState } from 'react';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipId = `tooltip-${content.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <div aria-describedby={isVisible ? tooltipId : undefined}>{children}</div>
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className="absolute z-50 px-2.5 py-1 text-xs font-mono text-[--text-primary] bg-[--bg-surface-3] border border-[--border-strong] rounded-[--radius-control] shadow-lg whitespace-nowrap bottom-full left-1/2 -translate-x-1/2 mb-1.5 pointer-events-none"
        >
          {content}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[--border-strong]"
            aria-hidden="true"
          />
        </div>
      )}
    </div>
  );
};
