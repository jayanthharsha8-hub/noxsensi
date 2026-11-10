import { useEffect, useState } from "react";

const STEPS = [
  [0, "Verifying VIP Passcode..."],
  [30, "Decrypting Pro Tournament Database..."],
  [65, "Calibrating One-Tap Headshot Limits..."],
  [100, "VIP ACCESS GRANTED 👑"],
] as const;

const SPARKS = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 37) % 100,
  top: (i * 53) % 100,
  delay: (i % 7) * 0.4,
  size: 2 + (i % 3),
}));

export function VipLoader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(100, ((t - start) / 5000) * 100);
      setPct(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else setTimeout(onDone, 400);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const v = Math.floor(pct);
  const label = [...STEPS].reverse().find(([s]) => v >= s)?.[1] ?? "";
  const r = 70, c = 2 * Math.PI * r;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background">
      <div className="vip-fog pointer-events-none absolute inset-0" />
      {SPARKS.map((s, i) => (
        <span key={i} className="vip-spark absolute rounded-full"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s` }} />
      ))}
      <div className="relative flex h-56 w-56 items-center justify-center">
        <div className="vip-halo absolute inset-0 rounded-full" />
        <svg viewBox="0 0 160 160" className="absolute inset-0 -rotate-90">
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--vip-gold-light)" />
              <stop offset="100%" stopColor="var(--vip-gold)" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r={r} fill="none" stroke="var(--border)" strokeWidth="6" />
          <circle cx="80" cy="80" r={r} fill="none" stroke="url(#gold)" strokeWidth="6" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} className="vip-ring" />
        </svg>
        <div className="text-center">
          <div className="vip-gold-text font-display text-5xl font-black">{v}%</div>
          <div className="mt-1 text-[10px] font-bold tracking-[0.3em] text-muted-foreground">VIP SENSI</div>
        </div>
      </div>
      <p className="relative mt-8 h-5 px-6 text-center text-sm font-semibold text-foreground">{label}</p>
      <div className="relative mt-4 h-2 w-64 overflow-hidden rounded-full bg-secondary">
        <div className="vip-bar h-full rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
