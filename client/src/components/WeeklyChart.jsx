import React, { useState, useEffect } from "react";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

const WeeklyChart = () => {
  const [data, setData] = useState([]);
  const { auth } = useAuth();
  useEffect(() => {
    axiosInstance
      .get("/api/statistics")
      .then((res) => {
        const firstNonZeroIndex = res.data.weekly.findIndex(
          (item) => item.WeeklyCount !== 0,
        );
        const filteredData = res.data.weekly.slice(firstNonZeroIndex);
        setData(filteredData);
      })
      .catch((err) => {
        // console.log(err.response.message);
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
        <CardTitle>Weekly Progress</CardTitle>
        <CardDescription>
          Showing total applications applied to per week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <YAxis
              dataKey={data.Week}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <XAxis
              dataKey="Week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="WeeklyCount"
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
                ? `${data[0].Week}-${data[0].Year} - ${data[data.length - 1].Week}-${data[data.length - 1].Year}`
                : "No data available"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeeklyChart;
