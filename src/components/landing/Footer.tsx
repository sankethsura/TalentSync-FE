export function Footer() {
  return (
    <footer className="border-t border-border/[0.06] py-8 px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <span className="text-sm font-semibold text-brand-primary-light">TalentSync</span>
        <p className="text-xs text-muted-foreground/50">
          © {new Date().getFullYear()} TalentSync. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
