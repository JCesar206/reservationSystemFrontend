import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Usuarios from "./components/Usuarios";
import Recursos from "./components/Recursos";
import Reservas from "./components/Reservas";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import "./App.css";

function App() {
  const [theme, setTheme] = useState("light");
  const [lang, setLang] = useState("es");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleLang = () => setLang(lang === "es" ? "en" : "es");

  return (
    <Router>
    {/* <div className={theme}> */}
      <Navbar onThemeToggle={toggleTheme} onLangToggle={toggleLang} onSearch={(q) => console.log("Buscar:", q)} />
      <main className="container mx-auto p-4 min-h-screen">
        <Routes>
          <Route path="/" element={<Usuarios/>}/>
          <Route path="/recursos" element={<Recursos/>}/>
          <Route path="/reservas" element={<Reservas/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/reset" element={<ResetPassword/>}/>
        </Routes>
      </main>
      <Footer />
    {/* </div> */}
    </Router>
  );
}

export default App;