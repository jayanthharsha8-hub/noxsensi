export const DPI_MIN = 400;
export const DPI_MAX = 520;

export const DPI_OS_OPTIONS = ["Android", "iOS"] as const;
export type DpiOs = (typeof DPI_OS_OPTIONS)[number];

export const DPI_OS_VERSIONS: Record<DpiOs, string[]> = {
  Android: ["11", "12", "13", "14", "15", "16"],
  iOS: ["15", "16", "17", "18", "26"],
};

export const DPI_RAM_OPTIONS = ["4GB", "6GB", "8GB", "12GB", "16GB"] as const;

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Recommended DPI for the selected OS, OS version and RAM. Deterministic per
 * selection + nonce, always inside the documented 400-520 range.
 */
export function generateDpi(
  os: DpiOs,
  osVersion: string,
  ram: string,
  nonce = 0,
): number {
  const versionIndex = Math.max(
    0,
    DPI_OS_VERSIONS[os].indexOf(osVersion),
  );
  const ramIndex = Math.max(0, DPI_RAM_OPTIONS.indexOf(ram as (typeof DPI_RAM_OPTIONS)[number]));

  // Base recommendation tuned per OS: iOS needs a slightly lower DPI.
  let dpi = os === "Android" ? 480 : 470;
  // Newer OS versions handle higher input rates a touch better.
  dpi += versionIndex * 4;
  // More RAM generally pairs with smoother performance: nudge DPI up.
  dpi += ramIndex * 4 - 6;
  // Small deterministic jitter so repeated generates vary within the range.
  const seed = hashString(`${os}|${osVersion}|${ram}|${nonce}`);
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  dpi += (x - Math.floor(x)) * 12 - 6;

  return Math.round(clamp(dpi, DPI_MIN, DPI_MAX));
}
