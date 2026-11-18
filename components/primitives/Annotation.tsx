import React from 'react';

export interface AnnotationProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * Annotation: Semantic technical callout chip carrying real data only
 * (e.g., location, timezone clock, live status, verified policy counts).
 * Strictly renders real facts without decorative chrome or pseudo-terminal brackets.
 */
export const Annotation: React.FC<AnnotationProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 font-mono text-xs tracking-tight text-[--accent] bg-[--accent-dim] border border-[--accent] rounded-[--radius-control] font-medium ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
