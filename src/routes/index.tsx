import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";

import { useEffect, useState } from "react";
import { VipDialog } from "@/components/vip-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getLinks, getNotices, getHero, DEFAULT_HERO, DEFAULT_NOTICES, type Notice, type HeroSettings } from "@/lib/admin";
import { AppFrame } from "@/components/app-frame";
import { BrandIcon } from "@/components/brand-icon";
import { NoxLogo } from "@/components/nox-logo";
import { brands } from "@/data/devices";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "NOX SENSI — Find Your Perfect Sensitivity",
      },
      {
        name: "description",
        content:
          "Generate the perfect Free Fire sensitivity settings for your device. Better settings, more headshots, win more.",
      },
      {
        property: "og:title",
        content: "NOX SENSI — Find Your Perfect Sensitivity",
      },
      {
        property: "og:description",
        content:
          "Generate the perfect Free Fire sensitivity settings for your device. Better settings, more headshots, win more.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [vipOpen, setVipOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [notices, setNoticeList] = useState<Notice[]>(DEFAULT_NOTICES);
  useEffect(() => setNoticeList(getNotices()), [bellOpen]);
  const [hero, setHeroState] = useState<HeroSettings>(DEFAULT_HERO);
  useEffect(() => setHeroState(getHero()), []);
  const heroTap = () => {
    if (hero.action === "vip") return setVipOpen(true);
    const url = hero.action === "whatsapp" ? getLinksSafe().whatsapp : hero.link;
    if (url) window.open(url, "_blank", "noopener");
  };
  const ticker = hero.ticker || DEFAULT_HERO.ticker;
  return (
    <AppFrame active="home">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <NoxLogo />
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => setBellOpen(true)}
          className="relative mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-card/60"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
            {notices.length}
          </span>
        </button>
      </header>

      {/* VIP hero banner */}
      <section className="relative mt-4 aspect-[1672/941] w-full overflow-hidden rounded-2xl border border-border shadow-card">
        <img
          src={hero.image || "/img/vip-hero.png"}
          onError={(e) => { e.currentTarget.src = "/img/vip-hero.png"; }}
          alt="Unlock VIP Sensi — NOX 7T"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <h1 className="sr-only">NOX SENSI — Unlock VIP Sensi</h1>
        <button
          type="button"
          onClick={heroTap}
          aria-label="Unlock VIP Sensi"
          className="absolute bottom-[3%] left-[2%] w-[40%] animate-pulse transition-transform hover:scale-105 active:scale-95"
        >
          <img src="/img/unlock-button.png" alt="" className="w-full drop-shadow-lg" />
        </button>
      </section>
      <VipDialog open={vipOpen} onOpenChange={setVipOpen} />
      <Dialog open={bellOpen} onOpenChange={setBellOpen}>
        <DialogContent className="border-primary/40 bg-card">
          <DialogHeader>
            <DialogTitle className="font-display text-primary">🔔 Updates</DialogTitle>
            <DialogDescription>Latest news from NOX 7T</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 text-sm">
            {notices.length === 0 && <p className="text-muted-foreground">No updates yet.</p>}
            {notices.map((n) => n.link === "vip" ? (
              <button key={n.id} type="button" onClick={() => { setBellOpen(false); setVipOpen(true); }} className="rounded-lg border border-border bg-secondary p-3 text-left">{n.text}</button>
            ) : n.link ? (
              <a key={n.id} href={n.link === "whatsapp" ? getLinksSafe().whatsapp : n.link} target="_blank" rel="noreferrer" className="rounded-lg border border-primary/50 bg-secondary p-3">{n.text}</a>
            ) : (
              <div key={n.id} className="rounded-lg border border-border bg-secondary p-3">{n.text}</div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Brand grid */}
      <section className="mt-5">
        <div className="flex items-center gap-2">
          <span className="h-5 w-1 rounded-full bg-primary" />
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.22em] text-foreground/90">
            Choose Your Device Brand
          </h2>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              to="/brand/$brand"
              params={{ brand: brand.id }}
              className="group flex min-w-0 flex-col items-center gap-2.5 rounded-xl border border-border bg-card p-2.5 pt-4 shadow-card transition-colors hover:border-primary/40 active:scale-[0.98]"
            >
              <div className="h-9 w-full px-1">
                <BrandIcon brand={brand} />
              </div>
              <span className="w-full truncate text-center text-[11px] font-semibold text-foreground/90">
                {brand.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* VIP breaking news ticker */}
      <button
        type="button"
        onClick={heroTap}
        aria-label="Unlock VIP Sensi"
        className="mt-5 flex w-full items-stretch overflow-hidden rounded-xl border border-primary/40 bg-background text-left"
      >
        <span className="z-10 flex shrink-0 items-center bg-primary px-3 font-display text-[11px] font-extrabold uppercase tracking-wider text-primary-foreground">
          Breaking
        </span>
        <span className="relative flex-1 overflow-hidden py-2.5">
          <span className="nox-ticker-track flex w-max whitespace-nowrap font-display text-xs font-bold uppercase tracking-wide text-foreground">
            <span className="pr-4">{ticker}</span>
            <span className="pr-4" aria-hidden="true">{ticker}</span>
          </span>
        </span>
      </button>
    </AppFrame>
  );
}

function getLinksSafe() {
  return typeof window === "undefined" ? { whatsapp: "https://whatsapp.com/channel/0029Vb94mKa3LdQTLI6AOL2z" } : getLinks();
}
