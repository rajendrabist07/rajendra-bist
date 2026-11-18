import React from 'react';

export interface AnnotationProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const Annotation: React.FC<AnnotationProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-[--accent] bg-[--accent-dim] border border-[--accent] rounded-[--radius-control] font-medium ${className}`}
      {...props}
    >
      [{children}]
    </span>
  );
};
