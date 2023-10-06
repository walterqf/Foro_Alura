import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Inicio from "./components/Inicio";
import Registro from "./components/Registro";
import InicioSesion from "./components/InicioSesion";
import PerfilUsuario from "./components/PerfilUsuario";
import ListaDeHilos from "./components/ListaDeHilos";
import CrearHilo from "./components/CrearHilo";
import DetalleDeHilo from "./components/DetalleDeHilo";
import DetallePublicacion from "./components/DetallePublicacion";
import About from "./components/About";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Contact from "./components/Contact";
import Team from "./components/Team";
import CrearPublicacion from "./components/CrearPublicacion";

function PrivateRoute({ element }) {
  const navigate = useNavigate();
  const {  user, isAuthenticated, setUser, setIsAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate("/iniciar-sesion");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? element : null;
}

function App() {
  const { isAuthenticated, setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      setUser({ token: storedToken, username: storedUsername });
    }

    setLoading(false);
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/iniciar-sesion" element={<InicioSesion />} />
          <Route path="/hilos" element={<ListaDeHilos />} />
          <Route path="/crear-hilo" element={<CrearHilo />} />
          <Route path="/hilo/:id" element={<DetalleDeHilo />} />
          <Route path="/publicacion/:id" element={<PrivateRoute element={<DetallePublicacion/>} />}/>
          <Route
            path="/publicacion/:id/respuestas"
            element={<DetallePublicacion/>}
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/perfil"
            element={<PrivateRoute element={<PerfilUsuario />} />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/team" element={<Team />} />
          <Route
            path="/crear-publicacion"
            element={<PrivateRoute element={<CrearPublicacion />} />}
          />
          {/* Otras rutas */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
