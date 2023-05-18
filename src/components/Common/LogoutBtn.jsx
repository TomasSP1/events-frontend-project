import React from "react";
import authServices from "../../auth/authServices";
import { useAuth } from "../../auth/AuthContext";

const LogoutBtn = () => {
  const { checkAuthStatus } = useAuth();

  const handleLogout = async () => {
    await authServices.logout();
    checkAuthStatus();
  };

  return (
    <div onClick={handleLogout}>
      <i
        onClick={handleLogout}
        className="fa-solid fa-right-from-bracket"
      ></i>
    </div>
  );
};

export default LogoutBtn;
