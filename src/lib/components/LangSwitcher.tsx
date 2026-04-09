import { useEffect, useState } from "react";
import { toggleSetter } from "../utils/toggleSetter";
import { initLang, type Lang } from "../utils/initLang";

const LangSwitcher = () => {
  const [lang, setLang] = useState<Lang>(initLang);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = () => toggleSetter<Lang>(setLang, "pl", "en");

  return (
    <button onClick={toggleLang}>
      {lang === "pl" ? "zmień na: EN" : "change to: PL"}
    </button>
  );
};

export default LangSwitcher;
