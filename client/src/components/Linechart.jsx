"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

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

const Linechart = () => {
	const [data, setData] = useState([]);
	const { auth } = useAuth();
	useEffect(() => {
		if (auth?.user) {
			axios
				.get("/api/applications/stats")
				.then((res) => {
					setData(res.data); // Assuming the API returns the array directly
				})
				.catch((err) => console.log(err));
		}
	}, [auth]);

	const chartConfig = {
		day: {
			label: "Applied: ",
			color: "hsl(var(--chart-1))",
		},
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Weekly Tracker</CardTitle>
				<CardDescription>
					Showing total applications applied to per week
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
							Key="week"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator="line" />}
						/>
						<Area
							dataKey="day"
							type="natural"
							fill="var(--color-day)"
							fillOpacity={0.4}
							stroke="var(--color-day)"
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
						<div className="flex items-center gap-2 leading-none text-muted-foreground">
							{data.length > 0
								? `${data[0].week} - ${data[data.length - 1].week}`
								: "No data available"}
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};

export default Linechart;
