import React from 'react';

export interface ToastProps {
  message: string;
  variant?: 'info' | 'success';
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'info',
  onClose,
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center justify-between gap-4 px-4 py-2.5 bg-[--bg-surface-2] border border-[--border-strong] rounded-[--radius-control] shadow-xl text-sm text-[--text-primary] font-mono ${className}`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${
            variant === 'success' ? 'bg-[--status-live]' : 'bg-[--accent]'
          }`}
          aria-hidden="true"
        />
        <span>{message}</span>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-xs text-[--text-tertiary] hover:text-[--text-primary] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[--focus-ring]"
          aria-label="Close notification"
        >
          ✕
        </button>
      )}
    </div>
  );
};
