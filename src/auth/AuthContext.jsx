import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext) || {};
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuthStatus = () => {
    const userString = localStorage.getItem("user");
    const userObj = JSON.parse(userString);

    if (userObj) {
      setIsLoggedIn(true);
      setUserRole(userObj.role);
      setUserID(userObj);
      setUserEmail(userObj.email);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
      setUserID(null);
      setUserEmail(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, [isLoggedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        userID,
        userEmail,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
