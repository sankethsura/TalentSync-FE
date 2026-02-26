'use client';

import { Button } from '@/components/ui/Button';

export function CTASection() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
          Ready to supercharge your job search?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Join thousands of candidates who land interviews faster with TalentSync.
        </p>
        <div className="mt-8">
          <Button size="lg" onClick={() => window.location.href = '/login'}>
            Get started for free →
          </Button>
        </div>
      </div>
    </section>
  );
}
