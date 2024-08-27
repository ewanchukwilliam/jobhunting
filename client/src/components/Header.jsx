"use client";

import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import LoginUser from "../authentication/LoginUser";
import CreateUser from "../authentication/CreateUser";
import { useContext } from "react";
import AuthContext from "../authentication/AuthProvider";
import LogoutUser from "../authentication/LogoutUser";
import { FaNewspaper, FaWpforms, FaSignInAlt, FaUserEdit, FaSignOutAlt} from "react-icons/fa";
import { DropdownMenu } from "./ui/dropdown-menu";
import ApplicationMenu from "./ApplicationMenu";
const Header = ({ data }) => {
	const { auth } = useContext(AuthContext);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { delay: 0, duration: 0.4, ease: "easeIn" },
			}}
		>
			<div className="flex justify-between">
				<div className="w-screen  lg:w-1/2 gap-2 text-lg flex flex-col items-center lg:flex-col justify-center  lg:justify-center lg:items-center p-10">
					<h1 className="mb-20 text-[100px] tracking-tighter">TrackCoop</h1>
					<h2 className="text-[40px] text-white/70 tracking-tight">
						Your Coop Tracker
					</h2>
					<p className="text-white/50 mb-3 text-center">
						Effortlessly track your co-op job progress and explore top industry
						websites all in one place. Stay organized and informed with
						TrackCoop!
					</p>
					<div className="h-5 p-20 flex flex-col justify-center items-center  bg-gray-700 rounded-full">
						<p>Total applied</p>
						<CountUp
							end={data.length}
							duration={5}
							delay={1}
							className="text-7xl font-bold"
						/>
					</div>
					<div className="flex items-center gap-2 mt-4">
						<Link
							className={
								auth?.user
									? "tracking-tight h-max rounded-full text-xl font-bold bg-accent hover:bg-accent-hover transition-all text-center duration-300 shadow-lg hover:scale-105 transition p-4  py-5 mx-3 flex flex-row gap-3 items-center text-center justify-center"
									: "hidden"
							}
							to="/create"
						>
							<FaWpforms />
							New Application
						</Link>
						<div className={auth?.user ? "hidden" : ""}>
							<CreateUser
								buttonProps={{
									className:
										"flex flex-row gap-2 items-center text-center justify-center rounded-full hover:bg-accent px-2 py-2 transition-all group px-5",

								}}
							IconComponent={FaUserEdit}
							/>
						</div>
						<LoginUser
							buttonProps={{
								className:
									"flex flex-row gap-2 items-center text-center justify-center rounded-full hover:bg-accent px-2 py-2 transition-all group px-5",
							}}
							IconComponent={FaSignInAlt}
						/>
						<LogoutUser 
							buttonProps={{
								className:
									"flex flex-row gap-2 items-center text-center justify-center rounded-full hover:bg-red-600 px-2 py-2 transition-all group px-5",
							}}
							IconComponent={FaSignOutAlt}


						/>
					</div>
				</div>
				<motion.div
					className="hidden lg:flex w-1/2 h-screen"
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 0, duration: 0.6, ease: "easeIn" },
					}}
				>
					<img
						className="w-full h-full object-cover"
						src="/Landing2.jpg"
						alt="landingimage"
					/>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default Header;
