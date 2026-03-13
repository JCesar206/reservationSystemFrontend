import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

export default function Login() {
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { t } = useTranslation();
	// const [formData, setFormData] = useState({ email: "", password: "" });

	// const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value });
	const handleSubmit = (e) => {
		e.preventDefault();
		login({ email, password });
		console.log("Login:", formData);
	};

	return (
		<div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
			<h2 className="text-2xl font-bold mb-4">{t("login")}</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input type="email" placeholder="Email" value={email}
				onChange={(e) => setEmail(e.target.value)}
				className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required/>

				<input type="password" name="password" placeholder="Password" value={password} 
				onChange={(e) => setPassword(e.target.value)}
				className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required/>
				<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 cursor-pointer">
					{t("login")}
				</button>
			</form>
		</div>
	);
}