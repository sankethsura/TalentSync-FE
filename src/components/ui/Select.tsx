import React, { forwardRef } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?:       string;
  error?:       string;
  options:      SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className = '', id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={[
            'block w-full rounded-xl border px-3.5 py-2 text-sm',
            'bg-surface/50 text-foreground',
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
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
