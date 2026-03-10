import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon, MagnifyingGlassIcon, LanguageIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function Navbar({ onSearch }) {
  const { theme, toggleTheme, lang, toggleLang } = useAppContext();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
      setQuery("");
    }
  };

  return (
    <nav className="bg-blue-600 dark:bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor principal */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-xl font-bold">
            {t("system")}
          </div>

          {/* Botón hamburguesa (solo móvil) */}
          <div className="flex md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6 cursor-pointer"/>
              ) : (
                <Bars3Icon className="h-6 w-6 cursor-pointer"/>
              )}
            </button>
          </div>

          {/* Menú horizontal (pantallas grandes) */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <form onSubmit={handleSearch} className="flex items-center">
              <input type="text" placeholder={t("search")} value={query} 
              onChange={(e) => setQuery(e.target.value)} className="p-2 rounded text-white font-semibold border-2"
              />
              <button type="submit" className="ml-2">
                <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer"/>
              </button>
            </form>

            <button onClick={toggleTheme}>
              {theme === "light" ? <MoonIcon className="h-6 w-6 cursor-pointer"/> : <SunIcon className="h-6 w-6 cursor-pointer"/>}
            </button>

            <button onClick={toggleLang} className="flex items-center cursor-pointer">
              <LanguageIcon className="h-6 w-6" />
              <span className="ml-1">{lang.toUpperCase()}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Menú desplegable (pantallas pequeñas) */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <input type="text" placeholder={t("search")} value={query} onChange={(e) => setQuery(e.target.value)}
              className="p-2 rounded text-white font-semibold border-2 w-full"/>
            <button type="submit" className="ml-2">
              <MagnifyingGlassIcon className="h-6 w-6 cursor-pointer"/>
            </button>
          </form>

          <button onClick={toggleTheme} className="flex items-center space-x-2">
            {theme === "light" ? <MoonIcon className="h-6 w-6 cursor-pointer"/> : <SunIcon className="h-6 w-6 cursor-pointer"/>}
            <span>{theme === "light" ? "Dark" : "Light"}</span>
          </button>

          <button onClick={toggleLang} className="flex items-center space-x-2">
            <LanguageIcon className="h-6 w-6 cursor-pointer"/>
            <span>{lang.toUpperCase()}</span>
          </button>
        </div>
      )}
    </nav>
  );
}