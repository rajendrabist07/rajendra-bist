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
        'bg-[--accent] text-[--accent-ink] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_var(--accent-dim)] active:translate-y-0 active:scale-[0.98] border border-[--accent] font-sans font-medium',
      secondary:
        'bg-[--bg-surface-2] text-[--text-primary] border border-[--line-soft] hover:border-[--accent] hover:bg-[--bg-surface-3] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] font-sans font-medium',
      ghost:
        'bg-transparent text-[--text-secondary] hover:text-[--text-primary] hover:bg-[--accent-dim] font-sans font-medium',
    }[variant];

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-xs font-sans',
      md: 'px-4 py-2 text-sm font-sans',
      lg: 'px-6 py-3 text-base font-sans',
    }[size];

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-[--radius-control] transition-all duration-[--duration-micro] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--focus-ring] focus-visible:ring-offset-2 focus-visible:ring-offset-[--bg-page] motion-reduce:transform-none ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
