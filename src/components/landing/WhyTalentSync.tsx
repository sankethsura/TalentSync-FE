const STATS = [
  { value: '10×', label: 'More applications per day vs. manual search' },
  { value: '3×',  label: 'Higher response rate with tailored cover letters' },
  { value: '72h', label: 'Average time to first interview invite' },
];

export function WhyTalentSync() {
  return (
    <section className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-brand-primary/20 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 p-10 text-center backdrop-blur-sm">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Why TalentSync?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            The average job seeker sends 2–3 applications a day. TalentSync candidates send 20+,
            each tailored to the role. The numbers speak for themselves.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-brand-primary-light">{s.value}</div>
                <div className="mt-1.5 text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
