import { useEffect, useState } from "react";
import api from "../services/api";

export default function Recursos() {
  const [recursos, setRecursos] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", tipo: "" });
  const [editingId, setEditingId] = useState(null);

  // Cargar recursos al inicio
  useEffect(() => {
    fetchRecursos();
  }, []);

  const fetchRecursos = async () => {
    try {
      const res = await api.get("/recursos");
      setRecursos(res.data);
    } catch (err) {
      console.error("❌ Error al cargar recursos:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/recursos/${editingId}`, formData);
        setEditingId(null);
      } else {
        await api.post("/recursos", formData);
      }
      setFormData({ nombre: "", tipo: "" });
      fetchRecursos();
    } catch (err) {
      console.error("❌ Error al guardar recurso:", err);
    }
  };

  const handleEdit = (recurso) => {
    setFormData({ nombre: recurso.nombre, tipo: recurso.tipo });
    setEditingId(recurso.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/recursos/${id}`);
      fetchRecursos();
    } catch (err) {
      console.error("❌ Error al eliminar recurso:", err);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Recursos
      </h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input type="text" name="nombre" placeholder="Nombre del recurso" value={formData.nombre}
          onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <input type="text" name="tipo" placeholder="Tipo (ej. Sala, PC)" value={formData.tipo}
          onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 cursor-pointer"
        >
          {editingId ? "Actualizar Recurso" : "Crear Recurso"}
        </button>
      </form>

      {/* Tabla de recursos */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border p-2">ID</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {recursos.map((r) => (
            <tr key={r.id} className="text-gray-900 dark:text-gray-100">
              <td className="border p-2">{r.id}</td>
              <td className="border p-2">{r.nombre}</td>
              <td className="border p-2">{r.tipo}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(r)}
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 cursor-pointer"
                >
                  Editar
                </button>
                <button onClick={() => handleDelete(r.id)}
                className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-800 cursor-pointer"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
