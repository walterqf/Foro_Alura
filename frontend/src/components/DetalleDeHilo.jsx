import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
const DetalleDeHilo = () => {
  const { id } = useParams();
  const [hilo, setHilo] = useState(null);

  useEffect(() => {
    // Realiza una solicitud al servidor para obtener los detalles del hilo por su ID
    fetch(`http://localhost:4000/hilos/${id}`)
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
        setHilo(data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
  }, [id]);

  if (!hilo) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="app-container">
      <Navbar />
      <div style={{ minHeight: "100vh" }}>
        <h2>{hilo.titulo}</h2>
        <p>{hilo.contenido}</p>
        {/* Mostrar otros detalles del hilo */}
      </div>
      <Footer />
    </div>
  );
};

export default DetalleDeHilo;
