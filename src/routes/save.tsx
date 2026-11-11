import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Smartphone, Trash2, Zap } from "lucide-react";

import { AppFrame } from "@/components/app-frame";
import { NoxLogo } from "@/components/nox-logo";
import { getModel } from "@/data/devices";
import { SENSITIVITY_ORDER, SENSITIVITY_RANGES } from "@/lib/sensitivity";
import {
  loadSavedSettings,
  removeSavedSetting,
  type SavedSetting,
} from "@/lib/save";

interface VipSaved { brand: string; model: string; ram: string; general: number; redDot: number; scope2x: number; scope4x: number; sniper: number; fireButton: number; dpi: number; at: number }
const VIP_ROWS: [keyof VipSaved, string][] = [["general", "General"], ["redDot", "Red Dot"], ["scope2x", "2x"], ["scope4x", "4x"], ["sniper", "Sniper"]];

export const Route = createFileRoute("/save")({
  head: () => ({
    meta: [
      { title: "Saved Settings — NOX SENSI" },
      {
        name: "description",
        content: "Your saved sensitivity settings, ready for your next match.",
      },
      { property: "og:title", content: "Saved Settings — NOX SENSI" },
      {
        property: "og:description",
        content: "Your saved sensitivity settings, ready for your next match.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SavePage,
});

function SavePage() {
  const [saved, setSaved] = useState<SavedSetting[] | null>(null);
  const [vip, setVip] = useState<VipSaved[]>([]);
  const [tab, setTab] = useState<"all" | "normal" | "vip">("all");

  // Read localStorage after mount (SSR-safe).
  useEffect(() => {
    setSaved(loadSavedSettings());
    try { setVip(JSON.parse(localStorage.getItem("nox-vip-saved") || "[]")); } catch { setVip([]); }
  }, []);
  const delVip = (i: number) => { const n = vip.filter((_, j) => j !== i); setVip(n); localStorage.setItem("nox-vip-saved", JSON.stringify(n)); };

  const del = (id: string) => setSaved(removeSavedSetting(id));

  return (
    <AppFrame active="save">
      <header className="flex items-center gap-3">
        <NoxLogo compact />
      </header>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {(["all", "normal", "vip"] as const).map((t) => (
          <button key={t} type="button" onClick={() => setTab(t)}
            className={`rounded-lg border py-2 font-display text-xs font-extrabold uppercase ${tab === t ? (t === "vip" ? "border-vip-gold bg-vip-gold text-background" : "border-primary bg-primary text-primary-foreground") : "border-border bg-card text-muted-foreground"}`}>
            {t === "vip" ? "👑 VIP" : t}
          </button>
        ))}
      </div>

      {tab !== "normal" && vip.length > 0 && (
        <section className="mt-4 space-y-3">
          {vip.map((v, i) => (
            <article key={`${v.at}-${i}`} className="rounded-2xl border border-vip-gold bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p className="vip-gold-text break-words text-sm font-black">👑 {v.model}</p>
                  <p className="text-xs text-muted-foreground">{v.brand} · {v.ram} RAM</p>
                </div>
                <button type="button" onClick={() => delVip(i)} aria-label={`Remove VIP ${v.model}`} className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground"><Trash2 className="h-4 w-4" /></button>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {VIP_ROWS.map(([k, l]) => (
                  <div key={k} className="rounded-lg border border-vip-gold/40 p-2 text-center">
                    <p className="text-[9px] uppercase text-muted-foreground">{l}</p>
                    <p className="font-extrabold text-vip-gold">{v[k]}</p>
                    <div className="mt-1 h-1 rounded-full bg-muted"><div className="vip-bar h-full rounded-full" style={{ width: `${Math.min(100, (Number(v[k]) / 200) * 100)}%` }} /></div>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Fire Button <b className="text-vip-gold">{v.fireButton}%</b> · Drag DPI <b className="text-vip-gold">{v.dpi}</b></p>
            </article>
          ))}
        </section>
      )}

      {tab === "vip" ? (vip.length === 0 && <p className="mt-10 text-center text-sm text-muted-foreground">No VIP sensi saved yet.</p>) : saved === null || saved.length === 0 ? (tab === "all" && vip.length > 0 ? null : (
        <section className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <span className="grid h-14 w-14 place-items-center rounded-2xl border border-border bg-secondary">
            <Bookmark className="h-6 w-6 text-primary" />
          </span>
          <h1 className="font-display text-lg font-extrabold uppercase tracking-wide">
            No Saved Settings Yet
          </h1>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Generate your perfect sensitivity and it will show up here.
          </p>
          <Link
            to="/brand/$brand"
            params={{ brand: "samsung" }}
            className="mt-2 flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-display text-sm font-extrabold tracking-wide text-primary-foreground shadow-glow transition-transform active:scale-[0.98]"
          >
            <Zap className="h-4 w-4" /> GENERATE NOW
          </Link>
        </section>
      )) : (
        <section className="mt-4 space-y-3">
          <h1 className="font-display text-lg font-extrabold uppercase tracking-wide">
            Saved Settings
          </h1>
          {saved.map((item) => {
            const model = getModel(item.brandId, item.modelId);
            const image: string | null = model ? null : null;
            return (
              <article
                key={item.id}
                className="rounded-2xl border border-border bg-card p-4 shadow-card"
              >
                <div className="flex items-center gap-3">
                  {image ? (
                    <img
                      src={image}
                      alt={item.modelName}
                      loading="lazy"
                      width={48}
                      height={48}
                      className="h-12 w-10 shrink-0 object-contain"
                    />
                  ) : (
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-secondary">
                      <Smartphone className="h-5 w-5 text-accent" />
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-bold leading-tight">
                      {item.modelName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.brandLabel} · {item.ram} RAM
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => del(item.id)}
                    aria-label={`Remove ${item.modelName} settings`}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-5 gap-2">
                  {SENSITIVITY_ORDER.map((key) => {
                    const { label, min, max } = SENSITIVITY_RANGES[key];
                    const value = item.values[key];
                    const pct = Math.min(100, (value / 200) * 100);
                    return (
                      <div
                        key={key}
                        className="rounded-lg border border-border bg-secondary/60 p-2 text-center"
                      >
                        <p className="truncate text-[9px] font-semibold uppercase tracking-wide text-muted-foreground">
                          {label}
                        </p>
                        <p className="text-base font-extrabold leading-tight tabular-nums text-primary">
                          {value}
                        </p>
                        <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </section>
      )}
    </AppFrame>
  );
}
