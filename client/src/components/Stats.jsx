import { useEffect, useState } from "react";
import { axiosInstance } from "../authentication/AuthProvider";
import useAuth from "../authentication/useAuth";

const Stats = () => {
	const [daily, setDaily] = useState([]);
	const [weekly, setWeekly] = useState([]);
	const [monthly, setMonthly] = useState([]);
	const { auth } = useAuth();
	useEffect(() => {
		axiosInstance
			.get("/api/statistics")
			.then((res) => {
				setDaily(res.data.daily);
				setWeekly(res.data.weekly);
				setMonthly(res.data.monthly);
			})
			.catch((err) => {
				console.log(err.response.message);
				setDaily([]);
				setWeekly([]);
				setMonthly([]);
			});
	}, [auth]);
	return (
		<table classNameName="flex flex-col w-full">
			<div>
				{daily.map((stat, ind) => {
					return (
						<tr className="m-2">
							<td className="text-center border-gray-900 border-l px-2">Daily</td>
							<td className="text-center border-gray-900 border-l px-2">
								{stat.Day}
							</td>
							<td className="text-center border-gray-900 border-l px-2">
								{stat.daily}
							</td>
						</tr>
					);
				})}
			</div>
			<div>
				{weekly.map((stat, ind) => {
					return (
						<tr className="m-2">
							<td className="text-center border-gray-900 border-l px-2">Weekly</td>
							<td className="text-center border-gray-900 border-l px-2">
								{stat.WeeklyCount}
							</td>
							<td className="text-center border-gray-900 border-l px-2">
								{stat.Week}
							</td>
						</tr>
					);
				})}
			</div>
			<div>
				{monthly.map((stat, ind) => {
					return (
						<tr className="m-2">
							<td className="text-center border-gray-900 border-l px-2">Monthly</td>
							<td className="text-center border-gray-900 border-l px-2">
								{stat.MonthlyCount}
							</td>
							<td className="text-center border-gray-900 border-l px-2">
								{stat.Month}
							</td>
						</tr>
					);
				})}
			</div>
		</table>
	);
};

export default Stats;
