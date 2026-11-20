import React from 'react';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  hasDivider?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  hasDivider = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <section
      id={id}
      className={`relative w-full py-16 sm:py-24 ${
        hasDivider ? 'border-t border-[--border-hairline]' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};
