'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '@/lib/validators';
import api from '@/lib/api';
import { CandidateProfile } from '@/types';

// ── Types ─────────────────────────────────────────────────

interface ProfileSetupState {
  form:               UseFormReturn<ProfileFormData>;
  // Resume (separate from form — uploaded independently)
  resumeUrl:          string | null;
  resumeFileName:     string | null;
  setResumeUrl:       (url: string | null) => void;
  setResumeFileName:  (name: string | null) => void;
  // Preferred tag inputs (controlled locally but stored here)
  newJobTitle:        string;
  setNewJobTitle:     (v: string) => void;
  newLocation:        string;
  setNewLocation:     (v: string) => void;
  addJobTitle:        () => void;
  removeJobTitle:     (t: string) => void;
  addLocation:        () => void;
  removeLocation:     (l: string) => void;
  // Submission
  saving:             boolean;
  error:              string | null;
  submitProfile:      () => void;
}

const ProfileSetupContext = createContext<ProfileSetupState | null>(null);

// ── Provider ──────────────────────────────────────────────

export function ProfileSetupProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      primaryJobTitle:       '',
      phone:                 '',
      location:              '',
      remotePreference:      'OPEN',
      dailyApplicationLimit: 10,
      skills:                [],
      preferredJobTitles:    [],
      preferredLocations:    [],
    },
    mode: 'onTouched',
  });

  const [resumeUrl,      setResumeUrl]      = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [newJobTitle,    setNewJobTitle]    = useState('');
  const [newLocation,    setNewLocation]    = useState('');
  const [saving,         setSaving]         = useState(false);
  const [error,          setError]          = useState<string | null>(null);

  // ── Tag helpers ────────────────────────────────────────
  const preferredJobTitles = form.watch('preferredJobTitles');
  const preferredLocations = form.watch('preferredLocations');

  const addJobTitle = useCallback(() => {
    const v = newJobTitle.trim();
    if (v && !preferredJobTitles.includes(v)) {
      form.setValue('preferredJobTitles', [...preferredJobTitles, v]);
      setNewJobTitle('');
    }
  }, [newJobTitle, preferredJobTitles, form]);

  const removeJobTitle = useCallback(
    (t: string) =>
      form.setValue('preferredJobTitles', preferredJobTitles.filter((x) => x !== t)),
    [preferredJobTitles, form],
  );

  const addLocation = useCallback(() => {
    const v = newLocation.trim();
    if (v && !preferredLocations.includes(v)) {
      form.setValue('preferredLocations', [...preferredLocations, v]);
      setNewLocation('');
    }
  }, [newLocation, preferredLocations, form]);

  const removeLocation = useCallback(
    (l: string) =>
      form.setValue('preferredLocations', preferredLocations.filter((x) => x !== l)),
    [preferredLocations, form],
  );

  // ── Submit ─────────────────────────────────────────────
  const onSubmit = useCallback(
    async (data: ProfileFormData) => {
      setSaving(true);
      setError(null);
      try {
        await api.put<{ profile: CandidateProfile }>('/api/profile', data);
        router.replace('/dashboard');
      } catch {
        setError('Failed to save profile. Please try again.');
        setSaving(false);
      }
    },
    [router],
  );

  // Exposed as a zero-arg function so the button just calls submitProfile()
  const submitProfile = useCallback(
    () => form.handleSubmit(onSubmit)(),
    [form, onSubmit],
  );

  return (
    <ProfileSetupContext.Provider
      value={{
        form,
        resumeUrl,      setResumeUrl,
        resumeFileName, setResumeFileName,
        newJobTitle,    setNewJobTitle,
        newLocation,    setNewLocation,
        addJobTitle,    removeJobTitle,
        addLocation,    removeLocation,
        saving, error,
        submitProfile,
      }}
    >
      {/* FormProvider makes RHF context available to all nested components */}
      <FormProvider {...form}>{children}</FormProvider>
    </ProfileSetupContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────

export function useProfileSetup() {
  const ctx = useContext(ProfileSetupContext);
  if (!ctx) throw new Error('useProfileSetup must be used inside <ProfileSetupProvider>');
  return ctx;
}
