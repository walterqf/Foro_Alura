import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "./AuthContext";
import { useNavigate, Link } from "react-router-dom";

function InicioSesion() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const navigate = useNavigate();
  //const history = useHistory(); // Obtiene el objeto history

  //const { login } = useAuth();

  useEffect(() => {
    // Recuperar el nombre de usuario almacenado en localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogin = async () => {
    console.log("Username:", username);
    console.log("Password:", password);
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token, username, userId } = await response.json(); // Incluye userId en la respuesta
        // Almacena el nombre de usuario, el token y el userId en localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("authToken", token);
        localStorage.setItem("userId", userId); // Almacenar el ID de usuario en localStorage
        // Llama a la función login con el token, nombre de usuario y userId
        login(token, username, userId);
        // Redirige al usuario a la raíz después del inicio de sesión exitoso
        navigate("/");
      } else {
        console.error("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div
        className="flex flex-col cols-20 items-center justify-center"
        style={{ minHeight: "100vh" }}
      >
        <form
          className="bg-white p-6 rounded-lg shadow-md max-w-md"
          style={{ minWidth: "50vh" }}
        >
          <div class="flex justify-center mt-6">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Ingrese sus datos:
            </h1>
          </div>
          <br></br>
          <div class="mb-6">
            <label
              for="username" // Cambiado a "username" en lugar de "email"
              class="block mb-2 text-sm font-medium"
            >
              Username:
            </label>
            <input
              type="text" // Cambiado a "text" para un campo de texto normal
              id="username" // Cambiado a "username" en lugar de "email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your username"
              required
              // Mantener como "username"
              onChange={(e) => setUsername(e.target.value)} // Mantener como "setUsername"
            />
          </div>

          <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium">
              Password:
            </label>
            <input
              type="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>

          <div>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/registro"
                class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Signup here!
              </Link>
            </p>
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="button" // Cambiado a "button" para prevenir el envío del formulario
              className="mx-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default InicioSesion;
