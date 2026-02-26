'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import { useAuth } from '@/hooks/useAuth';

function LoginInner() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (!loading && user) {
      router.replace(user.profileComplete ? '/dashboard' : '/profile/setup');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <a href="/" className="text-2xl font-bold text-brand-primary-light">
            TalentSync
          </a>
          <h1 className="mt-4 text-xl font-semibold text-foreground">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to your dashboard</p>
        </div>

        <div className="rounded-2xl border border-border/10 bg-surface/60 backdrop-blur-sm p-8">
          {error && (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error === 'oauth_failed'
                ? 'Sign-in failed. Please try again.'
                : 'Something went wrong. Please try again.'}
            </div>
          )}

          <GoogleSignInButton />

          <p className="mt-6 text-center text-xs text-muted-foreground/60">
            By signing in, you agree to our{' '}
            <span className="underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
      </div>
    }>
      <LoginInner />
    </Suspense>
  );
}
