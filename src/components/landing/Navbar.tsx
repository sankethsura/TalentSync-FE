'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={[
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled ? 'border-b border-border/[0.06] bg-background/80 backdrop-blur-md' : 'bg-transparent',
    ].join(' ')}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-xl font-bold text-brand-primary-light">TalentSync</span>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign in
          </a>
          <Button size="sm" onClick={() => window.location.href = '/login'}>
            Get started
          </Button>
        </div>
      </div>
    </nav>
  );
}
