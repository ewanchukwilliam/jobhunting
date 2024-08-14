import { useState } from "react";
import { axiosInstance } from "../authentication/AuthProvider";
import useAuth from "../authentication/useAuth";
import { Button } from "./ui/button";

const CookieTester = () => {
	const [cookie, setCookie] = useState(false);
	const { auth } = useAuth();
	const handleClick = async (e) => {
		e.preventDefault();
		axiosInstance
			.get("/api/cookietester")
			.then((res) => {
				if (res.status === 200) {
					console.log("cookie authenticated successfully");
					setCookie(true);
				}
			})
			.catch((err) => {
				if (err.response.status === 401) {
					console.log("server responded that you have no cookie");
				} else if (err.response.status === 500) {
					console.log("something else went wrong");
				}
			});
		// axiosInstance
		// 	.get("/refresh_user")
		// 	.then((res) => {
		// 		setAuth({
		// 			user: res.data.username,
		// 			accessToken: res.data.accessToken,
		// 			message: res.data.message,
		// 		});
		// 			console.log('user successfully re-logged in using cookie on page load')
		// 	})
		// 	.catch((err) => {
		// 		if (err.response.status === 400) {
		// 			console.log("invalid accessToken");
		// 		} else {
		// 			console.log("server side error in refresh token");
		// 		}
		// 	});
	};
	return (
		<>
			{cookie ? (
				<Button className="bg-accent">Success!{auth?.user}</Button>
			) : (
				<Button onClick={handleClick}>CookieTester</Button>
			)}
		</>
	);
};

export default CookieTester;
