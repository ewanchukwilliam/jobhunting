import { useState } from "react";
import { axiosInstance } from "../authentication/AuthProvider";
import { Button } from "./ui/button";

const CookieTester = () => {
	const [cookie, setCookie] = useState(false);
	const handleClick = async (e) => {
		e.preventDefault();
		axiosInstance
			.get("/cookietester")
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
	};
	return (
		<>
			{cookie ? (
				<Button className="bg-accent">Success!</Button>
			) : (
				<Button onClick={handleClick}>CookieTester</Button>
			)}
		</>
	);
};

export default CookieTester;
