import React from "react";
import { Routes, Route } from "react-router-dom";
import Inicio from "./Inicio"; // Importa tus componentes para cada ruta
import Registro from "./Registro";
import InicioSesion from "./InicioSesion";
import PerfilUsuario from "./PerfilUsuario";
import ListaDeHilos from "./ListaDeHilos";
import CrearHilo from "./CrearHilo";
import DetalleDeHilo from "./DetalleDeHilo";
import DetallePublicacion from "./DetallePublicacion";
import About from "./About";
import Contact from "./Contact";
import Team from "./Team";
import CrearPublicacion from "./CrearPublicacion";
import CrearPublicacionWrapper from "./CrearPublicacionWrapper";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/iniciar-sesion" element={<InicioSesion />} />
      <Route path="/hilos" element={<ListaDeHilos />} />
      <Route path="/crear-hilo" element={<CrearHilo />} />
      <Route path="/hilo/:id" element={<DetalleDeHilo />} />
      <Route path="/publicacion/:id" element={<DetallePublicacion />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/team" element={<Team />} />
      <Route path="/perfil" element={<PerfilUsuario />} />
      <Route path="/crear-publicacion" element={<CrearPublicacion />} />
      {/* Otras rutas */}
    </Routes>
  );
}

export default AppRoutes;
