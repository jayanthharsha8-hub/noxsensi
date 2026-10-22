import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";

import { phoneImageFor } from "@/assets/phones";
import { AppFrame } from "@/components/app-frame";
import { BrandIcon } from "@/components/brand-icon";
import { NoxLogo } from "@/components/nox-logo";
import { getBrand } from "@/data/devices";

type ModelFilter = "all" | "old" | "new";

export const Route = createFileRoute("/brand/$brand/")({
  head: () => ({
    meta: [
      { title: "Device Models — NOX SENSI" },
      {
        name: "description",
        content: "Select your device model to generate the perfect sensitivity settings.",
      },
      { property: "og:title", content: "Device Models — NOX SENSI" },
      {
        property: "og:description",
        content: "Select your device model to generate the perfect sensitivity settings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BrandModels,
});

function BrandModels() {
  const { brand: brandId } = Route.useParams();
  const brand = getBrand(brandId);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ModelFilter>("all");

  const models = useMemo(() => {
    if (!brand) return [];
    let list = brand.models;
    if (filter === "old") list = list.filter((x) => x.year <= 2022);
    else if (filter === "new") list = list.filter((x) => x.year >= 2023);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (x) => x.name.toLowerCase().includes(q) || String(x.year).includes(q),
      );
    }
    return list;
  }, [brand, filter, query]);

  if (!brand) throw notFound();

  const countLabel =
    brand.models.length >= 20
      ? `${Math.floor(brand.models.length / 10) * 10}+ Models`
      : `${brand.models.length} Models`;

  return (
    <AppFrame active="home">
      <header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
        <Link
          to="/"
          aria-label="Back to home"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-foreground transition-colors hover:bg-card"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <NoxLogo compact />
      </header>

      {/* Brand summary */}
      <section className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
        <div className="h-10 w-16 shrink-0">
          <BrandIcon brand={brand} />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-lg font-bold">{brand.label}</h1>
          <p className="text-xs text-muted-foreground">Select your device model</p>
        </div>
        <span className="shrink-0 rounded-full border border-accent px-3 py-1.5 text-xs font-semibold text-accent">
          {countLabel}
        </span>
      </section>

      {/* Search + filters */}
      <section className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2.5">
        <div className="relative min-w-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search your device..."
            className="h-11 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
        <div className="flex shrink-0 gap-2">
          {(["all", "old", "new"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFilter(option)}
              className={`h-9 rounded-full px-4 text-sm font-semibold capitalize transition-colors ${
                filter === option
                  ? "bg-accent text-accent-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      {/* Models */}
      <section className="mt-4 grid grid-cols-2 gap-3">
        {models.map((model) => (
          <Link
            key={model.id}
            to="/brand/$brand/$model"
            params={{ brand: brandId, model: model.id }}
            className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-3 shadow-card transition-colors hover:border-primary/40"
          >
            <img
              src={phoneImageFor(model.color)}
              alt={model.name}
              loading="lazy"
              width={64}
              height={64}
              className="h-12 w-10 shrink-0 object-contain"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">{model.name}</p>
              <p className="text-xs text-muted-foreground">{model.year}</p>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
          </Link>
        ))}
      </section>

      {models.length === 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          No devices found. Try a different search.
        </p>
      )}
    </AppFrame>
  );
}
