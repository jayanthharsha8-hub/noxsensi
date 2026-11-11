import { useCallback, useEffect, useState } from "react";
import { VipLoader } from "@/components/vip-loader";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DEFAULT_LINKS, getLinks, redeemPasscode } from "@/lib/admin";

const MSG = {
  bad: "Wrong passcode, try again.",
  expired: "This passcode has expired.",
  full: "This passcode has reached its user limit.",
} as const;

export function VipDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | keyof typeof MSG>("idle");
  const [links, setLinksState] = useState(DEFAULT_LINKS);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!open) return;
    // Already unlocked on this phone: skip the passcode and go straight to VIP.
    if (localStorage.getItem("nox-vip") === "1") { onOpenChange(false); navigate({ to: "/vip" }); return; }
    setLinksState(getLinks());
  }, [open, onOpenChange, navigate]);
  const finish = useCallback(() => { setLoading(false); navigate({ to: "/vip" }); }, [navigate]);

  const items = [
    { label: "Subscribe on YouTube", href: links.youtube },
    { label: "Follow on Instagram", href: links.instagram },
    { label: "Join WhatsApp Channel (get passcode)", href: links.whatsapp },
  ];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = redeemPasscode(code);
    if (r === "ok") { localStorage.setItem("nox-vip", "1"); onOpenChange(false); setLoading(true); }
    setStatus(r);
  };

  return (
    <>
    {loading && <VipLoader onDone={finish} />}
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-primary/40 bg-card">
        <DialogHeader>
          <DialogTitle className="font-display text-primary">👑 Unlock VIP Sensi</DialogTitle>
          <DialogDescription>Follow all 3, get the passcode from WhatsApp, then enter it below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          {items.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
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
        {status !== "ok" && status !== "idle" && <p className="text-sm text-destructive">{MSG[status]}</p>}
      </DialogContent>
    </Dialog>
    </>
  );
}
