'use client';

import { Suspense } from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useProfileSetup } from '@/contexts/ProfileSetupContext';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SkillsSection } from '@/components/profile/SkillsSection';
import { ResumeUpload } from '@/components/profile/ResumeUpload';

// ── Constants ─────────────────────────────────────────────

const STEPS = [
  { id: 1, title: 'Basic Info',  description: 'Tell us about yourself'   },
  { id: 2, title: 'Preferences', description: 'What are you looking for?' },
  { id: 3, title: 'Skills',      description: 'What can you do?'          },
  { id: 4, title: 'Resume',      description: 'Upload your resume'         },
];

const REMOTE_OPTIONS = [
  { value: 'OPEN',   label: 'Open to all'  },
  { value: 'REMOTE', label: 'Remote only'  },
  { value: 'HYBRID', label: 'Hybrid'       },
  { value: 'ONSITE', label: 'On-site only' },
];

import type { ProfileFormData } from '@/lib/validators';
type FormKey = keyof ProfileFormData;

const FIELDS_PER_STEP: FormKey[][] = [
  ['primaryJobTitle', 'yearsOfExperience'],
  ['remotePreference'],
  ['skills'],
  [],
];

// ── Inner page (uses useSearchParams — must be inside Suspense) ──

function SetupPageInner() {
  const { user, loading } = useAuth();
  const router       = useRouter();
  const searchParams = useSearchParams();

  const step    = Math.max(1, Math.min(STEPS.length, Number(searchParams.get('step') || '1')));
  const goTo    = (n: number) => router.push(`/profile/setup?step=${n}`, { scroll: false });
  const prevStep = () => goTo(step - 1);

  const {
    form,
    resumeUrl, setResumeUrl,
    resumeFileName, setResumeFileName,
    newJobTitle, setNewJobTitle, addJobTitle, removeJobTitle,
    newLocation, setNewLocation, addLocation, removeLocation,
    saving, error,
    submitProfile,
  } = useProfileSetup();

  const { register, formState: { errors }, watch, trigger } = form;
  const preferredJobTitles = watch('preferredJobTitles');
  const preferredLocations = watch('preferredLocations');

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
    else if (!loading && user?.profileComplete) router.replace('/dashboard');
  }, [user, loading, router]);

  const nextStep = async () => {
    const valid = await trigger(FIELDS_PER_STEP[step - 1]);
    if (valid) goTo(step + 1);
  };

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border/10 bg-surface/80 backdrop-blur-sm px-6 py-4">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <span className="text-xl font-bold text-brand-primary-light">TalentSync</span>
          <span className="text-xs text-muted-foreground">Step {step} of {STEPS.length}</span>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-6 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-foreground">Set up your profile</h1>
          <p className="mt-1 text-sm text-muted-foreground">{STEPS[step - 1].description}</p>
        </div>

        {/* Step indicator */}
        <div className="mb-8 flex items-center">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center gap-1">
                <div className={[
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300',
                  s.id < step   ? 'bg-brand-primary text-white shadow-glow-brand-sm' :
                  s.id === step ? 'bg-brand-primary text-white ring-4 ring-brand-primary/20' :
                                  'bg-muted/10 text-muted-foreground border border-border/20',
                ].join(' ')}>
                  {s.id < step ? '✓' : s.id}
                </div>
                <span className={[
                  'hidden sm:block text-[10px] font-medium',
                  s.id === step ? 'text-brand-primary-light' : 'text-muted-foreground/60',
                ].join(' ')}>
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={[
                  'h-px flex-1 mx-2 transition-colors duration-300',
                  s.id < step ? 'bg-brand-primary' : 'bg-border/20',
                ].join(' ')} />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className="rounded-2xl border border-border/10 bg-surface/80 backdrop-blur-sm p-8 shadow-sm">

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-foreground">Basic Information</h2>
                <Input label="Primary Job Title *" placeholder="e.g. Senior Software Engineer"
                  error={errors.primaryJobTitle?.message} {...register('primaryJobTitle')} />
                <Input label="Years of Experience" type="number" min={0} max={50} placeholder="0"
                  error={errors.yearsOfExperience?.message} {...register('yearsOfExperience')} />
                <Input label="Phone" type="tel" placeholder="+1 (555) 000-0000" {...register('phone')} />
                <Input label="Current Location" placeholder="e.g. San Francisco, CA" {...register('location')} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-foreground">Job Preferences</h2>
                <Select label="Remote Preference" options={REMOTE_OPTIONS} {...register('remotePreference')} />
                <Input label="Minimum Expected Salary (USD/year)" type="number" min={0}
                  placeholder="e.g. 120000" {...register('minExpectedSalary')} />
                <Input label="Daily Application Limit" type="number" min={1} max={100}
                  helperText="Max number of auto-applications per day" {...register('dailyApplicationLimit')} />

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Preferred Job Titles</label>
                  <div className="flex gap-2">
                    <input type="text" value={newJobTitle} onChange={(e) => setNewJobTitle(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addJobTitle(); } }}
                      placeholder="e.g. Staff Engineer"
                      className="flex-1 rounded-xl border border-border/20 bg-surface/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-brand-primary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/15" />
                    <Button type="button" size="sm" variant="outline" onClick={addJobTitle}>Add</Button>
                  </div>
                  {preferredJobTitles.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {preferredJobTitles.map((t) => (
                        <Badge key={t} variant="blue" onRemove={() => removeJobTitle(t)}>{t}</Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Preferred Locations</label>
                  <div className="flex gap-2">
                    <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addLocation(); } }}
                      placeholder="e.g. New York, NY or Remote"
                      className="flex-1 rounded-xl border border-border/20 bg-surface/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-brand-primary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary/15" />
                    <Button type="button" size="sm" variant="outline" onClick={addLocation}>Add</Button>
                  </div>
                  {preferredLocations.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {preferredLocations.map((l) => (
                        <Badge key={l} variant="green" onRemove={() => removeLocation(l)}>{l}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Your Skills</h2>
                <p className="text-sm text-muted-foreground">
                  Add your technical and professional skills. These help us match you with the right roles.
                </p>
                <SkillsSection />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Upload Your Resume</h2>
                <p className="text-sm text-muted-foreground">
                  Upload a PDF resume. This will be used to auto-generate tailored applications.
                </p>
                <ResumeUpload
                  currentResumeUrl={resumeUrl}
                  currentFileName={resumeFileName}
                  onUploadSuccess={(url, name) => { setResumeUrl(url); setResumeFileName(name); }}
                />
                <p className="text-xs text-muted-foreground/50">
                  Optional — you can always add it later from your profile page.
                </p>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
              ← Back
            </Button>
            {step < STEPS.length ? (
              <Button type="button" onClick={nextStep}>Continue →</Button>
            ) : (
              <Button type="button" loading={saving} size="lg" onClick={submitProfile}>
                Complete Setup 🎉
              </Button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

// ── Page export (wraps inner in Suspense) ─────────────────

export default function ProfileSetupPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-primary border-t-transparent" />
      </div>
    }>
      <SetupPageInner />
    </Suspense>
  );
}
