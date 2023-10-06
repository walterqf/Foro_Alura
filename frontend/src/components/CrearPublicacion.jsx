import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CrearPublicacion = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [publicationData, setPublicationData] = useState({
    titulo: "",
    contenido: "",
    hiloId: "", // Inicializado como un valor vacío
  });

  const [loading, setLoading] = useState(false);
  const [hilos, setHilos] = useState([]);

  useEffect(() => {
    const fetchHilos = async () => {
      try {
        const response = await fetch("http://localhost:4000/inicio-data", {
          method: "GET",
        });

        if (response.ok) {
          const data = await response.json();
          setHilos(data.hilosDestacados);
        } else {
          console.error("Error al obtener la lista de hilos.");
        }
      } catch (error) {
        console.error("Error al obtener la lista de hilos:", error);
      }
    };

    fetchHilos();
  }, []);

  useEffect(() => {
    const checkAuthentication = () => {
      if (!isAuthenticated) {
        console.log("Usuario no autenticado. Redirigiendo a iniciar-sesion.");
        navigate("/iniciar-sesion");
      }
    };

    window.onload = checkAuthentication;
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Campo ${name} actualizado con valor: ${value}`);
    setPublicationData({
      ...publicationData,
      [name]: value,
    });
  };

  const handleHiloChange = (e) => {
    const { value } = e.target;
    console.log(`Hilo seleccionado: ${value}`);
    setPublicationData({
      ...publicationData,
      hiloId: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user || !user.token) {
      console.log("Usuario no autenticado.");
      setLoading(false);
      return;
    }

    console.log("Datos de publicación a enviar:", publicationData);
    try {
      const response = await fetch("http://localhost:4000/publicacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          ...publicationData,
          fecha_creacion: new Date().toISOString(),
          usuarioId: user.id,
        }),
      });

      if (response.ok) {
        console.log("Publicación creada con éxito.");
        setPublicationData({ titulo: "", contenido: "", hiloId: "" });
        navigate("/");
      } else {
        console.error("Error al crear la publicación.");
      }
    } catch (error) {
      console.error("Error al crear la publicación:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <Navbar />
      <section class="bg-white dark:bg-gray-900" style={{ minHeight: "100vh" }}>
        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
          <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new publication
          </h2>
          <form action="#" onSubmit={handleSubmit}>
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div class="sm:col-span-2">
                <label
                  for="titulo"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Publish Title
                </label>
                <input
                  type="text"
                  id="titulo"
                  name="titulo"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type your publish title"
                  value={publicationData.titulo}
                  onChange={handleChange}
                  required=""
                />
              </div>
              <div class="sm:col-span-2">
                <label
                  for="contenido"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Publish Content
                </label>
                <textarea
                  id="contenido"
                  name="contenido"
                  rows="8"
                  style={{ resize: "none" }}
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Your description here"
                  value={publicationData.contenido}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div>
                <label
                  for="hilo_id"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Threads
                </label>
                <select
                  id="hilo_id"
                  name="hiloId"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={publicationData.hiloId}
                  onChange={handleHiloChange}
                  required
                >
                  <option value="">Selecciona un hilo</option>
                  {hilos.map((hilo) => (
                    <option key={hilo.id} value={hilo.id}>
                      {hilo.titulo}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <br></br>
            <button
              type="submit"
              disabled={loading}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Publication
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CrearPublicacion;
