import { useEffect, useState } from "react";
import {
  createFileRoute,
  Link,
  notFound,
  useNavigate,
} from "@tanstack/react-router";
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  Cog,
  Crosshair,
  Cpu,
  Focus,
  Info,
  ScanEye,
  Smartphone,
  Telescope,
  User,
  Zap,
} from "lucide-react";

import { phoneImageFor } from "@/assets/phones";
import { AppFrame } from "@/components/app-frame";
import { BrandIcon } from "@/components/brand-icon";
import { NoxLogo } from "@/components/nox-logo";
import { defaultRam, getBrand, getModel } from "@/data/devices";
import {
  SENSITIVITY_ORDER,
  SENSITIVITY_RANGES,
  generateSensitivity,
  type SensitivityResult,
} from "@/lib/sensitivity";
import { addSavedSetting, savedSettingId } from "@/lib/save";

const ROW_ICONS = [User, Crosshair, Focus, ScanEye, Telescope];

export const Route = createFileRoute("/brand/$brand/$model")({
  head: () => ({
    meta: [
      { title: "Sensitivity Generator — NOX SENSI" },
      {
        name: "description",
        content: "Generate optimized Free Fire sensitivity values for your exact device and RAM.",
      },
      { property: "og:title", content: "Sensitivity Generator — NOX SENSI" },
      {
        property: "og:description",
        content: "Generate optimized Free Fire sensitivity values for your exact device and RAM.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Generator,
});

function Generator() {
  const { brand: brandId, model: modelId } = Route.useParams();
  const brand = getBrand(brandId);
  const model = getModel(brandId, modelId);
  const navigate = useNavigate();

  const [ram, setRam] = useState(() => (model ? defaultRam(model) : "8GB"));
  // No sensitivity until the user presses Generate.
  const [result, setResult] = useState<SensitivityResult | null>(null);
  const [roll, setRoll] = useState(0);
  const [saved, setSaved] = useState(false);

  // Reset RAM + result when the selected model changes.
  useEffect(() => {
    if (!model) return;
    setRam(defaultRam(model));
    setResult(null);
    setSaved(false);
  }, [brandId, modelId, model]);

  if (!brand || !model) throw notFound();

  const changeModel = (value: string) =>
    navigate({ to: "/brand/$brand/$model", params: { brand: brandId, model: value } });

  // Changing RAM hides the previous result: values only show after Generate.
  const changeRam = (value: string) => {
    setRam(value);
    setResult(null);
    setSaved(false);
  };

  const generate = () => {
    setResult(generateSensitivity(brandId, model.name, ram, roll));
    setRoll((n) => n + 1);
    setSaved(false);
  };

  const save = () => {
    if (!result) return;
    addSavedSetting({
      id: savedSettingId(brandId, modelId, ram),
      brandId,
      brandLabel: brand.label,
      modelId,
      modelName: model.name,
      ram,
      values: result,
      savedAt: Date.now(),
    });
    setSaved(true);
  };

  return (
    <AppFrame active="dpi">
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
        <Link
          to="/brand/$brand"
          params={{ brand: brandId }}
          aria-label="Back to models"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-foreground transition-colors hover:bg-card"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <NoxLogo compact />
        <span className="shrink-0 font-display text-sm font-extrabold italic tracking-tight">
          FREE FIRE
        </span>
      </header>

      {/* Device summary */}
      <section className="relative mt-4 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-card">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(90% 130% at 100% 0%, color-mix(in oklab, var(--glow) 70%, transparent), transparent 70%)",
          }}
        />
        <div className="relative flex items-center gap-4">
          <img
            src={phoneImageFor(model.color)}
            alt={model.name}
            loading="lazy"
            width={96}
            height={96}
            className="h-24 w-20 shrink-0 object-contain"
          />
          <div className="min-w-0 flex-1">
            <div className="h-6 w-16">
              <BrandIcon brand={brand} />
            </div>
            <h1 className="mt-1.5 break-words text-2xl font-extrabold leading-tight">
              {model.name}
            </h1>
            <p className="break-words text-sm text-muted-foreground">({model.code})</p>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-2">
            <span className="flex items-center gap-2 rounded-lg border border-primary/60 bg-background px-3 py-2">
              <Cpu className="h-4 w-4 text-primary" />
              <span className="font-display text-sm font-extrabold text-primary">
                {ram} RAM
              </span>
            </span>
            <span className="max-w-32 text-center text-[11px] font-medium leading-tight text-accent">
              {model.processor}
            </span>
          </div>
        </div>
      </section>

      {/* Selectors */}
      <section className="mt-4 grid grid-cols-2 gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <Smartphone className="h-4 w-4 text-accent" /> Select Model
          </div>
          <div className="relative">
            <select
              value={modelId}
              onChange={(event) => changeModel(event.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-input bg-card px-3.5 pr-9 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {brand.models.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-muted-foreground">
            <Cpu className="h-4 w-4 text-accent" /> Select RAM
          </div>
          <div className="relative">
            <select
              value={ram}
              onChange={(event) => changeRam(event.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-input bg-card px-3.5 pr-9 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {model.ramOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* Generate */}
      <button
        type="button"
        onClick={generate}
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary font-display text-base font-extrabold uppercase tracking-wide text-primary-foreground shadow-glow-lg transition-transform active:scale-[0.99]"
      >
        <Cog className="h-5 w-5" /> Generate Sensitivity
      </button>

      {/* Results — only rendered after Generate is pressed */}
      {result && (
        <section className="mt-4 rounded-2xl border border-border bg-card p-4 shadow-card">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
            <Crosshair className="h-7 w-7 shrink-0 text-primary" strokeWidth={2.2} />
            <div className="min-w-0">
              <h2 className="font-display text-lg font-extrabold uppercase tracking-wide">
                Your Sensitivity
              </h2>
              <p className="mt-0.5 break-words text-xs text-muted-foreground">
                Optimized for {brand.label} {model.name} ({ram})
              </p>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-primary/50 px-3 py-1.5 text-[11px] font-semibold text-primary">
              <Zap className="h-3.5 w-3.5" /> Best for Headshots
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {SENSITIVITY_ORDER.map((key, index) => {
              const { label, min, max } = SENSITIVITY_RANGES[key];
              const value = result[key];
              const Icon = ROW_ICONS[index] ?? User;
              // Progress is measured within each category's own range.
              const pct = Math.round(((value - min) / (max - min)) * 100);
              return (
                <div
                  key={key}
                  className="flex items-center gap-3 rounded-xl border border-border bg-secondary/60 p-3"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-card">
                    <Icon className="h-5 w-5 text-accent" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className="truncate text-sm font-bold">{label}</p>
                      <p className="text-xl font-extrabold leading-none tabular-nums">
                        {value}
                      </p>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      ({min} - {max})
                    </p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary shadow-glow transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-card">
                    <Crosshair className="h-4 w-4 text-accent" />
                  </span>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={save}
            disabled={saved}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-primary/60 bg-background font-display text-base font-extrabold uppercase tracking-wide text-primary shadow-glow transition-transform active:scale-[0.99] disabled:opacity-80"
          >
            {saved ? (
              <>
                <BookmarkCheck className="h-5 w-5" /> Saved to Save Tab
              </>
            ) : (
              <>
                <Bookmark className="h-5 w-5" /> Save Sensitivity
              </>
            )}
          </button>
        </section>
      )}

      {/* Tip */}
      <section className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
        <Info className="h-5 w-5 shrink-0 text-primary" />
        <p className="min-w-0 flex-1 text-xs leading-relaxed">
          <span className="font-bold text-primary">Tip : </span>
          Use these settings in your game for better control and more headshots!
        </p>
        <span className="shrink-0 font-display text-xs font-extrabold italic tracking-tight text-primary">
          FREE FIRE
        </span>
      </section>
    </AppFrame>
  );
}
