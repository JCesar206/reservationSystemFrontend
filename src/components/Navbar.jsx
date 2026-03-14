import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon, MagnifyingGlassIcon, LanguageIcon } from "@heroicons/react/24/outline";
import { IoIosLogOut } from "react-icons/io";
import { useTranslation } from "react-i18next";

export default function Navbar({ onSearch }) {
  const { theme, toggleTheme, lang, toggleLang } = useAppContext();
  const { logout } = useAuth();
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
    <nav className="bg-blue-600 dark:bg-gray-900 text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-8">
        {/* Contenedor principal */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-1xl font-bold p-2">
            <Link to="/">{t("system")}</Link>
          </div>

          {/* Botón hamburguesa (solo móvil) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="transition-transform duration-300 ease-in-out cursor-pointer"
            >
              {menuOpen ? (
                <XMarkIcon className="h-6 w-6 transform rotate-180 transition duration-300"/>
              ) : (
                <Bars3Icon className="h-6 w-6 transform rotate-0 transition duration-300"/>
              )}
            </button>
          </div>

          {/* Menú horizontal (pantallas grandes) */}
          <div className="hidden md:flex md:items-center md:space-x-12 transition-all duration-500 ease-in-out">
            <Link to="/" className="hover:underline transition-colors duration-300">{t("users")}</Link>
            <Link to="/recursos" className="hover:underline transition-colors duration-300">{t("resources")}</Link>
            <Link to="/reservas" className="hover:underline transition-colors duration-300">{t("bookings")}</Link>
            <Link to="/login" className="hover:underline transition-colors duration-300">{t("login")}</Link>
            <Link to="/reset" className="hover:underline transition-colors duration-300">{t("reset")}</Link>

            <form onSubmit={handleSearch} className="flex items-center ml-6">
              <input type="text" placeholder={t("search")} value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="p-2 rounded text-black font-semibold transition duration-300 focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-200"
              />
              <button type="submit" className="ml-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
                <MagnifyingGlassIcon className="h-6 w-6"/>
              </button>
            </form>

            <button onClick={toggleTheme} className="ml-6 transition-transform duration-300 hover:scale-110 cursor-pointer">
              {theme === "light" ? <MoonIcon className="h-6 w-6"/> : <SunIcon className="h-6 w-6"/>}
            </button>

            <button onClick={toggleLang} className="flex items-center ml-4 transition-transform duration-300 hover:scale-110 cursor-pointer">
              <LanguageIcon className="h-6 w-6"/>
              <span className="ml-1">{lang.toUpperCase()}</span>
            </button>

            <button onClick={logout} className="ml-4 transition-transform duration-300 hover:scale-110 cursor-pointer">
              {t("logout")}<IoIosLogOut size={18}/>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay + Menú desplegable (pantallas pequeñas) */}
      {menuOpen && (
        <div className="fixed inset-0 md:hidden z-40">
          {/* Overlay clicable fuera del menú */}
          <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm transition-opacity duration-500 ease-in-out" onClick={() => setMenuOpen(false)}/>

          {/* Menú lateral */}
          <div className="absolute top-0 left-0 w-3/4 h-full bg-blue-700 dark:bg-gray-800 text-white p-6 transform transition-transform duration-500 ease-in-out translate-x-0"
          onClick={(e) => e.stopPropagation()} // 👈 Evita que clicks dentro cierren el menú
          >
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={() => setMenuOpen(false)} className="hover:underline transition-colors duration-300">{t("users")}</Link>
              <Link to="/recursos" onClick={() => setMenuOpen(false)} className="hover:underline transition-colors duration-300">{t("resources")}</Link>
              <Link to="/reservas" onClick={() => setMenuOpen(false)} className="hover:underline transition-colors duration-300">{t("bookings")}</Link>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:underline transition-colors duration-300">{t("login")}</Link>
              <Link to="/reset" onClick={() => setMenuOpen(false)} className="hover:underline transition-colors duration-300">{t("reset")}</Link>

              <form onSubmit={handleSearch} className="flex items-center mt-4">
                <input type="text" placeholder={t("search")} value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="p-2 rounded text-white font-semibold border-2 w-full transition duration-300 focus:ring-2 focus:ring-blue-400 cursor-pointer"
                />
                <button type="submit" className="ml-2 transition-transform duration-300 hover:scale-110 cursor-pointer">
                  <MagnifyingGlassIcon className="h-6 w-6"/>
                </button>
              </form>

              <button onClick={toggleTheme} className="flex items-center space-x-2 mt-4 transition-transform duration-300 hover:scale-105 cursor-pointer">
                {theme === "light" ? <MoonIcon className="h-6 w-6"/> : <SunIcon className="h-6 w-6"/>}
                <span>{theme === "light" ? t("dark") : t("light")}</span>
              </button>

              <button onClick={toggleLang} className="flex items-center space-x-2 mt-2 transition-transform duration-300 hover:scale-105 cursor-pointer">
                <LanguageIcon className="h-6 w-6"/>
                <span>{lang.toUpperCase()}</span>
              </button>

              <button onClick={logout} className="ml-4 transition-transform duration-300 hover:scale-110 cursor-pointer">
              {t("logout")}<IoIosLogOut size={18}/>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}