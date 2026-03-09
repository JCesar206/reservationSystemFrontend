import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
	es: {
		translation: {
			users: "Usuarios",
			resources: "Recursos",
			reservations: "Reservas",
			login: "Iniciar sesión",
			reset: "Restablecer contraseña",
			system: "Sistema de Reservas",
			search: "Buscar reserva...",
			search1: "Buscar",
			createUser: "Crear usuario",
			clear: "Limpiar",
			name: "Nombre",
			email: "Correo",
			actions: "Acciones",
			resourceName: "Nombre del recurso",
			resourceType: "Tipo del recurso (Ej.: PC, Sala)",
			createResource: "Crear recurso",
			type: "Tipo",
			edit: "Editar",
			delete: "Eliminar",
			selectUser: "Seleccionar usuario",
			selectResource: "Seleccionar recurso",
			createReservation: "Crear reservación",
			date: "Fecha",
			user: "Usuario",
			resource: "Recurso",
			copyright: "Sistema de Reservaciones V1.0",
			rights: "Todos los derechos reservados."
		}
	},
	en: {
		translation: {
			users: "Users",
			resources: "Resources",
			reservations: "Bookings",
			login: "Login",
			reset: "Reset password",
			system: "Reservation System",
			search: "Search reservation...",
			search1: "Find",
			createUser: "Create user",
			clear: "Clear",
			name: "Name",
			email: "Email",
			actions: "Actions",
			resourceName: "Resource name",
			resourceType: "Resource type (Ex.: PC, Hall)",
			createResource: "Create resource",
			type: "Type",
			edit: "Edit",
			delete: "Delete",
			selectUser: "Select user",
			selectResource: "Select resource",
			createReservation: "Create reservation",
			date: "Date",
			user: "User",
			resource: "Resource",
			copyright: "System Reservation V1.0",
			rights: "All right reserved."
		}
	}
};

i18n.use(initReactI18next).init({
	resources,
	lng: "es",
	interpolation: { escapeValue: false }
});

export default i18n;