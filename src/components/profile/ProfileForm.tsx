'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema, ProfileFormData } from '@/lib/validators';
import { CandidateProfile } from '@/types';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SkillsSection } from './SkillsSection';
import { ResumeUpload } from './ResumeUpload';
import api from '@/lib/api';

const REMOTE_OPTIONS = [
  { value: 'OPEN',   label: 'Open to all'  },
  { value: 'REMOTE', label: 'Remote only'  },
  { value: 'HYBRID', label: 'Hybrid'       },
  { value: 'ONSITE', label: 'On-site only' },
];

// ── Reusable section card ─────────────────────────────────

function Section({ title, subtitle, children }: {
  title: string; subtitle?: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border/10 bg-surface/60 backdrop-blur-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border/[0.08] bg-surface/40">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
}

// ── Tag input ─────────────────────────────────────────────

function TagInput({ label, placeholder, tags, inputValue, onInputChange, onAdd, onRemove, badgeVariant = 'brand' }: {
  label: string; placeholder: string; tags: string[];
  inputValue: string; onInputChange: (v: string) => void;
  onAdd: () => void; onRemove: (t: string) => void;
  badgeVariant?: 'brand' | 'blue' | 'green';
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
          placeholder={placeholder}
          className="flex-1 rounded-xl border border-border/20 bg-surface/50 px-3.5 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-brand-primary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/15 transition-all"
        />
        <Button type="button" size="sm" variant="outline" onClick={onAdd}>Add</Button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((t) => (
            <Badge key={t} variant={badgeVariant as any} onRemove={() => onRemove(t)}>{t}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main form ─────────────────────────────────────────────

interface ProfileFormProps {
  initialData?: CandidateProfile | null;
  onSuccess?:   (profile: CandidateProfile) => void;
}

export function ProfileForm({ initialData, onSuccess }: ProfileFormProps) {
  const [saving,         setSaving]         = useState(false);
  const [error,          setError]          = useState<string | null>(null);
  const [resumeUrl,      setResumeUrl]      = useState(initialData?.resumeUrl      ?? null);
  const [resumeFileName, setResumeFileName] = useState(initialData?.resumeFileName ?? null);
  const [newJobTitle,    setNewJobTitle]    = useState('');
  const [newLocation,    setNewLocation]    = useState('');

  const methods = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone:                 initialData?.phone                 ?? '',
      location:              initialData?.location              ?? '',
      yearsOfExperience:     initialData?.yearsOfExperience     ?? undefined,
      primaryJobTitle:       initialData?.primaryJobTitle       ?? '',
      remotePreference:      initialData?.remotePreference      ?? 'OPEN',
      minExpectedSalary:     initialData?.minExpectedSalary     ?? undefined,
      dailyApplicationLimit: initialData?.dailyApplicationLimit ?? 10,
      skills: initialData?.skills?.map((s) => ({
        name:              s.name,
        proficiencyLevel:  s.proficiencyLevel,
        yearsOfExperience: s.yearsOfExperience ?? undefined,
      })) ?? [],
      preferredJobTitles: initialData?.preferredJobTitles?.map((t) => t.title)    ?? [],
      preferredLocations: initialData?.preferredLocations?.map((l) => l.location) ?? [],
    },
    mode: 'onTouched',
  });

  const { register, handleSubmit, formState: { errors }, watch, setValue } = methods;
  const preferredJobTitles = watch('preferredJobTitles');
  const preferredLocations = watch('preferredLocations');

  const addJobTitle = () => {
    const v = newJobTitle.trim();
    if (v && !preferredJobTitles.includes(v)) { setValue('preferredJobTitles', [...preferredJobTitles, v]); setNewJobTitle(''); }
  };
  const addLocation = () => {
    const v = newLocation.trim();
    if (v && !preferredLocations.includes(v)) { setValue('preferredLocations', [...preferredLocations, v]); setNewLocation(''); }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setSaving(true);
    setError(null);
    try {
      const res = await api.put<{ profile: CandidateProfile }>('/api/profile', data);
      onSuccess?.(res.data.profile);
    } catch {
      setError('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <FormProvider {...methods}>
      {/* No onSubmit on <form> — prevents file-picker from accidentally triggering submission */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

        {/* Basic Information */}
        <Section title="Basic Information" subtitle="Your core professional details">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Input
                label="Primary Job Title"
                placeholder="e.g. Senior Software Engineer"
                error={errors.primaryJobTitle?.message}
                {...register('primaryJobTitle')}
              />
            </div>
            <Input
              label="Years of Experience"
              type="number" min={0} max={50} placeholder="0"
              error={errors.yearsOfExperience?.message}
              {...register('yearsOfExperience')}
            />
            <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" {...register('phone')} />
            <div className="sm:col-span-2">
              <Input label="Current Location" placeholder="e.g. San Francisco, CA" {...register('location')} />
            </div>
          </div>
        </Section>

        {/* Job Preferences */}
        <Section title="Job Preferences" subtitle="Tailor your job search criteria">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-6">
            <Select label="Remote Preference" options={REMOTE_OPTIONS} {...register('remotePreference')} />
            <Input
              label="Min. Expected Salary (USD/yr)"
              type="number" min={0} placeholder="e.g. 120000"
              {...register('minExpectedSalary')}
            />
            <Input
              label="Daily Application Limit"
              type="number" min={1} max={100}
              helperText="Max auto-applications per day"
              {...register('dailyApplicationLimit')}
            />
          </div>

          <div className="space-y-5">
            <TagInput
              label="Preferred Job Titles"
              placeholder="e.g. Staff Engineer"
              tags={preferredJobTitles}
              inputValue={newJobTitle}
              onInputChange={setNewJobTitle}
              onAdd={addJobTitle}
              onRemove={(t) => setValue('preferredJobTitles', preferredJobTitles.filter((x) => x !== t))}
              badgeVariant="blue"
            />
            <TagInput
              label="Preferred Locations"
              placeholder="e.g. New York, NY or Remote"
              tags={preferredLocations}
              inputValue={newLocation}
              onInputChange={setNewLocation}
              onAdd={addLocation}
              onRemove={(l) => setValue('preferredLocations', preferredLocations.filter((x) => x !== l))}
              badgeVariant="green"
            />
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills" subtitle="Your technical and professional capabilities">
          <SkillsSection />
        </Section>

        {/* Resume */}
        <Section title="Resume" subtitle="Used for auto-generating tailored applications">
          <ResumeUpload
            currentResumeUrl={resumeUrl}
            currentFileName={resumeFileName}
            onUploadSuccess={(url, name) => { setResumeUrl(url); setResumeFileName(name); }}
          />
        </Section>

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <Button type="button" size="lg" loading={saving} onClick={() => handleSubmit(onSubmit)()}>
            Save Profile
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
