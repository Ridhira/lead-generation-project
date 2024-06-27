import { Navigate, Outlet } from "react-router";
import helper from "../utility/helper.js";

const useAuth = () => {
  return helper.userLoggedIn();
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
