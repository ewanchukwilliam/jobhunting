import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import useAuth from "../authentication/useAuth";
import DailyChart from "./DailyChart";
import { Card } from "./ui/card";

const Footer = ({ data }) => {
	const [maxMonth, setmaxMonth] = useState(0);
	const [maxDay, setmaxDay] = useState(0);
	const [maxWeek, setmaxWeek] = useState(0);
	const { auth } = useAuth();
	useEffect(() => {
		axios
			.get("/api/statistics")
			.then((res) => {
				const maxD = res.data.daily.reduce((max, item) => {
					return item.daily > max ? item.daily : max;
				}, 0);
				setmaxDay(maxD);
				const maxW = res.data.weekly.reduce((max, item) => {
					return item.WeeklyCount > max ? item.WeeklyCount : max;
				}, 0);
				setmaxWeek(maxW);
				const maxM = res.data.monthly.reduce((max, item) => {
					return item.MonthlyCount > max ? item.MonthlyCount : max;
				}, 0);
				setmaxMonth(maxM);
			})
			.catch((err) => {
				setmaxDay(0);
				setmaxWeek(0);
				setmaxMonth(0);
				console.log("no cookie for statistics")
			});

	}, [auth]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { delay: 0, duration: 0.4, ease: "easeIn" },
			}}
		>
			<div className="gap-2 text-lg flex flex-col lg:flex-row w-full justify-between items-center my-3">
				<div className="flex flex-col justify-between w-full items-center">
					<h3 className="text-5xl font-semibold text-center">Current Stats</h3>
					<div className="h-10 p-20 my-2 flex flex-col justify-center items-center  bg-gray-700 rounded-full">
						<p>Current Streak</p>
						<CountUp
							end={maxDay}
							duration={5}
							delay={1}
							className="text-7xl font-bold"
						/>
					</div>
				</div>
				<div className=" gap-2 w-full max-w-[1000px]">
					<Card className="text-xl flex flex-col bg-gray-600 p-5 justify-between h-[400px]">
						<div className="h-full hover:scale-105 hover:text-2xl hover:font-semibold hover:text-accent transition-all my-2 flex gap-3 justify-center items-center  bg-gray-700 rounded-full">
							<p>Daily Maximum</p>
							<CountUp
								end={maxDay}
								duration={5}
								delay={1}
								className="text-4xl font-bold"
							/>
						</div>
						<div className="h-full my-2 flex  justify-center hover:scale-105 hover:text-2xl hover:font-semibold hover:text-accent transition-all gap-3 items-center  bg-gray-700 rounded-full">
							<p>Weekly Maxmimum</p>
							<CountUp
								end={maxWeek}
								duration={5}
								delay={1}
								className="text-4xl font-bold"
							/>
						</div>
						<div className="h-full my-2 flex  justify-center gap-3 items-center  bg-gray-700 rounded-full hover:scale-105 hover:text-2xl hover:font-semibold hover:text-accent transition-all">
							<p>Monthly Maximum</p>
							<CountUp
								end={maxMonth}
								duration={5}
								delay={1}
								className="text-4xl font-bold"
							/>
						</div>
					</Card>
				</div>
			</div>
		</motion.div>
	);
};

export default Footer;
