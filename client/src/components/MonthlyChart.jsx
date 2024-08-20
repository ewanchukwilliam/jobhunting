import React, { useState, useEffect } from "react";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import useAuth from "../authentication/useAuth";
import { axiosInstance } from "../authentication/AuthProvider";

import { parseISO, format } from "date-fns";

function formatDate(utcDateString) {
	const date = parseISO(utcDateString);
	const formattedDate = format(date, "yyyy-MM-dd");
	return formattedDate;
}
const MonthlyChart = () => {
	const [data, setData] = useState([]);
	const { auth } = useAuth();
	useEffect(() => {
		axiosInstance
			.get("/api/statistics")
			.then((res) => {
				const firstNonZeroIndex = res.data.monthly.findIndex( (item) => item.MonthlyCount !== 0,);
				const filteredData = res.data.monthly.slice(firstNonZeroIndex);
				// const convertedAndFilteredData = filteredData.map((item) => {
				// 	let date = new Date(item.Year, item.Month - 1, 1);
				// 	let monthName = format(date, "MMMM", {
				// 		locale: require("date-fns/locale/en-CA"),
				// 	});
				// 	return {
				// 		...item,
				// 		Month: monthName,
				// 	};
				// });
				setData(filteredData);
			})
			.catch((err) => {
				console.log(err.response.message);
				setData([]);
			});
	}, [auth]);

	const chartConfig = {
		Day: {
			label: "daily",
			color: "#00ff99",
		},
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Monthly Progress</CardTitle>
				<CardDescription>
					Showing total applications applied to per month
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
						accessibilityLayer
						data={data}
						margin={{
							left: 12,
							right: 12,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="Month"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Area
							dataKey="MonthlyCount"
							type="natural"
							fill="#00ff99"
							fillOpacity={0.4}
							stroke="#00ff99"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 font-medium leading-none">
							Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
						</div>
						<div className="flex items-center gap-2 leading-none text-white/70">
							{data.length > 0
								? `${data[0].Month}-${data[0].Year}  to ${data[data.length - 1].Month}-${data[data.length - 1].Year}`
								: "No data available"}
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default MonthlyChart;
