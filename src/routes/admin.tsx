import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Trash2 } from "lucide-react";

import { AppFrame } from "@/components/app-frame";
import { NoxLogo } from "@/components/nox-logo";
import { brands } from "@/data/devices";
import {
  checkLogin, getAdmins, getLinks, getOverride, getPasscodes, setAdmins, setLinks, setOverride, setPasscodes,
  DEFAULT_LINKS, type AdminUser, type Passcode,
} from "@/lib/admin";
import { SENSITIVITY_ORDER, SENSITIVITY_RANGES, type SensitivityResult } from "@/lib/sensitivity";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — NOX SENSI" },
      { name: "description", content: "NOX SENSI admin panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin — NOX SENSI" },
      { property: "og:description", content: "NOX SENSI admin panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

const input = "w-full min-w-0 rounded-lg border border-border bg-background px-3 py-2 text-sm";
const btn = "rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground";
const card = "mt-4 rounded-2xl border border-border bg-card p-4 shadow-card";
const h2 = "font-display text-sm font-extrabold uppercase tracking-wide text-primary";

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  useEffect(() => { setAuthed(sessionStorage.getItem("nox-admin") === "1"); }, []);
  return (
    <AppFrame active="help">
      <header className="flex items-center gap-3"><NoxLogo compact /></header>
      {authed ? <Panel onLogout={() => { sessionStorage.removeItem("nox-admin"); setAuthed(false); }} />
        : <Login onOk={() => { sessionStorage.setItem("nox-admin", "1"); setAuthed(true); }} />}
    </AppFrame>
  );
}

function Login({ onOk }: { onOk: () => void }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState(false);
  return (
    <form className={card + " space-y-3"} onSubmit={(e) => { e.preventDefault(); if (checkLogin(u, p)) onOk(); else setErr(true); }}>
      <div className="flex items-center gap-2"><Lock className="h-5 w-5 text-primary" /><h1 className={h2}>Admin Login</h1></div>
      <input className={input} placeholder="Username" value={u} onChange={(e) => setU(e.target.value)} />
      <input className={input} type="password" placeholder="Password" value={p} onChange={(e) => setP(e.target.value)} />
      <button className={btn + " w-full"}>Login</button>
      {err && <p className="text-sm text-destructive">Wrong username or password.</p>}
    </form>
  );
}

function Panel({ onLogout }: { onLogout: () => void }) {
  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-display text-lg font-extrabold uppercase">Admin Panel</h1>
        <button onClick={onLogout} className="text-xs font-bold text-muted-foreground">Logout</button>
      </div>
      <SensitivityEditor /><LinksEditor /><PasscodesEditor /><AdminsEditor />
    </>
  );
}

function SensitivityEditor() {
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");
  const [vals, setVals] = useState<Partial<SensitivityResult>>({});
  const [msg, setMsg] = useState("");
  const brand = brands.find((b) => b.id === brandId);

  const pickModel = (id: string) => { setModelId(id); setMsg(""); setVals(getOverride(brandId, id) ?? {}); };
  const save = () => {
    const full = SENSITIVITY_ORDER.every((k) => typeof vals[k] === "number");
    if (!full) return setMsg("Fill all 5 values.");
    setOverride(brandId, modelId, vals as SensitivityResult); setMsg("Saved ✓");
  };

  return (
    <section className={card}>
      <h2 className={h2}>Mobile Sensitivity</h2>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {brands.map((b) => (
          <button key={b.id} onClick={() => { setBrandId(b.id); setModelId(""); }}
            className={`rounded-lg border px-1 py-2 text-[11px] font-bold ${b.id === brandId ? "border-primary text-primary" : "border-border"}`}>
            {b.label}
          </button>
        ))}
      </div>
      {brand && (
        <select className={input + " mt-3"} value={modelId} onChange={(e) => pickModel(e.target.value)}>
          <option value="">Select model</option>
          {brand.models.map((m) => <option key={m.id} value={m.id}>{m.name} ({m.year})</option>)}
        </select>
      )}
      {modelId && (
        <div className="mt-3 space-y-2">
          {SENSITIVITY_ORDER.map((k) => {
            const r = SENSITIVITY_RANGES[k];
            return (
              <label key={k} className="flex items-center gap-2 text-sm">
                <span className="w-28 shrink-0">{r.label}</span>
                <input type="number" min={0} max={200} className={input} placeholder={`${r.min}–${r.max}`}
                  value={vals[k] ?? ""} onChange={(e) => setVals({ ...vals, [k]: e.target.value === "" ? undefined : Number(e.target.value) })} />
              </label>
            );
          })}
          <div className="flex gap-2">
            <button onClick={save} className={btn}>Save</button>
            <button onClick={() => { setOverride(brandId, modelId, null); setVals({}); setMsg("Reset to random"); }}
              className="rounded-lg border border-border px-4 py-2 text-sm">Reset</button>
          </div>
          {msg && <p className="text-xs text-primary">{msg}</p>}
        </div>
      )}
    </section>
  );
}

