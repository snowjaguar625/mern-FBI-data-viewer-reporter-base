import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const accessToken = window.localStorage.getItem("accessToken");

  return !!accessToken ? children : <Navigate to="/login" replace />;
}

export default RequireAuth;
