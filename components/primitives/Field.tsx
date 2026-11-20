import React from 'react';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  isTextArea?: boolean;
  rows?: number;
}

export const Field = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, FieldProps>(
  (
    {
      id,
      label,
      error,
      helperText,
      isTextArea = false,
      rows = 4,
      className = '',
      ...props
    },
    ref
  ) => {
    const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const descId = error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined;

    const baseInputStyles =
      'w-full px-3.5 py-2.5 bg-[--bg-surface-2] border border-[--border-hairline] rounded-[--radius-control] text-sm text-[--text-primary] placeholder-[--text-tertiary] focus:outline-none focus:border-[--accent] focus:ring-1 focus:ring-[--focus-ring] transition-colors disabled:opacity-50';

    return (
      <div className={`w-full space-y-1.5 ${className}`}>
        <label
          htmlFor={inputId}
          className="block font-mono text-xs text-[--text-secondary] uppercase tracking-wider"
        >
          {label}
        </label>
        {isTextArea ? (
          <textarea
            id={inputId}
            ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
            rows={rows}
            aria-describedby={descId}
            aria-invalid={!!error}
            className={`${baseInputStyles} resize-y`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={inputId}
            ref={ref as React.ForwardedRef<HTMLInputElement>}
            aria-describedby={descId}
            aria-invalid={!!error}
            className={baseInputStyles}
            {...props}
          />
        )}
        {error && (
          <p id={`${inputId}-error`} role="alert" className="text-xs text-[--status-live] text-red-400 font-mono">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className="text-xs text-[--text-tertiary] font-mono">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Field.displayName = 'Field';
