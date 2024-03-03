import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../../store/AuthStore";

export const PrivateAuthChecker = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }
  return <Outlet />;
};
