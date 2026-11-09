import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const LINKS = [
  { label: "Subscribe on YouTube", href: "https://youtube.com/@nox7t" },
  { label: "Follow on Instagram", href: "https://www.instagram.com/7tnox" },
  { label: "Join WhatsApp Channel (get passcode)", href: "https://whatsapp.com/channel/0029Vb94mKa3LdQTLI6AOL2z" },
];

// Placeholder passcode until the creator shares the real one.
const VIP_PASSCODE = "NOX7T";

export function VipDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "bad">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().toUpperCase() === VIP_PASSCODE) {
      localStorage.setItem("nox-vip", "1");
      setStatus("ok");
    } else setStatus("bad");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-primary/40 bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-primary">👑 Unlock VIP Sensi</DialogTitle>
          <DialogDescription>Follow all 3, get the passcode from WhatsApp, then enter it below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer"
              className="rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-semibold hover:border-primary/50">
              {l.label}
            </a>
          ))}
        </div>
        <form onSubmit={submit} className="mt-2 flex gap-2">
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter passcode"
            className="min-w-0 flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm" />
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">Unlock</button>
        </form>
        {status === "ok" && <p className="text-sm font-semibold text-primary">VIP unlocked! 🔓</p>}
        {status === "bad" && <p className="text-sm text-destructive">Wrong passcode, try again.</p>}
      </DialogContent>
    </Dialog>
  );
}
