import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?:      string;
  error?:      string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'block w-full rounded-xl border px-3.5 py-2 text-sm',
            'bg-surface/50 text-foreground placeholder:text-muted-foreground/50',
            'focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all',
            error
              ? 'border-red-500/40 focus:border-red-400/60 focus:ring-red-500/15'
              : 'border-border/20 focus:border-brand-primary/60 focus:ring-brand-primary/15',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />
        {error      && <p className="mt-1 text-xs text-red-400">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-muted-foreground/70">{helperText}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
