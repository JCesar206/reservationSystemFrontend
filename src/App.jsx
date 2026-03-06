import Usuarios from "./components/Usuarios";
import "./App.css";

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-400">Sistema de Reservas</h1>
      <Usuarios />
    </div>
  );
}

export default App;