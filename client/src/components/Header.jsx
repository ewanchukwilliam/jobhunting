"use client";

import CountUp from "react-countup";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

const Header = ({ data }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { delay: 0, duration: 0.4, ease: "easeIn" },
			}}
		>
			<div class="text-lg flex sm:flex-col lg:flex-row justify-between items-center my-3 ">
				<h3 class="text-6xl">Applications</h3>
				<div class="h-10 p-20 my-2 flex flex-col justify-center items-center  bg-gray-700 rounded-full">
					<p>Total applied</p>
					<CountUp
						end={data.length}
						duration={5}
						delay={1}
						className="text-7xl font-extrabold"
					/>
				</div>
				<div className="flex gap-2">
					<Link
						class="h-max rounded-lg font-extrabold shadow-black bg-green-600 shadow-lg hover:-translate-y-2 transition px-8 py-5 mx-3"
						to="/create"
					>
						New Application
					</Link>
					<Link
						class="h-max rounded-lg font-extrabold shadow-black bg-green-600 shadow-lg hover:-translate-y-2 transition px-8 py-5 mx-3"
						to="/exportable"
					>
						Export to Excel
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default Header;
