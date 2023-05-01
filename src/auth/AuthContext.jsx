import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const checkAuthStatus = () => {
    const userString = localStorage.getItem("user");
    const userObj = JSON.parse(userString);

    if (userObj) {
      setIsLoggedIn(true);
      setUserRole(userObj.role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
