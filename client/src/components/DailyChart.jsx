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
import { axiosInstance } from "../authentication/AuthProvider";

import { parseISO, format } from "date-fns";

function formatDate(utcDateString) {
  const date = parseISO(utcDateString);
  const formattedDate = format(date, "yyyy-MM-dd");
  return formattedDate;
}
const DailyChart = () => {
  const [data, setData] = useState([]);
  const { auth } = useAuth();
  useEffect(() => {
    axiosInstance
      .get("/api/statistics")
      .then((res) => {
				const firstNonZeroIndex = res.data.daily.findIndex( (item) => item.daily !== 0,);
				const resData = res.data.daily.slice(firstNonZeroIndex);
        const formattedData = resData.map((entry) => ({
          ...entry,
          Day: format(parseISO(entry.Day), "yyyy-MM-dd"),
        }));
        setData(formattedData);
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
        <CardTitle>Daily Progress</CardTitle>
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
              dataKey="Day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="daily"
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
                ? `${data[0].Day} - ${data[data.length - 1].Day}`
                : "No data available"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DailyChart;
