import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { MoonIcon, SunIcon, MagnifyingGlassIcon, LanguageIcon } from "@heroicons/react/24/outline";

export default function Navbar({ onSearch }) {
  const { theme, toggleTheme, lang, toggleLang } = useAppContext();
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-300 dark:bg-gray-900 text-white">
      <h1 className="text-xl font-bold">{t("system")}</h1>

      {/* Barra de Busqueda */}
      <form onSubmit={handleSearch} className="flex items-center">
        <input type="text" placeholder={t("search")} value={query} onChange={(e) => setQuery(e.target.value)} className="p-2 rounded text-white font-semibold border-2" title={t("search1")}/>
        <button type="submit" className="ml-2">
          <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer"/>
        </button>
      </form>

      {/* Controles */}
      <div className="flex space-x-4">
        <button onClick={toggleTheme}>
          {theme === "light" ? <MoonIcon className="h-6 w-6 cursor-pointer" /> : <SunIcon className="h-6 w-6 cursor-pointer" />}
        </button>
        <button onClick={toggleLang}>
          <LanguageIcon className="h-6 w-6 cursor-pointer" />
          <span className="ml-1">{lang.toUpperCase()}</span>
        </button>
      </div>
    </nav>
  );
}