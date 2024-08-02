"use client";
import { useState } from "react";

const AuthProvider = ({children}) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });
  const login = (user) => {
    setAuthState({
      isAuthenticated: true,
      user: user,
    });
  };
  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  };
  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
