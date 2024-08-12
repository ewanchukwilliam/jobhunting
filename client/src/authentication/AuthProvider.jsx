import axios from "axios";
import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({});
export const axiosInstance = axios.create({
  withCredentials: true,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    // window.location.reload();
  }
  return config;
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token && !auth.user) {
      axiosInstance
        .get("/refresh_user")
        .then((res) => {
          setAuth({
            user: res.data.username,
            password: res.data.password,
            accessToken: res.data.accessToken,
            message: res.data.message,
          });
        })
        .catch((err) => {
          if (err.response.status === 400) {
            console.log("invalid accessToken");
          } else {
            console.log("server side error in refresh token");
          }
        });
    }
  }, [auth]);
  return (
    <AuthContext.Provider value={{ auth, setAuth, axiosInstance }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
