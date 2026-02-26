'use client';

import { ReactNode } from 'react';

interface BadgeProps {
  children:  ReactNode;
  variant?:  'brand' | 'blue' | 'green' | 'red' | 'muted';
  onRemove?: () => void;
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  brand: 'bg-brand-primary/15 text-brand-primary-light border-brand-primary/20',
  blue:  'bg-blue-500/15 text-blue-400 border-blue-500/20',
  green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  red:   'bg-red-500/15 text-red-400 border-red-500/20',
  muted: 'bg-muted/20 text-muted-foreground border-border/20',
};

export function Badge({ children, variant = 'brand', onRemove }: BadgeProps) {
  return (
    <span className={[
      'inline-flex items-center gap-1 rounded-lg border px-2.5 py-0.5 text-xs font-medium',
      variantClasses[variant],
    ].join(' ')}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 rounded-sm opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
          aria-label="Remove"
        >
          ×
        </button>
      )}
    </span>
  );
}
