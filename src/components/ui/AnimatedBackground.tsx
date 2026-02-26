'use client';

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Radial glow — top left */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-brand-primary/10 blur-[120px]" />
      {/* Radial glow — bottom right */}
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-secondary/10 blur-[100px]" />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgb(var(--color-border)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-border)) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}
