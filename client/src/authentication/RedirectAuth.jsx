import { Navigate, Outlet} from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoutes = () => {
  const { auth } = useAuth();
  if (auth?.user) {
    return <Outlet />;
  }
  return <Navigate to="/" replace />;
};
export default ProtectedRoutes;
