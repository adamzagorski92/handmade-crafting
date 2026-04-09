const VALID_LANGS = ["pl", "en"] as const;
export type Lang = (typeof VALID_LANGS)[number];

export const initLang = (): Lang => {
  const stored = localStorage.getItem("lang");
  if (stored === "pl" || stored === "en") return stored;

  const browserLang = navigator.language.slice(0, 2);
  return browserLang === "pl" ? "pl" : "en";
};
