import { createContext, useState, useContext, useEffect } from "react";
import i18n from "../i18.js";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("es");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleLang = () => setLang(lang === "es" ? "en" : "es");
	
	useEffect(() => {
		i18n.changeLanguage(lang);
	}, [lang]);

  useEffect(() => {
		if (theme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [theme]);

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang }}>
      <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>  {children}
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
