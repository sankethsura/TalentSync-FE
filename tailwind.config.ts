import type { Config } from 'tailwindcss';

/**
 * THEMING
 * -------
 * All brand and semantic colours are driven by CSS custom properties
 * defined in globals.css.
 *
 * To rebrand the entire app:  change --color-brand-primary (+ *-lit, etc.)
 * To add a new theme:         add a .theme-xyz rule in globals.css
 *
 * Tailwind maps every token as: rgb(var(--token) / <alpha-value>)
 * so Tailwind's opacity modifier (e.g. bg-background/80) still works.
 */

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  // Toggle themes by adding/removing the `dark` class on <html>.
  darkMode: 'class',

  theme: {
    extend: {
      colors: {
        // ── Semantic (flip automatically between themes) ─────────
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        foreground: 'rgb(var(--color-fg) / <alpha-value>)',
        surface:    'rgb(var(--color-surface) / <alpha-value>)',
        border:     'rgb(var(--color-border) / <alpha-value>)',
        muted: {
          DEFAULT:    'rgb(var(--color-muted) / <alpha-value>)',
          foreground: 'rgb(var(--color-muted-fg) / <alpha-value>)',
        },

        // ── Brand (same hue in both themes — change to rebrand) ──
        brand: {
          primary:          'rgb(var(--color-brand-primary) / <alpha-value>)',
          'primary-light':  'rgb(var(--color-brand-primary-lit) / <alpha-value>)',
          secondary:        'rgb(var(--color-brand-secondary) / <alpha-value>)',
          'secondary-light':'rgb(var(--color-brand-secondary-lit) / <alpha-value>)',
          accent:           'rgb(var(--color-brand-accent) / <alpha-value>)',
          'accent-light':   'rgb(var(--color-brand-accent-lit) / <alpha-value>)',
        },
      },

      // Named glow shadows — automatically use brand colour vars
      boxShadow: {
        'glow-brand':    '0 0 24px rgb(var(--color-brand-primary) / 0.35)',
        'glow-brand-sm': '0 0 14px rgb(var(--color-brand-primary) / 0.25)',
        'glow-brand-lg': '0 0 48px rgb(var(--color-brand-primary) / 0.50)',
        'glow-secondary':'0 0 24px rgb(var(--color-brand-secondary) / 0.30)',
        'glow-accent':   '0 0 24px rgb(var(--color-brand-accent) / 0.30)',
      },
    },
  },

  plugins: [],
};

export default config;
