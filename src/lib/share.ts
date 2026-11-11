import { getLinks } from "@/lib/admin";

/** Share text via the phone share sheet, falling back to clipboard. Returns "shared" | "copied" | "failed". */
export async function shareSensi(title: string, lines: string[]): Promise<"shared" | "copied" | "failed"> {
  const l = getLinks();
  const text = `🔥 ${title} — NOX SENSI\n${lines.join("\n")}\n\n▶ YouTube: ${l.youtube}\n📢 WhatsApp: ${l.whatsapp}`;
  try {
    if (navigator.share) { await navigator.share({ title: "NOX SENSI", text }); return "shared"; }
  } catch { /* cancelled or unsupported: fall back to copy */ }
  try { await navigator.clipboard.writeText(text); return "copied"; } catch { return "failed"; }
}

export const VIP_UNLOCK_KEY = "nox-vip";
export const VIP_SAVED_KEY = "nox-vip-saved";
