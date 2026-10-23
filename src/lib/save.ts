import {
  SENSITIVITY_ORDER,
  type SensitivityResult,
} from "@/lib/sensitivity";

export interface SavedSetting {
  id: string;
  brandId: string;
  brandLabel: string;
  modelId: string;
  modelName: string;
  ram: string;
  values: SensitivityResult;
  savedAt: number;
}

const STORAGE_KEY = "nox-sensi-saved";

/** Read saved settings from localStorage. Browser-only: call from effects/handlers. */
export function loadSavedSettings(): SavedSetting[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is SavedSetting =>
        item &&
        typeof item.id === "string" &&
        typeof item.modelName === "string" &&
        item.values &&
        SENSITIVITY_ORDER.every((key) => typeof item.values[key] === "number"),
    );
  } catch {
    return [];
  }
}

export function persistSavedSettings(settings: SavedSetting[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage full or unavailable: saving is best-effort.
  }
}

export function addSavedSetting(setting: SavedSetting): SavedSetting[] {
  const next = [setting, ...loadSavedSettings().filter((s) => s.id !== setting.id)];
  persistSavedSettings(next);
  return next;
}

export function removeSavedSetting(id: string): SavedSetting[] {
  const next = loadSavedSettings().filter((s) => s.id !== id);
  persistSavedSettings(next);
  return next;
}

/** Stable id for a device + RAM + exact values combination. */
export function savedSettingId(
  brandId: string,
  modelId: string,
  ram: string,
): string {
  return `${brandId}::${modelId}::${ram}`;
}
