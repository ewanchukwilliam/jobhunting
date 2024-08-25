import DailyChart from "./DailyChart";
import MonthlyChart from "./MonthlyChart";
import { Button } from "./ui/button";
import WeeklyChart from "./WeeklyChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const AllCharts = () => {
  return (
    <Tabs defaultValue="daily" className="w-full h-1/2 mt-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="daily">daily</TabsTrigger>
        <TabsTrigger value="weekly">weekly</TabsTrigger>
        <TabsTrigger value="monthly">monthly</TabsTrigger>
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
