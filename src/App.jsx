import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Usuarios from "./components/Usuarios";
import Recursos from "./components/Recursos";
import Reservas from "./components/Reservas";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("es");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

  return (
    <div className={theme}>
      <Navbar onThemeToggle={toggleTheme} onLangToggle={toggleLang} onSearch={(q) => console.log("Buscar:", q)} />
      <main className="container mx-auto p-4 space-y-6">
        <Usuarios />
        <Recursos />
        <Reservas />
      </main>
      <Footer />
    </div>
  );
}

export default App;