function LinksEditor() {
  const [l, setL] = useState(DEFAULT_LINKS); const [msg, setMsg] = useState("");
  useEffect(() => setL(getLinks()), []);
  return (
    <section className={card + " space-y-2"}>
      <h2 className={h2}>Social Media Links</h2>
      {(["youtube", "instagram", "whatsapp"] as const).map((k) => (
        <label key={k} className="block text-xs capitalize text-muted-foreground">{k}
          <input className={input + " mt-1"} value={l[k]} onChange={(e) => setL({ ...l, [k]: e.target.value })} />
        </label>
      ))}
      <button className={btn} onClick={() => { setLinks(l); setMsg("Saved ✓"); }}>Save Links</button>
      {msg && <p className="text-xs text-primary">{msg}</p>}
    </section>
  );
}

function PasscodesEditor() {
  const [codes, setCodes] = useState<Passcode[]>([]);
  const [code, setCode] = useState(""); const [expires, setExpires] = useState(""); const [limit, setLimit] = useState("");
  useEffect(() => setCodes(getPasscodes()), []);
  const update = (c: Passcode[]) => { setCodes(c); setPasscodes(c); };
  return (
    <section className={card + " space-y-2"}>
      <h2 className={h2}>VIP Passcodes</h2>
      {codes.map((c, i) => (
        <div key={c.code + i} className="flex items-center justify-between rounded-lg border border-border bg-secondary/60 p-2 text-xs">
          <div>
            <p className="font-bold text-sm">{c.code}</p>
            <p className="text-muted-foreground">
              Used {c.used}{c.limit ? ` / ${c.limit}` : " (no limit)"} · {c.expires ? `Expires ${c.expires}` : "No expiry"}
            </p>
          </div>
          <button aria-label="Delete passcode" onClick={() => update(codes.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4 text-destructive" /></button>
        </div>
      ))}
      <input className={input} placeholder="New passcode" value={code} onChange={(e) => setCode(e.target.value)} />
      <div className="flex gap-2">
        <input className={input} type="date" value={expires} onChange={(e) => setExpires(e.target.value)} />
        <input className={input} type="number" min={0} placeholder="User limit" value={limit} onChange={(e) => setLimit(e.target.value)} />
      </div>
      <button className={btn} onClick={() => {
        if (!code.trim()) return;
        update([...codes, { code: code.trim().toUpperCase(), expires, limit: Number(limit) || 0, used: 0 }]);
        setCode(""); setExpires(""); setLimit("");
      }}>Add Passcode</button>
    </section>
  );
}

function AdminsEditor() {
  const [admins, setA] = useState<AdminUser[]>([]);
  const [u, setU] = useState(""); const [p, setP] = useState("");
  useEffect(() => setA(getAdmins()), []);
  const update = (a: AdminUser[]) => { setA(a); setAdmins(a); };
  return (
    <section className={card + " space-y-2"}>
      <h2 className={h2}>Admins</h2>
      {admins.map((a, i) => (
        <div key={a.username} className="flex items-center justify-between rounded-lg border border-border bg-secondary/60 p-2 text-sm">
          <span className="font-bold">{a.username}</span>
          {admins.length > 1 && <button aria-label="Remove admin" onClick={() => update(admins.filter((_, j) => j !== i))}><Trash2 className="h-4 w-4 text-destructive" /></button>}
        </div>
      ))}
      <input className={input} placeholder="New username" value={u} onChange={(e) => setU(e.target.value)} />
      <input className={input} type="password" placeholder="New password" value={p} onChange={(e) => setP(e.target.value)} />
      <button className={btn} onClick={() => {
        if (!u.trim() || !p || admins.some((a) => a.username === u.trim())) return;
        update([...admins, { username: u.trim(), password: p }]); setU(""); setP("");
      }}>Create Admin</button>
    </section>
  );
}
