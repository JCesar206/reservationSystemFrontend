import { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Usuarios() {
	const [usuarios, setUsuarios] = useState([]);

	useEffect(() => {
		api.get("/usuarios")
		.then(res => setUsuarios(res.data))
		.catch(err => console.error("Error:", err));
	}, []);

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-2">Usuarios</h2>
			<ul className="list-disc pl-5">
				{usuarios.map(u => (
					<li key={u.id}>{u.nombre} - {u.email}</li>
				))}
			</ul>
		</div>
	);
}