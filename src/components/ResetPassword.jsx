import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ResetPassword() {
	const { t } = useTranslation();
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Reset password for:", email);
	};

	return (
		<div className="p-4 bg-white dark:bg-gray-800 rounded shadow max-w-md mx-auto">
			<h2 className="text-xl font-bold mb-4">{t("reset")}</h2>
			<form onSubmit={handleSubmit} className="space-y-2">
				<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
				className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white" required/>
				<button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800 cursor-pointer">
					{t("reset")}
				</button>
			</form>
		</div>
	);
}