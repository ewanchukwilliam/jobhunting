import DailyChart from "./DailyChart";
import MonthlyChart from "./MonthlyChart";
import WeeklyChart from "./WeeklyChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const AllCharts = () => {
  return (
    <Tabs defaultValue="daily" className="w-auto h-1/2 mt-4 mx-10">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="daily">Daily</TabsTrigger>
        <TabsTrigger value="weekly">Weekly</TabsTrigger>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
      </TabsList>
      <TabsContent value="daily">
        <DailyChart className="h-60"/>
      </TabsContent>
      <TabsContent value="weekly">
        <WeeklyChart />
      </TabsContent>
      <TabsContent value="monthly">
        <MonthlyChart />
      </TabsContent>
    </Tabs>
  );
};

export default AllCharts;
