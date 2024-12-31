
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useSelector } from 'react-redux'
import { UserReducerInitialState } from '@/types/reducer-types'
import { useLineQuery } from '@/redux/api/dashboardAPI'

interface ChartData {
  month: string;
  value: number;
}



const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formatChartData = (data: number[]): ChartData[] => {
  return data.map((value, index) => ({
    month: months[index],
    value,
  }));
};

const LineGraph = ({ data, title, color }: { data: ChartData[], title: string, color: string }) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>Last 12 months</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer
        config={{
          value: {
            label: title,
            color: color,
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
);

export default function LineGraphPage() {
 

    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
      )
    
      const { data, isLoading, isError } = useLineQuery(user?._id!)
    
      if (isLoading) return <div>Loading...</div>
      if (isError) return <div>Error fetching data</div>
      
      if (!data?.lineChart) return <div>No data available</div>;

      const lineChart = data?.lineChart
  

 

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">Dashboard Analytics</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <LineGraph data={formatChartData(lineChart.product)} title="Products" color="#3b82f6" />
        <LineGraph data={formatChartData(lineChart.user)} title="Users" color="#22c55e" />
        <LineGraph data={formatChartData(lineChart.discount)} title="Discounts" color="#eab308" />
        <LineGraph data={formatChartData(lineChart.revenue)} title="Revenue" color="#ef4444" />
      </div>
    </div>
  );
}

