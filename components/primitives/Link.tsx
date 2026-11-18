import React from 'react';
import NextLink from 'next/link';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isExternal?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href,
  isExternal,
  className = '',
  children,
  ...props
}) => {
  const external = isExternal ?? (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'));

  const linkStyles =
    'inline-flex items-center gap-1 text-[--accent] hover:text-[--text-primary] underline underline-offset-4 decoration-[--border-strong] hover:decoration-[--accent] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] rounded-sm';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${linkStyles} ${className}`}
        {...props}
      >
        {children}
        <span className="sr-only">(opens in new window)</span>
        <svg
          className="w-3.5 h-3.5 opacity-70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    );
  }

  return (
    <NextLink href={href} className={`${linkStyles} ${className}`} {...props}>
      {children}
    </NextLink>
  );
};
