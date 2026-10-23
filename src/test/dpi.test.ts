import { describe, expect, it } from "vitest";

import {
  DPI_MAX,
  DPI_MIN,
  DPI_OS_OPTIONS,
  DPI_OS_VERSIONS,
  DPI_RAM_OPTIONS,
  generateDpi,
} from "@/lib/dpi";

describe("dpi generator", () => {
  it("always returns a DPI inside the documented 400-520 range", () => {
    for (const os of DPI_OS_OPTIONS) {
      for (const version of DPI_OS_VERSIONS[os]) {
        for (const ram of DPI_RAM_OPTIONS) {
          for (let nonce = 0; nonce < 5; nonce++) {
            const dpi = generateDpi(os, version, ram, nonce);
            expect(dpi).toBeGreaterThanOrEqual(DPI_MIN);
            expect(dpi).toBeLessThanOrEqual(DPI_MAX);
          }
        }
      }
    }
  });

  it("is deterministic for the same OS, version, RAM and roll", () => {
    expect(generateDpi("Android", "14", "8GB", 0)).toBe(
      generateDpi("Android", "14", "8GB", 0),
    );
  });

  it("varies on a new roll", () => {
    const rolls = new Set(
      Array.from({ length: 8 }, (_, i) => generateDpi("Android", "14", "8GB", i)),
    );
    expect(rolls.size).toBeGreaterThan(1);
  });
});
