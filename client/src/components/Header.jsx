"use client";

import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import LoginUser from "../authentication/LoginUser";
import CreateUser from "../authentication/CreateUser";
import { useContext } from "react";
import AuthContext from "../authentication/AuthProvider";
import CookieTester from "./CookieTester";
import LogoutUser from "../authentication/LogoutUser";

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
				<div class="w-screen  lg:w-1/2 gap-2 text-lg flex flex-col items-center lg:flex-col justify-center  lg:justify-center lg:items-center p-10">
					<h1 class="mb-20 text-[100px] tracking-tighter">TrackCoop</h1>
					<h2 class="text-[40px] text-white/70 tracking-tight">
						Your Coop Tracker
					</h2>
					<p className="text-white/50">
						Effortlessly track your co-op job progress and explore top industry
						websites all in one place. Stay organized and informed with
						TrackCoop!
					</p>
					<div class="h-5 p-20 flex flex-col justify-center items-center  bg-gray-700 rounded-full">
						<p>Total applied</p>
						<CountUp
							end={data.length}
							duration={5}
							delay={1}
							className="text-7xl font-bold"
						/>
					</div>
					<div className="flex items-center gap-2">
						<Link
							class={
								auth?.user
									? "h-max rounded-full font-extrabold shadow-black bg-green-600 shadow-lg hover:-translate-y-2 transition px-8 py-5 mx-3"
									: "hidden"
							}
							to="/create"
						>
							New Application
						</Link>
						<div className={auth?.user ? "hidden" : ""}>
							<CreateUser />
						</div>
						<LoginUser />
						<CookieTester />
						<LogoutUser />
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
