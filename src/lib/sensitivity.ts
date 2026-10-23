export const SENSITIVITY_RANGES = {
  general: { label: "General", min: 180, max: 200 },
  redDot: { label: "Red Dot", min: 170, max: 195 },
  scope2x: { label: "2x Scope", min: 160, max: 190 },
  scope4x: { label: "4x Scope", min: 130, max: 160 },
  sniper: { label: "Sniper Scope", min: 150, max: 180 },
} as const;

export type SensitivityKey = keyof typeof SENSITIVITY_RANGES;
export type SensitivityResult = Record<SensitivityKey, number>;

export const SENSITIVITY_ORDER: SensitivityKey[] = [
  "general",
  "redDot",
  "scope2x",
  "scope4x",
  "sniper",
];

function hashString(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

/** Deterministic value in [min, max] derived from a numeric seed. */
function seededValue(seed: number, min: number, max: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  const frac = x - Math.floor(x);
  return Math.round(min + frac * (max - min));
}

/**
 * Random result within each sensitivity's documented range. Deterministic for
 * the same device, RAM and nonce; each new nonce produces a fresh roll.
 */
export function generateSensitivity(
  brandId: string,
  modelName: string,
  ram: string,
  nonce = 0,
): SensitivityResult {
  const seed = hashString(`${brandId}|${modelName}|${ram}|${nonce}`);
  const result = {} as SensitivityResult;
  SENSITIVITY_ORDER.forEach((key, i) => {
    const { min, max } = SENSITIVITY_RANGES[key];
    result[key] = seededValue(seed + i, min, max);
  });
  return result;
}
