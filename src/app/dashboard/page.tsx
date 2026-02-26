'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    } else if (!loading && user && !user.profileComplete) {
      router.replace('/profile/setup');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav */}
      <nav className="sticky top-0 z-30 border-b border-border/[0.06] bg-surface/80 backdrop-blur-sm px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span className="text-xl font-bold text-brand-primary-light">TalentSync</span>
          <div className="flex items-center gap-4">
            <a
              href="/profile"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Profile
            </a>
            {user.picture && (
              <Image
                src={user.picture}
                alt={user.name || 'User'}
                width={32}
                height={32}
                className="rounded-full ring-2 ring-border/20"
              />
            )}
            <Button variant="ghost" size="sm" onClick={logout}>
              Sign out
            </Button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Welcome banner */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary px-8 py-7 shadow-glow-brand">
          <h1 className="text-2xl font-bold text-white">
            Welcome back{user.name ? `, ${user.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="mt-1 text-white/70">
            Your AI job search assistant is ready to go.
          </p>
        </div>

        {/* Stats grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: 'Applications Sent',    value: '0', icon: '📤' },
            { label: 'Interviews Scheduled', value: '0', icon: '🗓️' },
            { label: 'Offers Received',      value: '0', icon: '🎉' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border/10 bg-surface/60 backdrop-blur-sm p-6"
            >
              <div className="mb-3 text-3xl">{stat.icon}</div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="rounded-2xl border border-border/10 bg-surface/60 backdrop-blur-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-border/[0.08] bg-surface/40">
            <h2 className="text-sm font-semibold text-foreground">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href="/profile"
                className="flex items-center gap-3 rounded-xl border border-border/20 bg-surface/40 p-4 hover:border-brand-primary/40 hover:bg-brand-primary/5 transition-all"
              >
                <span className="text-2xl">👤</span>
                <div>
                  <div className="font-medium text-foreground">Edit Profile</div>
                  <div className="text-sm text-muted-foreground">Update your skills and preferences</div>
                </div>
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-border/20 p-4 opacity-50">
                <span className="text-2xl">🤖</span>
                <div>
                  <div className="font-medium text-foreground">Auto-Apply</div>
                  <div className="text-sm text-muted-foreground">Coming soon</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
