import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { AppFrame } from "@/components/app-frame";
import { BrandIcon } from "@/components/brand-icon";
import { brands } from "@/data/devices";

export const Route = createFileRoute("/vip/")({
  head: () => ({ meta: [
    { title: "VIP Sensi Hub — NOX SENSI" },
    { name: "description", content: "Choose your brand to unlock VIP tournament sensitivity." },
    { property: "og:title", content: "VIP Sensi Hub — NOX SENSI" },
    { property: "og:description", content: "Choose your brand to unlock VIP tournament sensitivity." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: VipHub,
});

function VipHub() {
  const [i, setI] = useState(0);
  const n = brands.length;
  const go = (d: number) => setI((v) => (v + d + n) % n);
  const touch = useRef<number | null>(null);
  useEffect(() => { const t = setInterval(() => go(1), 3500); return () => clearInterval(t); }, [i]);
  const at = (o: number) => brands[(i + o + n) % n]!;

  return (
    <AppFrame active="home">
      <div className="text-center">
        <Crown className="mx-auto h-8 w-8 text-vip-gold" />
        <h1 className="vip-gold-text font-display text-2xl font-black tracking-wide">VIP SENSI HUB</h1>
        <p className="text-xs text-muted-foreground">Swipe & choose your brand</p>
      </div>
      <div className="relative mt-10 flex h-72 items-center justify-center"
        onTouchStart={(e) => (touch.current = e.touches[0]!.clientX)}
        onTouchEnd={(e) => { if (touch.current == null) return; const dx = e.changedTouches[0]!.clientX - touch.current; if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1); touch.current = null; }}>
        {[-1, 0, 1].map((o) => {
          const b = at(o);
          const center = o === 0;
          return (
            <div key={`${b.id}-${o}`} className="absolute transition-all duration-500"
              style={{ transform: `translateX(${o * 62}%) scale(${center ? 1 : 0.7})`, opacity: center ? 1 : 0.4, zIndex: center ? 2 : 1 }}>
              {center ? (
                <Link to="/vip/$brand" params={{ brand: b.id }}
                  className="vip-halo flex h-64 w-48 flex-col items-center justify-center gap-4 rounded-3xl border-2 border-vip-gold bg-card p-6">
                  <div className="h-20 w-28"><BrandIcon brand={b} /></div>
                  <div className="font-display text-lg font-bold">{b.label}</div>
                  <span className="rounded-full bg-vip-gold px-3 py-1 text-[10px] font-black text-background">TAP TO OPEN</span>
                </Link>
              ) : (
                <button onClick={() => go(o)} className="flex h-64 w-48 flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-card p-6">
                  <div className="h-20 w-28"><BrandIcon brand={b} /></div>
                  <div className="font-display text-lg font-bold">{b.label}</div>
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 flex items-center justify-center gap-6">
        <button aria-label="Previous brand" onClick={() => go(-1)} className="rounded-full border border-vip-gold p-2 text-vip-gold"><ChevronLeft /></button>
        <span className="text-xs text-muted-foreground">{i + 1} / {n}</span>
        <button aria-label="Next brand" onClick={() => go(1)} className="rounded-full border border-vip-gold p-2 text-vip-gold"><ChevronRight /></button>
      </div>
    </AppFrame>
  );
}
