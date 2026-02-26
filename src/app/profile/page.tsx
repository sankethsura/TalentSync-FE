'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { CandidateProfile } from '@/types';
import api from '@/lib/api';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !user) { router.replace('/login'); return; }
    if (user) {
      api.get<{ profile: CandidateProfile }>('/api/profile')
        .then((res) => setProfile(res.data.profile))
        .catch(() => setProfile(null))
        .finally(() => setLoadingProfile(false));
    }
  }, [user, loading, router]);

  const handleSuccess = (updated: CandidateProfile) => {
    setProfile(updated);
    setSaved(true);
    setTimeout(() => router.replace('/dashboard'), 1500);
  };

  if (loading || loadingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 border-b border-border/[0.06] bg-surface/80 backdrop-blur-sm px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <a href="/dashboard" className="text-xl font-bold text-brand-primary-light">
            TalentSync
          </a>
          <div className="flex items-center gap-4">
            {saved && (
              <span className="flex items-center gap-1.5 text-xs font-medium text-green-400">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Saved
              </span>
            )}
            <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Dashboard
            </a>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep your profile up to date for better AI-powered job matches.
          </p>
        </div>

        <ProfileForm initialData={profile} onSuccess={handleSuccess} />
      </main>
    </div>
  );
}
