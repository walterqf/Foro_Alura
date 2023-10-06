import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "./AuthContext";

const Inicio = () => {
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useAuth(); // Agrega isAuthenticated aquí
  const [hilosDestacados, setHilosDestacados] = useState([]);
  const [publicacionesDestacadas, setPublicacionesDestacadas] = useState([]);
  const navigate = useNavigate();

  async function obtenerDatosInicio() {
    try {
      const res = await fetch("http://localhost:4000/inicio-data");
      if (!res.ok) {
        throw new Error(
          `Error en la solicitud: ${res.status} ${res.statusText}`
        );
      }
      const data = await res.json();
      setHilosDestacados(data.hilosDestacados);
      setPublicacionesDestacadas(data.publicacionesDestacadas);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  }

  useEffect(() => {
    obtenerDatosInicio();

    // Recuperar el nombre de usuario y el token almacenados en localStorage
    const storedUsername = localStorage.getItem("username");
    const storedToken = localStorage.getItem("authToken");

    if (storedUsername && storedToken) {
      setUser({ username: storedUsername });
      setIsAuthenticated(true);
      //console.log("Aqui: ", user.id);
    }
  }, [setUser, setIsAuthenticated]);
  const handleCrearPublicacion = () => {
    // Redirecciona a la página de creación de publicación y hace un refresh
    navigate("/crear-publicacion");
    window.location.reload();
  };

  const handlePublicacionClick = (publicacionId) => {
    // Redirige a la página de la publicación y hace un refresh
    window.location.href = `/publicacion/${publicacionId}`;
  };

  const handleHiloClick = (hiloId) => {
    // Redirige a la página de la publicación y hace un refresh
    window.location.href = `/hilo/${hiloId}`;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main
        className="flex flex-col cols-20  pt-4"
        style={{ minHeight: "100vh" }}
      >
        <div className="p-4">
          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tigh">
              Bienvenido a la Comunidad
            </h1>
          </div>
          <br></br>
          <div className="llamado-a-la-accion w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            {user ? (
              <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">
                ¡Hola, {user.username || ""}!
              </p>
            ) : (
              <>
                <p className="mb-3 text-lg text-gray-500 md:text-xl dark:text-gray-400">
                  ¿Listo para unirte?
                </p>
                <Link to="/registro">
                  <button>Regístrate</button>
                </Link>
                &nbsp;
                <Link to="/iniciar-sesion">
                  <button>Inicia Sesión</button>
                </Link>
              </>
            )}
            <br></br>
            <p className="mb-3 text-gray-500 dark:text-gray-400">Explora y participa en conversaciones interesantes</p>
          </div>

          <br></br>
          <div className="destacados-recientes w-full p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h2 className="text-4xl font-extrabold dark:text-white">Hilos</h2>
            <ul>
              
            {hilosDestacados && hilosDestacados.length > 0 ? (
                hilosDestacados.map((hilo) => (
                  <li
                    key={hilo.id}
                    onClick={() => handleHiloClick(hilo.id)}
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    {hilo.titulo}
                  </li>
                ))
              ) : (
                <p>No hay categorías destacadas disponibles.</p>
              )}

            </ul>
          </div>
          <br></br>
          <div className="publicaciones-destacadas w-full p-4  bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl font-extrabold dark:text-white">
                Publicaciones Destacadas
              </h2>
              <button
                type="button"
                onClick={handleCrearPublicacion}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                +
              </button>
            </div>
            <ul>
              {publicacionesDestacadas && publicacionesDestacadas.length > 0 ? (
                publicacionesDestacadas.map((publicacion) => (
                  <li
                    key={publicacion.id}
                    onClick={() => handlePublicacionClick(publicacion.id)}
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    {publicacion.titulo}
                  </li>
                ))
              ) : (
                <p>No hay categorías destacadas disponibles.</p>
              )}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inicio;
