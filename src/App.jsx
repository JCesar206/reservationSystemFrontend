import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoutes from "./components/ProtectedRoute";
import Usuarios from "./components/Usuarios";
import Recursos from "./components/Recursos";
import Reservas from "./components/Reservas";
import Footer from "./components/Footer";
import "./App.css";

function AppContent() {
  const { user } = useAuth();
  
  return (
    <>
    {user && <Navbar />} {/* Navbar solo aparece si hay sesión */}
    <main className="container mx-auto p-4 min-h-screen">
      <Routes>
        {/* Pantalla Login */}
        <Route path="/login" element={<Login/>}/>
        <Route path="/reset" element={<ResetPassword/>}/>

        {/* Si hay sesión, cualquier ruta redirige a Login */}
        <Route path="/" element={<ProtectedRoutes><Usuarios/></ProtectedRoutes>}/>
        <Route path="/recursos" element={<ProtectedRoutes><Recursos/></ProtectedRoutes>}/>
        <Route path="/reservas" element={<ProtectedRoutes><Reservas/></ProtectedRoutes>}/>
        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/login" replace/>}/>
      </Routes>
    </main>
    {user && <Footer/>} {/* Footer solo si hay sesión */}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </Router>
  );
}