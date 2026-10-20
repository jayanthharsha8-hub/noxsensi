import type { Brand } from "@/data/devices";

/**
 * Brand marks recreated with tokens + inline SVG. Literal hex values appear
 * only inside inline SVG artwork (the Google "G" multicolor mark), which acts
 * as a logo asset — component classNames always use design tokens.
 */
export function BrandIcon({ brand, className }: { brand: Brand; className?: string }) {
  const base = "flex h-full w-full items-center justify-center";

  switch (brand.id) {
    case "samsung":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <span className="flex h-[62%] w-full items-center justify-center rounded-full bg-brand-samsung px-2">
            <span className="font-display text-[9px] font-bold tracking-wide text-white">
              SAMSUNG
            </span>
          </span>
        </div>
      );
    case "xiaomi":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <span className="flex h-[78%] aspect-square items-center justify-center rounded-[28%] bg-brand-xiaomi">
            <span className="font-display text-sm font-extrabold text-white">mı</span>
          </span>
        </div>
      );
    case "realme":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <span className="flex h-[52%] w-[88%] items-center justify-center rounded-md bg-primary">
            <span className="font-display text-xs font-bold lowercase text-primary-foreground">
              realme
            </span>
          </span>
        </div>
      );
    case "oppo":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <span className="font-display text-lg font-bold lowercase tracking-tight text-brand-oppo">
            oppo
          </span>
        </div>
      );
    case "oneplus":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <span className="flex h-[68%] aspect-square items-center justify-center rounded-lg bg-brand-oneplus">
            <span className="font-display text-xs font-extrabold text-white">1+</span>
          </span>
        </div>
      );
    case "vivo":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <span className="font-display text-lg font-bold lowercase tracking-tight text-brand-vivo">
            vivo
          </span>
        </div>
      );
    case "iphone":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-foreground" fill="currentColor" aria-hidden="true">
            <path d="M16.36 12.94c.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.68-.4 6.65 1.11 8.83.74 1.07 1.62 2.27 2.78 2.22 1.12-.04 1.54-.72 2.89-.72 1.35 0 1.73.72 2.9.7 1.2-.02 1.96-1.09 2.69-2.17.85-1.23 1.2-2.43 1.22-2.49-.03-.01-2.33-.9-2.45-3.56zM14.16 6.5c.6-.73 1.01-1.75.9-2.76-.87.04-1.93.58-2.56 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.58-1.23z" />
          </svg>
        </div>
      );
    case "iqoo":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <span className="font-display text-lg font-extrabold italic tracking-tight text-primary">
            iQOO
          </span>
        </div>
      );
    case "motorola":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <svg viewBox="0 0 24 24" className="h-8 w-8" aria-hidden="true">
            <circle cx="12" cy="12" r="11" fill="var(--color-brand-moto)" />
            <path
              d="M7 17 V8.5 L12 14.5 L17 8.5 V17"
              fill="none"
              stroke="white"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    case "google-pixel":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          </svg>
        </div>
      );
    case "poco":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <span className="font-display text-lg font-extrabold tracking-tight text-primary">
            POCO
          </span>
        </div>
      );
    case "infinix":
      return (
        <div className={`${base} ${className ?? ""}`}>
          <span className="font-display text-base font-bold text-brand-infinix">
            Infinix
          </span>
        </div>
      );
    default:
      return null;
  }
}
