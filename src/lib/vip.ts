export interface VipResult { general: number; redDot: number; scope2x: number; scope4x: number; sniper: number; fireButton: number; dpi: number }
export const VIP_RANGES = {
  general: [190, 200], redDot: [185, 200], scope2x: [175, 195], scope4x: [150, 175], sniper: [160, 190], fireButton: [42, 58], dpi: [480, 560],
} as const;
export function generateVip(rand: () => number = Math.random): VipResult {
  const r = (k: keyof typeof VIP_RANGES) => { const [a, b] = VIP_RANGES[k]; return Math.round(a + rand() * (b - a)); };
  return { general: r("general"), redDot: r("redDot"), scope2x: r("scope2x"), scope4x: r("scope4x"), sniper: r("sniper"), fireButton: r("fireButton"), dpi: r("dpi") };
}
