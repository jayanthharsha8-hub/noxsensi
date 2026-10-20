import { createFileRoute } from "@tanstack/react-router";
import { CircleHelp } from "lucide-react";

import { AppFrame } from "@/components/app-frame";
import { NoxLogo } from "@/components/nox-logo";

const FAQS = [
  {
    q: "How do I use these sensitivity values?",
    a: "Open Free Fire, go to Settings → Sensitivity, and copy each value exactly as shown for your device.",
  },
  {
    q: "Why do values differ per device?",
    a: "Screen size, touch sampling rate and processor all change how your finger input translates in game, so each device gets tuned values.",
  },
  {
    q: "What does RAM change?",
    a: "More RAM means smoother frame pacing, which usually allows slightly higher sensitivity without losing control.",
  },
  {
    q: "How often should I regenerate?",
    a: "Whenever you change DPI, refresh rate or play a very different device — then practice a few matches before ranked.",
  },
];

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & FAQ — NOX SENSI" },
      {
        name: "description",
        content: "Answers about sensitivity settings, DPI and how NOX SENSI works.",
      },
      { property: "og:title", content: "Help & FAQ — NOX SENSI" },
      {
        property: "og:description",
        content: "Answers about sensitivity settings, DPI and how NOX SENSI works.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  return (
    <AppFrame active="help">
      <header className="flex items-center gap-3">
        <NoxLogo compact />
      </header>

      <section className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="flex items-center gap-3">
          <CircleHelp className="h-7 w-7 text-primary" strokeWidth={2.2} />
          <div className="min-w-0">
            <h1 className="font-display text-lg font-extrabold uppercase tracking-wide">
              Help & FAQ
            </h1>
            <p className="text-xs text-muted-foreground">
              Everything about sensitivity settings
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {FAQS.map((faq) => (
            <div
              key={faq.q}
              className="rounded-xl border border-border bg-secondary/60 p-3"
            >
              <p className="text-sm font-bold">{faq.q}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </AppFrame>
  );
}
