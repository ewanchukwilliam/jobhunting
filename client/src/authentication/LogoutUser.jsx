import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import useAuth from "./useAuth";
import { axiosInstance } from "./AuthProvider";
import { useState } from "react";

const LogoutUser = () => {
	const { auth, setAuth } = useAuth();
	const [logout, setLogout] = useState(false);

	const handleClick = async (e) => {
		e.preventDefault();
		axiosInstance
			.post("/user/logout")
			.then((res) => {
				if (res.status === 200) {
					console.log("user was successfully logged out");
					setLogout(true);
					setAuth({ logout: true });
				}
			})
			.catch((err) => {
				if (err.response.status === 401) {
					console.log("server responded that you have no cookie");
				} else if (err.response.status === 500) {
					console.log("something else went wrong", err);
				}
			});
	};

	return (
		<>
			{logout && !auth?.user ? (
				<div>
					<h1>Successfully logged out!</h1>
				</div>
			) : (
				<Dialog>
					<DialogTrigger>
						<Button
							className={ !auth?.user ? "hidden" : "bg-red-600"}
							variant="outline"
						>
							Logout
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[425px]">
						<DialogHeader>
							<DialogTitle>User Logout page</DialogTitle>
							<DialogDescription>
								Are you sure you want to logout?
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<Button type="submit" onClick={handleClick} variant="outline">
								Logout
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</>
	);
};

export default LogoutUser;
