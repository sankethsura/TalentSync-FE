const STEPS = [
  {
    number: '01',
    title:  'Build your profile',
    body:   'Tell us your skills, experience, and preferences. Upload your resume and we\'ll extract the rest automatically.',
    icon:   '👤',
  },
  {
    number: '02',
    title:  'AI finds your matches',
    body:   'Our engine scans thousands of job boards daily and ranks roles by compatibility with your unique profile.',
    icon:   '🔍',
  },
  {
    number: '03',
    title:  'Auto-apply at scale',
    body:   'TalentSync applies on your behalf with tailored cover letters, up to your daily limit. You stay in control.',
    icon:   '🚀',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">How it works</h2>
          <p className="mt-3 text-muted-foreground">Three steps to your next role</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={i} className="relative rounded-2xl border border-border/10 bg-surface/60 backdrop-blur-sm p-8">
              <div className="mb-4 text-4xl">{step.icon}</div>
              <span className="text-xs font-bold text-brand-primary-light tracking-widest">{step.number}</span>
              <h3 className="mt-1 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
