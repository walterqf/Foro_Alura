import { createContext, useContext, useState, useEffect } from "react";

// Función para decodificar un token (puedes ajustarla según tu implementación)
const decodeToken = (token) => {
  const tokenData = token.split(".")[1];
  const decodedData = atob(tokenData);
  return JSON.parse(decodedData);
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token almacenado en localStorage al cargar la página
    const storedToken = localStorage.getItem("authToken");
    const storedUsername = localStorage.getItem("username");
    const storedUserId = localStorage.getItem("userId"); // Obtener el ID de usuario

    console.log("Stored token:", storedToken);
    console.log("Stored username:", storedUsername);
    console.log("Stored userId:", storedUserId);

    if (storedToken && storedUsername) {
      // Decodificar el token y verificar su validez si es necesario
      const decodedToken = decodeToken(storedToken);

      // Comprobar si el token está vencido y manejarlo adecuadamente

      // Establecer el usuario autenticado con el token, nombre de usuario e ID
      setUser({
        token: storedToken,
        username: storedUsername,
        id: storedUserId,
      });

      // Configurar isAuthenticated como true al cargar si hay un token válido
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token, username, userId) => {
    // Almacenar el token, el nombre de usuario y el ID de usuario en localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId); // Agregar esta línea para almacenar el ID de usuario

    // Establecer el usuario autenticado con el token, nombre de usuario e ID
    setUser({ token, username, id: userId });

    // Configurar isAuthenticated como true al iniciar sesión
    setIsAuthenticated(true);

    console.log("User authenticated:", username);
    console.log("User ID:", userId);
  };

  const logout = () => {
    // Eliminar el token de autenticación y el nombre de usuario al cerrar sesión
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId"); // Eliminar también el ID de usuario

    // Configurar isAuthenticated como false al cerrar sesión
    setIsAuthenticated(false);

    // Limpiar el estado del usuario
    setUser(null);

    console.log("User logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
