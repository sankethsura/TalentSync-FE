'use client';

import { Suspense } from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

function CallbackHandler() {
  const { login } = useAuth();
  const router     = useRouter();
  const params     = useSearchParams();

  useEffect(() => {
    const token = params.get('token');
    if (!token) { router.replace('/login?error=oauth_failed'); return; }

    login(token)
      .then(() => {
        const redirect = params.get('redirect');
        router.replace(redirect === 'dashboard' ? '/dashboard' : '/profile/setup');
      })
      .catch(() => router.replace('/login?error=oauth_failed'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Signing you in…</p>
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
      </div>
    }>
      <CallbackHandler />
    </Suspense>
  );
}
