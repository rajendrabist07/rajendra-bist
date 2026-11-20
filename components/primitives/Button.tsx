import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      className = '',
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        'bg-[--accent] text-[--accent-ink] hover:brightness-110 shadow-[0_4px_16px_var(--accent-dim)] border border-[--accent]',
      secondary:
        'bg-[--bg-surface-2] text-[--text-primary] border border-[--border-hairline] hover:border-[--border-strong] hover:bg-[--accent-dim]',
      ghost:
        'bg-transparent text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim]',
    }[variant];

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs font-mono',
      md: 'px-4 py-2 text-sm font-medium',
      lg: 'px-6 py-3 text-base font-medium',
    }[size];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-[--radius-control] transition-all duration-[--duration-micro] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] focus-visible:ring-offset-2 focus-visible:ring-offset-[--bg-page] ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
