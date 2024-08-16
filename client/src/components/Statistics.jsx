import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Linechart from "./Linechart";
import { Card } from "./ui/card";

const Footer = ({ data }) => {
	let max = 0;
	let streak = 1;
	let currentstreak = 1;
	const dates = {};
	for (let n = 0; n < data.length; n++) {
		const date = data[n].date.split(",")[0];
		var day = parseInt(date.split(" ")[1].replace(",", ""));
		var month = date.split(" ")[0];
		if (n === 0) {
			var previousday = -1;
			var previousmonth = -1;
		}
		if (previousmonth === month && day === previousday + 1) {
			currentstreak += 1;
		} else if (previousmonth === month && day === previousday) {
		} else {
			currentstreak = 1;
		}
		if (currentstreak > streak) {
			streak = currentstreak;
		}
		if (dates[date]) {
			dates[date]++;
			if (dates[date] > max) {
				max = dates[date];
			}
		} else {
			dates[date] = 1;
		}
		previousday = day;
		previousmonth = month;
	}
	const [weeklyops, setData] = useState([]);
	useEffect(() => {
		axios
			.get("/api/applications/stats")
			.then((res) => {
				setData(res.data); // Assuming the API returns the array directly
			})
			.catch((err) => console.log(err));
	}, []);
	let weeklymax = 0;
	for (let i = 0; i < weeklyops.length; i++) {
		const week = weeklyops[i].day;
		if (week > weeklymax) {
			weeklymax = week;
		}
	}
	const chartConfig = {
		day: {
			label: "Applied: ",
			color: "hsl(var(--chart-1))",
		},
	};

	console.log(dates);
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { delay: 0, duration: 0.4, ease: "easeIn" },
			}}
		>
			<div class="gap-2 text-lg flex flex-col lg:flex-row justify-between items-center my-3 ">
				<div className="flex flex-col  items-center">
					<h3 class="text-5xl font-semibold text-center">Current Stats</h3>
					<div class="h-10 p-20 my-2 flex flex-col justify-center items-center  bg-gray-700 rounded-full">
						<p>Current Streak</p>
						<CountUp
							end={currentstreak}
							duration={5}
							delay={1}
							className="text-7xl font-bold"
						/>
					</div>
				</div>
				<div className="flex gap-2 w-full max-w-[1000px]">
					<Card className="text-xl flex flex-col bg-gray-600 p-5 justify-between">
						<div class="h-full hover:scale-105 hover:text-2xl hover:font-semibold hover:text-accent transition-all my-2 flex gap-3 justify-center items-center  bg-gray-700 rounded-full">
							<p>Longest Streak</p>
							<CountUp
								end={streak}
								duration={5}
								delay={1}
								className="text-4xl font-bold"
							/>
						</div>
						<div class="h-full my-2 flex  justify-center hover:scale-105 hover:text-2xl hover:font-semibold hover:text-accent transition-all gap-3 items-center  bg-gray-700 rounded-full">
							<p>Most single day</p>
							<CountUp
								end={max}
								duration={5}
								delay={1}
								className="text-4xl font-bold"
							/>
						</div>
						<div class="h-full my-2 flex  justify-center gap-3 items-center  bg-gray-700 rounded-full hover:scale-105 hover:text-2xl hover:font-semibold hover:text-accent transition-all">
							<p>Weekly max</p>
							<CountUp
								end={weeklymax}
								duration={5}
								delay={1}
								className="text-4xl font-bold"
							/>
						</div>
					</Card>
					<Linechart />
				</div>
			</div>
		</motion.div>
	);
};

export default Footer;
