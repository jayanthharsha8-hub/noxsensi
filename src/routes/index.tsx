import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bell, Crosshair } from "lucide-react";

import heroBanner from "@/assets/hero-banner.png";
import promoBanner from "@/assets/promo-banner.png";
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
  return (
    <AppFrame active="home">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
        <NoxLogo />
        <button
          type="button"
          aria-label="Notifications"
          className="relative mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-card/60"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground">
            3
          </span>
        </button>
      </header>

      {/* Hero banner */}
      <section className="relative mt-4 h-56 overflow-hidden rounded-2xl border border-border shadow-card">
        <img
          src={heroBanner}
          alt="Free Fire gamer in black and yellow gear"
          width={1920}
          height={768}
          className="absolute inset-0 h-full w-full object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
        <div className="relative flex h-full flex-col justify-center gap-2 p-4">
          <span className="font-display text-lg font-extrabold italic tracking-tight drop-shadow">
            FREE FIRE
          </span>
          <h1 className="font-display text-[1.3rem] font-extrabold italic leading-[1.15] tracking-tight">
            FIND YOUR
            <br />
            <span className="text-primary">PERFECT SENSITIVITY</span>
          </h1>
          <p className="text-[11px] font-medium text-foreground/80">
            Better Settings · More Headshots · Win More
          </p>
          <Link
            to="/brand/$brand"
            params={{ brand: "samsung" }}
            className="mt-1.5 flex w-fit items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-display text-sm font-extrabold tracking-wide text-primary-foreground shadow-glow transition-transform active:scale-[0.98]"
          >
            GET STARTED <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5">
          <span className="h-1.5 w-4 rounded-full bg-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60" />
        </div>
      </section>

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

      {/* Performance promo */}
      <section className="relative mt-5 h-40 overflow-hidden rounded-2xl border border-border shadow-card">
        <img
          src={promoBanner}
          alt=""
          loading="lazy"
          width={1920}
          height={512}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/30" />
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 h-9 w-9 rounded-tr-xl border-r-[3px] border-t-[3px] border-primary"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-2 h-9 w-9 rounded-bl-xl border-b-[3px] border-l-[3px] border-primary"
        />
        <div className="relative flex h-full items-center gap-3 p-5">
          <Crosshair className="h-10 w-10 shrink-0 text-primary" strokeWidth={2} />
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold leading-tight">Target Your</p>
            <p className="font-display text-xl font-extrabold italic leading-tight text-primary">
              PERFORMANCE
            </p>
            <p className="mt-1.5 text-[10px] font-medium text-foreground/80">
              Right Settings · Better Control · More Headshots
            </p>
          </div>
          <div className="flex shrink-0 flex-col items-center pr-1">
            <span className="font-display text-3xl font-black italic leading-none text-primary">
              F
            </span>
            <span className="mt-0.5 font-display text-[10px] font-extrabold italic tracking-tight text-primary">
              FREE FIRE
            </span>
          </div>
        </div>
      </section>
    </AppFrame>
  );
}
