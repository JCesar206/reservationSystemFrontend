import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import { useTranslation} from "react-i18next";

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [recursos, setRecursos] = useState([]);
  const [formData, setFormData] = useState({ fecha: "", UsuarioId: "", RecursoId: "" });
  const [editingId, setEditingId] = useState(null);
  const { t } = useTranslation();
  const fechaRef = useRef(null);

  // Cargar datos al inicio
  useEffect(() => {
    fetchReservas();
    fetchUsuarios();
    fetchRecursos();
  }, []);

  const fetchReservas = async () => {
    try {
      const res = await api.get("/reservas");
      setReservas(res.data);
    } catch (err) {
      console.error("❌ Error al cargar reservas:", err);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const res = await api.get("/usuarios");
      setUsuarios(res.data);
    } catch (err) {
      console.error("❌ Error al cargar usuarios:", err);
    }
  };

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
        await api.put(`/reservas/${editingId}`, formData);
        setEditingId(null);
      } else {
        await api.post("/reservas", formData);
      }
      setFormData({ fecha: "", UsuarioId: "", RecursoId: "" });
      fetchReservas();
    } catch (err) {
      console.error("❌ Error al guardar reserva:", err);
    }
  };

  const handleClear = () => {
    setFormData({ fecha: "", UsuarioId: "", RecursoId: "" });
    setEditingId(null);
    fechaRef.current?.focus();
  };

  const handleEdit = (reserva) => {
    setFormData({
      fecha: reserva.fecha,
      UsuarioId: reserva.UsuarioId,
      RecursoId: reserva.RecursoId,
    });
    setEditingId(reserva.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/reservas/${id}`);
      fetchReservas();
    } catch (err) {
      console.error("❌ Error al eliminar reserva:", err);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {t("reservations")}
      </h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input type="datetime-local" name="fecha" value={formData.fecha} onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required
        />

        <select name="UsuarioId" value={formData.UsuarioId} onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required
        >
          <option value="">{t("selectUser")}</option>
          {usuarios.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nombre} ({u.email})
            </option>
          ))}
        </select>

        <select name="RecursoId" value={formData.RecursoId} onChange={handleChange}
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required
        >
          <option value="">{t("selectResource")}</option>
          {recursos.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nombre} ({r.tipo})
            </option>
          ))}
        </select>

        <div className="flex space-x-2">
          <button type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-800 cursor-pointer"
          >
            {editingId ? t("updatedReservation") : t("createReservation")}
          </button>
          <button type="button" onClick={handleClear} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 cursor-pointer">
          {t("clear")}
          </button>
        </div>
      </form>

      {/* Tabla de reservas */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border p-2">ID</th>
            <th className="border p-2">{t("date")}</th>
            <th className="border p-2">{t("user")}</th>
            <th className="border p-2">{t("resource")}</th>
            <th className="border p-2">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((res) => (
            <tr key={res.id} className="text-gray-900 dark:text-gray-100">
              <td className="border p-2">{res.id}</td>
              <td className="border p-2">{new Date(res.fecha).toLocaleString()}</td>
              <td className="border p-2">{res.Usuario?.nombre}</td>
              <td className="border p-2">{res.Recurso?.nombre}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(res)}
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
                >
                  {t("edit")}
                </button>
                <button
                  onClick={() => handleDelete(res.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                >
                  {t("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
