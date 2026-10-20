import { describe, expect, it } from "vitest";

import {
  GALAXY_S24_EXAMPLE,
  SENSITIVITY_ORDER,
  SENSITIVITY_RANGES,
  generateSensitivity,
  getDefaultResult,
} from "@/lib/sensitivity";

function assertWithinRanges(result: Record<string, number>) {
  for (const key of SENSITIVITY_ORDER) {
    const { min, max } = SENSITIVITY_RANGES[key];
    expect(result[key]).toBeGreaterThanOrEqual(min);
    expect(result[key]).toBeLessThanOrEqual(max);
  }
}

describe("sensitivity generator", () => {
  it("keeps every generated value inside its documented range", () => {
    const result = generateSensitivity("samsung", "Galaxy S24", "8GB");
    assertWithinRanges(result);
  });

  it("produces values inside the ranges for many devices", () => {
    for (let i = 0; i < 50; i++) {
      const result = generateSensitivity(`brand-${i}`, `Model ${i}`, "8GB");
      assertWithinRanges(result);
    }
  });

  it("shows the documented Galaxy S24 (8GB) example values on first load", () => {
    const result = getDefaultResult("samsung", "galaxy-s24", "8GB");
    expect(result).toEqual(GALAXY_S24_EXAMPLE);
    expect(result.general).toBe(188);
    expect(result.redDot).toBe(182);
    expect(result.scope2x).toBe(171);
    expect(result.scope4x).toBe(142);
    expect(result.sniper).toBe(166);
  });

  it("is deterministic for the same device and RAM", () => {
    const a = generateSensitivity("samsung", "Galaxy S24", "8GB");
    const b = generateSensitivity("samsung", "Galaxy S24", "8GB");
    expect(a).toEqual(b);
  });
});
