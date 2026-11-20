import React from 'react';

export interface TimelineEntry {
  date: string;
  title: string;
  organization?: string;
  description: string;
  tag?: string;
}

export interface TimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({
  entries,
  className = '',
}) => {
  return (
    <div className={`relative pl-6 space-y-8 border-l border-[--border-hairline] ${className}`}>
      {entries.map((entry, index) => (
        <div key={index} className="relative group">
          {/* Node Indicator */}
          <div
            className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-[--bg-page] border-2 border-[--accent] group-hover:scale-125 transition-transform"
            aria-hidden="true"
          />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
            <span className="font-mono text-xs text-[--accent] font-medium">
              {entry.date}
            </span>
            {entry.tag && (
              <span className="font-mono text-[11px] text-[--text-tertiary] uppercase">
                [{entry.tag}]
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-[--text-primary]">
            {entry.title}{' '}
            {entry.organization && (
              <span className="text-sm font-normal text-[--text-secondary]">
                · {entry.organization}
              </span>
            )}
          </h3>
          <p className="mt-1 text-sm text-[--text-secondary] leading-relaxed max-w-[68ch]">
            {entry.description}
          </p>
        </div>
      ))}
    </div>
  );
};
