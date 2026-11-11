import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { shareSensi } from "@/lib/share";
import { ArrowLeft, Crown } from "lucide-react";
import { AppFrame } from "@/components/app-frame";
import { getBrand, type DeviceModel } from "@/data/devices";
import { generateVip, VIP_RANGES, type VipResult } from "@/lib/vip";

export const Route = createFileRoute("/vip/$brand")({
  loader: ({ params }) => { const b = getBrand(params.brand); if (!b) throw notFound(); return { id: b.id }; },
  head: () => ({ meta: [
    { title: "VIP Tournament Sensi — NOX SENSI" },
    { name: "description", content: "VIP headshot sensitivity, fire button size and drag DPI for your phone." },
    { property: "og:title", content: "VIP Tournament Sensi — NOX SENSI" },
    { property: "og:description", content: "VIP headshot sensitivity, fire button size and drag DPI." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" },
  ] }),
  component: VipBrand,
});

const ROWS: [keyof VipResult, string][] = [
  ["general", "General"], ["redDot", "Red Dot"], ["scope2x", "2x Scope"], ["scope4x", "4x Scope"], ["sniper", "Sniper Scope"],
];

function VipBrand() {
  const { id } = Route.useLoaderData();
  const brand = getBrand(id)!;
  const [model, setModel] = useState<DeviceModel | null>(null);
  const [ram, setRam] = useState("");
  const [res, setRes] = useState<VipResult | null>(null);
  const [saved, setSaved] = useState(false);
  const [msg, setMsg] = useState("");

  const pick = (m: DeviceModel) => { setModel(m); setRam(m.ramOptions[m.ramOptions.length - 1] ?? "8GB"); setRes(null); setSaved(false); };
  const save = () => {
    if (!model || !res) return;
    const list = JSON.parse(localStorage.getItem("nox-vip-saved") || "[]");
    list.unshift({ brand: brand.label, model: model.name, ram, ...res, at: Date.now() });
    localStorage.setItem("nox-vip-saved", JSON.stringify(list)); setSaved(true);
  };

  return (
    <AppFrame active="home">
      <div className="flex items-center gap-3">
        {model ? <button aria-label="Back" onClick={() => setModel(null)}><ArrowLeft /></button>
          : <Link to="/vip" aria-label="Back"><ArrowLeft /></Link>}
        <h1 className="vip-gold-text font-display text-xl font-black">👑 VIP {brand.label}</h1>
      </div>
      {!model ? (
        <div className="mt-4 grid grid-cols-2 gap-3">
          {brand.models.map((m) => (
            <button key={m.id} onClick={() => pick(m)} className="rounded-2xl border border-vip-gold/40 bg-card p-3 text-left">
              <div className="break-words font-display text-sm font-bold">{m.name}</div>
              <div className="text-xs text-muted-foreground">{m.year}</div>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="rounded-2xl border border-vip-gold bg-card p-4">
            <div className="font-display text-lg font-bold">{model.name}</div>
            <div className="text-xs text-muted-foreground">{brand.label} · {model.year}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {model.ramOptions.map((r) => (
                <button key={r} onClick={() => { setRam(r); setRes(null); }}
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${r === ram ? "border-vip-gold bg-vip-gold text-background" : "border-border"}`}>{r} RAM</button>
              ))}
            </div>
            <button onClick={() => { setRes(generateVip()); setSaved(false); }}
              className="vip-bar mt-4 w-full rounded-xl py-3 font-display font-black text-background">
              <Crown className="mr-1 inline h-4 w-4" /> GENERATE VIP SENSI
            </button>
          </div>
          {res && (
            <div className="space-y-3 rounded-2xl border border-vip-gold/50 bg-card p-4">
              <div className="text-xs font-bold tracking-widest text-vip-gold">🎯 TOURNAMENT HEADSHOT SENSI</div>
              {ROWS.map(([k, label]) => (
                <div key={k}>
                  <div className="flex justify-between text-sm"><span>{label}</span><span className="font-black text-vip-gold">{res[k]}</span></div>
                  <div className="mt-1 h-1.5 rounded-full bg-secondary"><div className="vip-bar h-full rounded-full" style={{ width: `${(res[k] / 200) * 100}%` }} /></div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-vip-gold/40 p-3 text-center"><div className="text-[10px] text-muted-foreground">🔘 FIRE BUTTON SIZE</div><div className="font-display text-2xl font-black text-vip-gold">{res.fireButton}%</div></div>
                <div className="rounded-xl border border-vip-gold/40 p-3 text-center"><div className="text-[10px] text-muted-foreground">⚡ DRAG AIM DPI</div><div className="font-display text-2xl font-black text-vip-gold">{res.dpi}</div></div>
              </div>
              <button onClick={save} disabled={saved} className="w-full rounded-xl border border-vip-gold py-2.5 text-sm font-bold text-vip-gold">
                {saved ? "Saved ✓" : "Save VIP Sensi"}
              </button>
              <button onClick={async () => { const r = await shareSensi(`VIP ${model.name} (${ram})`, [...ROWS.map(([k, l]) => `${l}: ${res[k]}`), `Fire Button: ${res.fireButton}%`, `Drag DPI: ${res.dpi}`]); setMsg(r === "copied" ? "Copied! Paste it in WhatsApp" : r === "failed" ? "Could not share" : ""); }}
                className="vip-bar w-full rounded-xl py-2.5 text-sm font-black text-background">Share with Squad</button>
              {msg && <p className="text-center text-xs text-vip-gold">{msg}</p>}
              <p className="text-[10px] text-muted-foreground">Ranges: General {VIP_RANGES.general.join("–")}, Fire button {VIP_RANGES.fireButton.join("–")}%</p>
            </div>
          )}
        </div>
      )}
    </AppFrame>
  );
}
