import type { ResolvedTheme, ThemePreference } from "@/types/theme";

export const THEME_STORAGE_KEY = "delivery-dashboard-theme";

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
  return preference === "system" ? getSystemTheme() : preference;
}

export function applyTheme(preference: ThemePreference): ResolvedTheme {
  const resolvedTheme = resolveTheme(preference);

  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
    document.documentElement.dataset.theme = preference;
  }

  return resolvedTheme;
}

export function getStoredTheme(): ThemePreference {
  if (typeof window === "undefined") {
    return "system";
  }

  const theme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (theme === "light" || theme === "dark" || theme === "system") {
    return theme;
  }

  return "system";
}

export function setStoredTheme(preference: ThemePreference): ResolvedTheme {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  }

  return applyTheme(preference);
}
