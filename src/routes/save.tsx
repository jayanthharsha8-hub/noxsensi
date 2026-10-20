import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Zap } from "lucide-react";

import { AppFrame } from "@/components/app-frame";
import { NoxLogo } from "@/components/nox-logo";

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
  return (
    <AppFrame active="save">
      <header className="flex items-center gap-3">
        <NoxLogo compact />
      </header>

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
          to="/brand/samsung"
          className="mt-2 flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-display text-sm font-extrabold tracking-wide text-primary-foreground shadow-glow transition-transform active:scale-[0.98]"
        >
          <Zap className="h-4 w-4" /> GENERATE NOW
        </Link>
      </section>
    </AppFrame>
  );
}
