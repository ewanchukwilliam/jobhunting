import { Navigate, Outlet} from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoutes = () => {
  const { auth } = useAuth();
  if (auth?.user) {
    return <Outlet />;
    // Redirect to the home page if not authenticated
  }
  return <Navigate to="/" replace />;
  // Render children routes if authenticated
};
export default ProtectedRoutes;
