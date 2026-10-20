import { createFileRoute } from "@tanstack/react-router";
import { Crosshair } from "lucide-react";

import { AppFrame } from "@/components/app-frame";
import { NoxLogo } from "@/components/nox-logo";

const DPI_TIPS = [
  "Lower DPI pairs well with higher sensitivity values.",
  "Keep the same DPI in practice range and ranked matches.",
  "Test every scope for a few minutes before going ranked.",
];

export const Route = createFileRoute("/dpi")({
  head: () => ({
    meta: [
      { title: "DPI Guide — NOX SENSI" },
      {
        name: "description",
        content: "Match your sensitivity with the right DPI for better aim control.",
      },
      { property: "og:title", content: "DPI Guide — NOX SENSI" },
      {
        property: "og:description",
        content: "Match your sensitivity with the right DPI for better aim control.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DpiPage,
});

function DpiPage() {
  return (
    <AppFrame active="dpi">
      <header className="flex items-center gap-3">
        <NoxLogo compact />
      </header>

      <section className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="flex items-center gap-3">
          <Crosshair className="h-7 w-7 text-primary" strokeWidth={2.2} />
          <div className="min-w-0">
            <h1 className="font-display text-lg font-extrabold uppercase tracking-wide">
              DPI Guide
            </h1>
            <p className="text-xs text-muted-foreground">
              Match your sensitivity with the right DPI
            </p>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-primary/50 bg-background p-4 text-center">
          <p className="text-xs text-muted-foreground">Recommended DPI</p>
          <p className="font-display text-4xl font-extrabold text-primary">480</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Range 400 - 520 · Set it in your game settings
          </p>
        </div>

        <ul className="mt-4 space-y-2">
          {DPI_TIPS.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2.5 rounded-xl border border-border bg-secondary/60 p-3 text-xs leading-relaxed"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="min-w-0">{tip}</span>
            </li>
          ))}
        </ul>
      </section>
    </AppFrame>
  );
}
