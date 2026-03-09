import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Login() {
	const { t } = useTranslation();
	const [formData, setFormData] = useState({ email: "", password: "" });

	const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value });
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Login:", formData);
	};

	return (
		<div className="p-4 bg-white dark:bg-gray-800 rounded shadow max-w-md mx-auto">
			<h2 className="text-xl font-bold mb-4">{t("login")}</h2>
			<form onSubmit={handleSubmit} className="space-y-2">
				<input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required/>
				<input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required/>
				<button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 cursor-pointer">
					{t("longin")}
				</button>
			</form>
		</div>
	);
}