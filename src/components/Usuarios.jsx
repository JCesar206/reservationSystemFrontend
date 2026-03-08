import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Usuarios() {
	const [usuarios, setUsuarios] = useState([]);
	const [formData, setFormData] = useState({ nombre: "", email: "" });
	const [editingId, setEditingId] = useState(null);

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
		setFormData({...formData, [e.target.name]: e.target.value });
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

	const handleEdit = (usuario) => {
		setFormData({ nombre: usuario.nombre, email: usuario.email });
		setEditingId(usuario.id);
	};

	const handleDelete = async (id) => {
		try {
			await api.delete(`/usuarios/${id}`);
			fetchUsuarios;
		} catch (err) {
			console.error("❌ Error al eliminar usuario:", err);
		}
	};

	return (
		<div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
			<h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
				Usuarios
			</h2>

			{/* Formulario */}
			<form onSubmit={handleSubmit} className="mb-4 space-y-2">
				<input type="text" name="nombre" placeholder="Nombre" value={formData.nombre}
				onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
				<input type="email" name="email" placeholder="Correo" value={formData.email}
				onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required />
				<button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white font-semibold rounded cursor-pointer">
					{editingId ? "Actualizar Usuario" : "Crear Usuario"}
				</button>
			</form>

			{/* Tabla de Usuarios */}
			<table className="w-full border-collapse">
				<thead>
					<tr className="bg-gray-200 dark:bg-gray-700">
						<th className="border p-2">ID</th>
						<th className="border p-2">Nombre</th>
						<th className="border p-2">Email</th>
						<th className="border p-2">Acciones</th>
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
								className="px-2 py-1 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-700 cursor-pointer">
									Editar
								</button>
								<button onClick={() => handleDelete(u.id)}
								className="px-2 py-1 bg-red-500 text-white font-semibold rounded hover:bg-red-700 cursor-pointer">
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