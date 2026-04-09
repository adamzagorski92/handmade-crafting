const VALID_THEMES = ["light", "dark"] as const;
export type ThemeSchame = (typeof VALID_THEMES)[number];

export const initThemeColors = (): ThemeSchame => {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  return window.matchMedia("(prefers-color-scheme:dark)").matches
    ? "dark"
    : "light";
};
