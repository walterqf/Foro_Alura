import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      element={isAuthenticated ? <Component /> : <Navigate to="/iniciar-sesion" />}
    />
  );
}

export default PrivateRoute;
