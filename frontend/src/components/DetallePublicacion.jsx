import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { format } from "date-fns"; // Importa la función format
import { useAuth } from "./AuthContext";

const DetallePublicacion = () => {
  const { id } = useParams();
  const [publicacion, setPublicacion] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [nuevaRespuesta, setNuevaRespuesta] = useState("");
  const { user, isAuthenticated, setUser, setIsAuthenticated } = useAuth();

  useEffect(() => {
    // Restaurar la sesión al cargar la página
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken && storedUserId) {
      // Establecer la sesión del usuario utilizando la información almacenada
      setUser({ id: storedUserId }); // Puedes establecer otros datos relevantes aquí
      setIsAuthenticated(true);
      console.log("user logged" +id);
    }

    // Realiza una solicitud al servidor para obtener los detalles de la publicación por su ID
    fetch(`http://localhost:4000/publicacion/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error en la solicitud: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data recibida: ",data);
        setPublicacion(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });

    // Realiza una solicitud al servidor para obtener las respuestas a la publicación
    fetch(`http://localhost:4000/publicacion/${id}/respuestas`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error en la solicitud: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setRespuestas(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }, [id]);

  // Manejar el envío de una nueva respuesta
  // Enviar la nueva respuesta al servidor
  const enviarRespuesta = () => {
    // Validar que haya contenido en nuevaRespuesta
    if (!nuevaRespuesta.trim()) {
      // Puedes mostrar un mensaje de error o tomar otra acción apropiada aquí.
      return;
    }
  
    // Crear el objeto que contiene la respuesta y el ID del usuario
    const respuestaData = {
      contenido: nuevaRespuesta,
      usuarioId: user.id, // Aquí se incluye el ID del usuario
    };
  
    // Realizar la solicitud POST
    fetch(`http://localhost:4000/publicacion/${id}/respuestas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(respuestaData), // Envía el objeto con la respuesta y el ID del usuario
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error en la solicitud: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data a enviar: ",data);
        // Agregar la nueva respuesta a la lista de respuestas
        setRespuestas([...respuestas, data]);
        // Limpiar el campo de texto de nueva respuesta
        setNuevaRespuesta("");
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  };
  

  if (!publicacion) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="app-container">
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        <h2 className="text-4xl font-extrabold">{publicacion.titulo}</h2>
        <br />
        <p>{publicacion.contenido}</p>
        <p>Autor: {publicacion.nombreUsuario}</p>
        <p>Creada el: {publicacion.fechaCreacion}</p>
        {/* Mostrar otros detalles de la publicación */}
        <br />
        <div>
          <h2 className="text-4xl font-extrabold">Respuestas</h2>

          <div className="destacados-recientes w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            {respuestas.map((respuesta) => (
             
              <div
                className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-70 text-white mb-5"
                key={respuesta.id}
              >
                <p>
                 {respuesta.fechaCreacion}
                </p>
                <p>{respuesta.contenido}</p>
                <p>{respuesta.nombreUsuario}</p>
              </div>
            ))}
          </div>

          <br />

          <form>
            <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  rows="4"
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write a comment..."
                  value={nuevaRespuesta}
                  onChange={(e) => setNuevaRespuesta(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                  onClick={enviarRespuesta}
                >
                  Post comment
                </button>
                <div className="flex pl-0 space-x-1 sm:pl-2">
                  <button
                    type="button"
                    className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 12 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                      />
                    </svg>
                    <span className="sr-only">Attach file</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    <span className="sr-only">Set location</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                  >
                    <svg
                      className="w-4 h-4"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                    <span className="sr-only">Upload image</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
            Remember, contributions to this topic should follow our{" "}
            <a
              href="#"
              className="text-blue-600 dark:text-blue-500 hover:underline"
            >
              Community Guidelines
            </a>
            .
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetallePublicacion;
