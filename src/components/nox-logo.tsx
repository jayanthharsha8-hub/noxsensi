export function NoxBoltMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 42" className={className} aria-hidden="true">
      {/* stylized N */}
      <path
        d="M3 39 V3 h8 l16 22 V3 h9 v36 h-8 L12 17 v22 Z"
        fill="currentColor"
        className="text-foreground"
      />
      {/* lightning bolt */}
      <path d="M27 0 L15 20 h8 l-5 20 L38 14 h-9 l7 -14 Z" fill="var(--color-primary)" />
    </svg>
  );
}

export function NoxLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2">
        <NoxBoltMark className={compact ? "h-6 w-7 shrink-0" : "h-8 w-9 shrink-0"} />
        <span
          className={`font-display font-extrabold italic leading-none tracking-tight ${
            compact ? "text-2xl" : "text-[1.7rem]"
          }`}
        >
          NOX <span className="text-primary">SENSI</span>
        </span>
      </div>
      <p
        className={`mt-1 font-display font-semibold uppercase text-muted-foreground ${
          compact ? "text-[8px] tracking-[0.34em]" : "text-[9px] tracking-[0.42em]"
        }`}
      >
        Play Better · Aim Higher
      </p>
    </div>
  );
}
