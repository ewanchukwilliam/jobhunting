import DailyChart from "./DailyChart";
import MonthlyChart from "./MonthlyChart";
import WeeklyChart from "./WeeklyChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "framer-motion";
const AllCharts = () => {
	return (
		<Tabs defaultValue="daily" className="w-auto h-1/2 mt-4 mx-10">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="daily">Daily</TabsTrigger>
				<TabsTrigger value="weekly">Weekly</TabsTrigger>
				<TabsTrigger value="monthly">Monthly</TabsTrigger>
			</TabsList>
			<TabsContent value="daily">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 0, duration: 0.3, ease: "easeInOut" },
					}}
				>
					{" "}
					<DailyChart className="h-60" />
				</motion.div>
			</TabsContent>
			<TabsContent value="weekly">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 0, duration: 0.3, ease: "easeInOut" },
					}}
				>
					{" "}
					<WeeklyChart className="h-60" />
				</motion.div>
			</TabsContent>
			<TabsContent value="monthly">
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 0, duration: 0.3, ease: "easeInOut" },
					}}
				>
					{" "}
					<MonthlyChart className="h-60" />
				</motion.div>
			</TabsContent>
		</Tabs>
	);
};

export default AllCharts;
