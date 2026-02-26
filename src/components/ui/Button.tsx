'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?:    'sm' | 'md' | 'lg';
  loading?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-glow-brand-sm',
  outline: 'border border-border/30 text-foreground hover:bg-surface/80 hover:border-border/60',
  ghost:   'text-muted-foreground hover:text-foreground hover:bg-surface/60',
  danger:  'bg-red-500/90 text-white hover:bg-red-500',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-xl',
  lg: 'px-6 py-2.5 text-sm rounded-xl',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, disabled, className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          'inline-flex items-center justify-center font-medium transition-all duration-150',
          'focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:ring-offset-0',
          'disabled:cursor-not-allowed disabled:opacity-50',
          variantClasses[variant],
          sizeClasses[size],
          className,
        ].join(' ')}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </span>
        ) : children}
      </button>
    );
  },
);

Button.displayName = 'Button';
