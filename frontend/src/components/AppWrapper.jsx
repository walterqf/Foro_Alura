import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes"; // Importa tu componente de rutas personalizado

function AppWrapper() {
  const { setUser } = useAuth();

  useEffect(() => {
    // Verificar el token al cargar la página
    const storedToken = localStorage.getItem("authToken");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setUser({ token: storedToken, username: storedUsername });
    }
  }, [setUser]);

  return (
    <Router> {/* Envuelve tu aplicación con Router */}
    <AppRoutes />
  </Router>
  );
}

export default AppWrapper;
