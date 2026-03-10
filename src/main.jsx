import { AppProvider } from "./context/AppContext.jsx";
import { createRoot } from "react-dom/client";
import "./i18.js";
import App from "./App.jsx";
// import "./index.css";

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <App />
  </AppProvider>,
<<<<<<< HEAD
);
=======
);
>>>>>>> feature/app
