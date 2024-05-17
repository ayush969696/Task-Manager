import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const Logout = () => {
  const { handleLogout } = useAuth();
  useEffect(() => {
    handleLogout();
  }, [handleLogout]);

  return <Navigate to={"/authenticate"} />;
};
