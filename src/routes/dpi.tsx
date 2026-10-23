import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Cog, Crosshair, Cpu, Info, Smartphone } from "lucide-react";

import { AppFrame } from "@/components/app-frame";
import { NoxLogo } from "@/components/nox-logo";
import {
  DPI_MAX,
  DPI_MIN,
  DPI_OS_OPTIONS,
  DPI_OS_VERSIONS,
  DPI_RAM_OPTIONS,
  generateDpi,
  type DpiOs,
} from "@/lib/dpi";

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

const selectClass =
  "h-12 w-full appearance-none rounded-xl border border-input bg-card px-3.5 pr-9 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-ring";

function Select({
  label,
  icon: Icon,
  value,
  onChange,
  options,
}: {
  label: string;
  icon: typeof Cpu;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  return (
    <div className="min-w-0">
      <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
        <Icon className="h-4 w-4 text-accent" /> {label}
      </div>
      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={selectClass}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}

function DpiPage() {
  const [os, setOs] = useState<DpiOs>("Android");
  const [osVersion, setOsVersion] = useState<string>(DPI_OS_VERSIONS.Android[0] ?? "11");
  const [ram, setRam] = useState<string>("8GB");
  // No DPI until the user presses Generate DPI.
  const [dpi, setDpi] = useState<number | null>(null);
  const [roll, setRoll] = useState(0);

  const changeOs = (value: string) => {
    const next = value as DpiOs;
    setOs(next);
    // Keep the OS version list valid for the chosen OS.
    setOsVersion(DPI_OS_VERSIONS[next][0] ?? "11");
    setDpi(null);
  };

  const changeVersion = (value: string) => {
    setOsVersion(value);
    setDpi(null);
  };

  const changeRam = (value: string) => {
    setRam(value);
    setDpi(null);
  };

  const generate = () => {
    setDpi(generateDpi(os, osVersion, ram, roll));
    setRoll((n) => n + 1);
  };

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

        {/* Selectors */}
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          <Select
            label="OS"
            icon={Smartphone}
            value={os}
            onChange={changeOs}
            options={DPI_OS_OPTIONS}
          />
          <Select
            label="Version"
            icon={Crosshair}
            value={osVersion}
            onChange={changeVersion}
            options={DPI_OS_VERSIONS[os]}
          />
          <Select
            label="RAM"
            icon={Cpu}
            value={ram}
            onChange={changeRam}
            options={DPI_RAM_OPTIONS}
          />
        </div>

        {/* Generate */}
        <button
          type="button"
          onClick={generate}
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-display text-base font-extrabold uppercase tracking-wide text-primary-foreground shadow-glow-lg transition-transform active:scale-[0.99]"
        >
          <Cog className="h-5 w-5" /> Generate DPI
        </button>

        {/* Result — only rendered after Generate is pressed */}
        <div className="mt-4 rounded-xl border border-primary/50 bg-background p-4 text-center">
          <p className="text-xs text-muted-foreground">Recommended DPI</p>
          {dpi === null ? (
            <p className="mt-1 text-sm text-muted-foreground">
              Select OS, version and RAM, then press Generate DPI
            </p>
          ) : (
            <>
              <p className="font-display text-4xl font-extrabold text-primary">{dpi}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Range {DPI_MIN} - {DPI_MAX} · Set it in your game settings
              </p>
            </>
          )}
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

      <section className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
        <Info className="h-5 w-5 shrink-0 text-primary" />
        <p className="min-w-0 flex-1 text-xs leading-relaxed">
          <span className="font-bold text-primary">Tip : </span>
          DPI is independent from sensitivity — set both for the best control.
        </p>
      </section>
    </AppFrame>
  );
}
