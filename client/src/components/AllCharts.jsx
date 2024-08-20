import DailyChart from "./DailyChart";
import MonthlyChart from "./MonthlyChart";
import WeeklyChart from "./WeeklyChart";

const AllCharts = () => {
	return (
		<div className="w-full h-auto flex flex-cols gap-2 rounded-xl p-5 m-5">
			<DailyChart />
			<WeeklyChart />
			<MonthlyChart />
		</div>
	);
};

export default AllCharts;
