import { useState } from "react";
import { FaSun, FaMoon, FaSearch, FaEnvelope } from "react-icons/fa";
// import { BsTranslate } from "react-icons/bs";

export default function Navbar({ onThemeToggle, onLangToggle, onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-600 dark:bg-gray-900 text-white">
      <h1 className="text-xl font-bold">Sistema de Reservas</h1>

      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="flex items-center">
        <input
          type="text"
          placeholder="Buscar reserva..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded text-white font-semibold border-2"
        />
        <button type="submit" className="ml-2">
          <FaSearch size={18} className="cursor-pointer"/>
        </button>
      </form>

      {/* Controles */}
      <div className="flex space-x-4">
        <button onClick={onThemeToggle}>
          <FaSun size={18} className="cursor-pointer"/>
          <FaMoon size={18} className="cursor-pointer"/>
        </button>
        <button onClick={onLangToggle}>
          <FaEnvelope size={18} className="cursor-pointer"/>
        </button>
      </div>
    </nav>
  );
}