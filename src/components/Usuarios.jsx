import { useEffect, useState, useRef } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import api from "../services/api";
import { useTranslation } from "react-i18next";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({ nombre: "", email: "" });
  const [editingId, setEditingId] = useState(null);
	const nombreRef = useRef(null);
  const { t } = useTranslation();

  // Cargar usuarios al inicio
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const res = await api.get("/usuarios");
      setUsuarios(res.data);
    } catch (err) {
      console.error("❌ Error al cargar usuarios:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/usuarios/${editingId}`, formData);
        setEditingId(null);
      } else {
        await api.post("/usuarios", formData);
      }
      setFormData({ nombre: "", email: "" });
      fetchUsuarios();
    } catch (err) {
      console.error("❌ Error al guardar usuario:", err);
    }
  };

	const handleClear = () => {
		setFormData({ nombre: "", email: "" });
		setEditingId(null);
		nombreRef.current?.focus();
	};

  const handleEdit = (usuario) => {
    setFormData({ nombre: usuario.nombre, email: usuario.email });
    setEditingId(usuario.id);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/usuarios/${id}`);
      fetchUsuarios();
    } catch (err) {
      console.error("❌ Error al eliminar usuario:", err);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {t("users")}
      </h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <input ref={nombreRef} type="text" name="nombre" placeholder={t("name")} value={formData.nombre}
          onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <input type="email" name="email" placeholder={t("email")} value={formData.email}
          onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
          required
        />
        <button type="submit"
				className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 cursor-pointer"
        >
          {editingId ? t("updateUser") : t("createUser")}
        </button>
				<button type="button" onClick={handleClear} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 ml-2 cursor-pointer">
					{t("clear")}
				</button>
      </form>

      {/* Tabla de usuarios */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="border p-2">ID</th>
            <th className="border p-">{t("name")}</th>
            <th className="border p-2">{t("email")}</th>
            <th className="border p-2">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} className="text-gray-900 dark:text-gray-100">
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.nombre}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(u)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 cursor-pointer"
                >
                  <CiEdit size={16}/>{t("edit")}
                </button>
                <button onClick={() => handleDelete(u.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
                >
                  <MdDelete size={16}/>{t("delete")}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}