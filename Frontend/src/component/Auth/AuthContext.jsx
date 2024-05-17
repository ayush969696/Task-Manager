import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(() => {
    let storedValue = localStorage.getItem("userLoggedIn");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("UserToken");
    setUserLoggedIn(false);
  };

  useEffect(() => {
    localStorage.setItem("userLoggedIn", JSON.stringify(userLoggedIn));
  }, [userLoggedIn]);

  return (
    <AuthContext.Provider value={{ userLoggedIn, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
