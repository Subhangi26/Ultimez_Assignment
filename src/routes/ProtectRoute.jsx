import { Navigate } from "react-router-dom";

/** Redirects unauthenticated users to the login page */
const ProtectRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectRoute;
