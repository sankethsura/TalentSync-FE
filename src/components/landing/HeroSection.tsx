'use client';

import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 pt-24 pb-16">
      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-brand-primary/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-primary-light animate-pulse" />
          <span className="text-xs font-medium text-brand-primary-light">AI-powered job search</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Land your dream job{' '}
          <span className="bg-gradient-to-r from-brand-primary-light to-brand-secondary-light bg-clip-text text-transparent">
            on autopilot
          </span>
        </h1>

        {/* Sub */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          TalentSync analyses your profile, finds the best matching roles, and auto-applies
          with AI-tailored cover letters — so you can focus on interviews, not applications.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button size="lg" onClick={() => window.location.href = '/login'}>
            Start for free →
          </Button>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            See how it works ↓
          </a>
        </div>

        {/* Social proof */}
        <p className="mt-8 text-xs text-muted-foreground/50">
          No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
