import { describe, expect, it } from "vitest";
import { passcodeStatus } from "@/lib/admin";

describe("passcode rules", () => {
  it("rejects after expiry date", () => {
    expect(passcodeStatus({ code: "A", expires: "2026-11-01", limit: 0, used: 0 }, "2026-11-02")).toBe("expired");
  });
  it("rejects when user limit reached", () => {
    expect(passcodeStatus({ code: "A", expires: "", limit: 100, used: 100 }, "2026-11-02")).toBe("full");
  });
  it("allows under limit before expiry", () => {
    expect(passcodeStatus({ code: "A", expires: "2026-12-01", limit: 100, used: 99 }, "2026-11-02")).toBe("ok");
  });
});
