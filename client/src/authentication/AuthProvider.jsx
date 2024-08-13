import axios from "axios";
import { createContext, useState } from "react";

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
	console.log(token);
	if (!auth.user) {
		axiosInstance
			.get("/refresh_user")
			.then((res) => {
				setAuth({
					user: res.data.username,
					accessToken: res.data.accessToken,
					message: res.data.message,
				});
				console.log("user successfully re-logged in using cookie on page load");
			})
			.catch((err) => {
				if (err.response.status === 400) {
					console.log("invalid accessToken");
				} else {
					console.log("server side error in refresh token");
				}
			});
	}
	return (
		<AuthContext.Provider value={{ auth, setAuth, axiosInstance }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
