import React from "react";
import authServices from "../../auth/authServices";
import { useAuth } from "../../auth/AuthContext";

const LogoutBtn = () => {
  const { checkAuthStatus } = useAuth();

  const handleLogout = async () => {
    await authServices.logout();
    checkAuthStatus();
  };

  return <div onClick={handleLogout}>Logout</div>;
};

export default LogoutBtn;
