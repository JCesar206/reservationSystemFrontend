import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const login = async ({ email, password }) => {
		try {
			const res = await api.post("/login", { email, password });
			localStorage.setItem("token", res.data.token);
			setUser(res.data.usuario);
			navigate("/reservas");
		} catch (err) {
			console.error("Error en login:", err);
			alert("Credenciales inválidas");
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		navigate("/login");
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);