import { useLayoutEffect, useState } from "react";
import { initThemeColors, type ThemeSchame } from "../utils/initThemeColors";
import { toggleSetter } from "../utils/toggleSetter";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<ThemeSchame>(initThemeColors);

  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleThemeColor = () =>
    toggleSetter<ThemeSchame>(setTheme, "light", "dark");

  return (
    <button onClick={toggleThemeColor} aria-label="Toggle theme">
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeToggle;
