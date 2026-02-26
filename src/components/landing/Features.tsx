const FEATURES = [
  { icon: '🤖', title: 'AI Cover Letters',   body: 'Every application gets a unique, role-specific cover letter generated from your profile and the job description.' },
  { icon: '📊', title: 'Smart Matching',      body: 'Vector-based skill matching ranks opportunities by true fit, not just keyword overlap.' },
  { icon: '⚡', title: 'Daily Auto-Apply',    body: 'Set your daily application limit and let TalentSync run in the background while you focus on prep.' },
  { icon: '📄', title: 'Resume Parsing',      body: 'Upload once. We extract skills, experience, and context to enrich every application automatically.' },
  { icon: '🔔', title: 'Real-time Tracking',  body: 'Monitor application status, interview invites, and offer letters in one unified dashboard.' },
  { icon: '🛡️', title: 'You stay in control', body: 'Review applications before they go out, set filters, and pause at any time — no surprises.' },
];

export function Features() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Everything you need</h2>
          <p className="mt-3 text-muted-foreground">Built for serious job seekers</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div key={i} className="rounded-2xl border border-border/10 bg-surface/40 p-6 hover:bg-surface/60 transition-colors">
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
