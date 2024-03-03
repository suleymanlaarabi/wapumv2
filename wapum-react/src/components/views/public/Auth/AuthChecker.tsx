import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../../../store/AuthStore";

export const AuthChecker = () => {
  const { user } = useAuthStore();
  if (user) {
    return <Navigate to="/private/" />;
  }
  return <Outlet />;
};
