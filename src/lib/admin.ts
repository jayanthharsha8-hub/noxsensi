import type { SensitivityResult } from "@/lib/sensitivity";

/** Admin settings stored on this device (localStorage). Browser-only: call from effects/handlers. */
export interface AdminUser { username: string; password: string }
export interface Passcode { code: string; expires: string; limit: number; used: number }
export interface SocialLinks { youtube: string; instagram: string; whatsapp: string }

const K = { admins: "nox-admins", links: "nox-links", codes: "nox-passcodes", sens: "nox-sens-overrides" };

export const DEFAULT_ADMIN: AdminUser = { username: "@Monarch", password: "HARSH777FF" };
export const DEFAULT_LINKS: SocialLinks = {
  youtube: "https://youtube.com/@nox7t",
  instagram: "https://www.instagram.com/7tnox",
  whatsapp: "https://whatsapp.com/channel/0029Vb94mKa3LdQTLI6AOL2z",
};
const DEFAULT_CODES: Passcode[] = [{ code: "NOX7T", expires: "", limit: 0, used: 0 }];

function read<T>(key: string, fallback: T): T {
  try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
}
function write(key: string, v: unknown) { localStorage.setItem(key, JSON.stringify(v)); }

export const getAdmins = () => read<AdminUser[]>(K.admins, [DEFAULT_ADMIN]);
export const setAdmins = (a: AdminUser[]) => write(K.admins, a);
export const checkLogin = (u: string, p: string) => getAdmins().some((a) => a.username === u.trim() && a.password === p);

export const getLinks = () => read<SocialLinks>(K.links, DEFAULT_LINKS);
export const setLinks = (l: SocialLinks) => write(K.links, l);

export const getPasscodes = () => read<Passcode[]>(K.codes, DEFAULT_CODES);
export const setPasscodes = (c: Passcode[]) => write(K.codes, c);

/** Pure check: is this passcode usable today? `today` is YYYY-MM-DD. */
export function passcodeStatus(p: Passcode, today: string): "ok" | "expired" | "full" {
  if (p.expires && today > p.expires) return "expired";
  if (p.limit > 0 && p.used >= p.limit) return "full";
  return "ok";
}

export function redeemPasscode(input: string): "ok" | "bad" | "expired" | "full" {
  const codes = getPasscodes();
  const p = codes.find((c) => c.code.toUpperCase() === input.trim().toUpperCase());
  if (!p) return "bad";
  const s = passcodeStatus(p, new Date().toISOString().slice(0, 10));
  if (s !== "ok") return s;
  p.used += 1;
  setPasscodes(codes);
  return "ok";
}

type Overrides = Record<string, SensitivityResult>;
const okey = (brandId: string, modelId: string) => `${brandId}/${modelId}`;
export const getOverrides = () => read<Overrides>(K.sens, {});
export const getOverride = (b: string, m: string) => getOverrides()[okey(b, m)];
export function setOverride(b: string, m: string, v: SensitivityResult | null) {
  const o = getOverrides();
  if (v) o[okey(b, m)] = v; else delete o[okey(b, m)];
  write(K.sens, o);
}

export type Notice = { id: string; text: string; link?: string; date: string };
export const DEFAULT_NOTICES: Notice[] = [
  { id: "n1", text: "🔥 New 2025–2026 phones added for all 12 brands.", date: "2026-11-01" },
  { id: "n2", text: "👑 VIP Tournament Sensi is live — tap to unlock.", link: "vip", date: "2026-11-01" },
  { id: "n3", text: "📢 New VIP passcodes drop in our WhatsApp channel — join now.", link: "whatsapp", date: "2026-11-01" },
];
export const getNotices = () => read<Notice[]>("nox-notices", DEFAULT_NOTICES);
export const setNotices = (n: Notice[]) => write("nox-notices", n);
