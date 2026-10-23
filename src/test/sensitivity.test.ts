import { describe, expect, it } from "vitest";

import {
  SENSITIVITY_ORDER,
  SENSITIVITY_RANGES,
  generateSensitivity,
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

  it("stays in range for every documented sensitivity category", () => {
    const result = generateSensitivity("samsung", "Galaxy S24", "8GB");
    expect(result.general).toBeGreaterThanOrEqual(180);
    expect(result.general).toBeLessThanOrEqual(200);
    expect(result.redDot).toBeGreaterThanOrEqual(170);
    expect(result.redDot).toBeLessThanOrEqual(195);
    expect(result.scope2x).toBeGreaterThanOrEqual(160);
    expect(result.scope2x).toBeLessThanOrEqual(190);
    expect(result.scope4x).toBeGreaterThanOrEqual(130);
    expect(result.scope4x).toBeLessThanOrEqual(160);
    expect(result.sniper).toBeGreaterThanOrEqual(150);
    expect(result.sniper).toBeLessThanOrEqual(180);
  });

  it("is deterministic for the same device, RAM and roll", () => {
    const a = generateSensitivity("samsung", "Galaxy S24", "8GB", 3);
    const b = generateSensitivity("samsung", "Galaxy S24", "8GB", 3);
    expect(a).toEqual(b);
  });

  it("re-rolls values on a new press (nonce)", () => {
    const first = generateSensitivity("samsung", "Galaxy S24", "8GB", 0);
    const second = generateSensitivity("samsung", "Galaxy S24", "8GB", 1);
    assertWithinRanges(first);
    assertWithinRanges(second);
    expect(second).not.toEqual(first);
  });
});
