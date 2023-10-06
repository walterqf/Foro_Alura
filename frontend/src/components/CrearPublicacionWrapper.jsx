import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CrearPublicacion from "./CrearPublicacion";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log("usuario autenticado con el ", isAuthenticated);
  return <>{children}</>; // Renderiza los hijos (en este caso, CrearPublicacion) si el usuario está autenticado
};

const CrearPublicacionWrapper = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [componentLoaded, setComponentLoaded] = useState(false);

  useEffect(() => {
    // Verificar la autenticación después de que el componente se ha renderizado completamente
    if (componentLoaded) {
        console.log("Verificación de autenticación:", isAuthenticated);
        if (!isAuthenticated) {
          navigate("/iniciar-sesion");
        }
    }
  }, [isAuthenticated, navigate, componentLoaded]);

  // Función que se llama cuando el componente se ha cargado completamente
  const handleComponentLoad = () => {
    setComponentLoaded(true);
  };

  return (
    <ProtectedRoute>
      <CrearPublicacion onLoad={handleComponentLoad} />
    </ProtectedRoute>
  );
};

export default CrearPublicacionWrapper;
