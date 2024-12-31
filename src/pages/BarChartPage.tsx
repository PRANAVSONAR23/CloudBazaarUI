

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useSelector } from 'react-redux'
import { UserReducerInitialState } from '@/types/reducer-types'
import { useBarQuery } from '@/redux/api/dashboardAPI'
import Loader from '@/components/custom/Loader'

// Define types for our data structure
type ChartData = {
  name: string
  value: number
}



const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const prepareChartData = (data: number[], monthCount: number): ChartData[] => {
  return data.slice(-monthCount).map((value, index) => ({
    name: months[months.length - monthCount + index],
    value
  }))
}

export default function BarChartPage() {


    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
      )
    
      const { data, isLoading, isError } = useBarQuery(user?._id!)
    
      if (isLoading) return  <Loader className="w-96 h-96" />
      if (isError) return <div>Error fetching data</div>
      
      if (!data?.barChart) return <div>No data available</div>;

      const barchart = data?.barChart
  

  const productData = prepareChartData(barchart.product, 6)
  const userData = prepareChartData(barchart.user, 6)
  const orderData = prepareChartData(barchart.order, 12)

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-900 text-white min-h-screen w-[80vw] flex flex-col items-center ">
    {/* Page Title */}
    <div className="text-center">
      <h1 className="text-4xl font-bold text-blue-400">Bar Charts</h1>
      <p className="text-gray-400 mt-2">Visual insights from the past months</p>
    </div>
  
    {/* Product Chart */}
    <Card className="bg-[#1a1a2e] border border-gray-700 rounded-lg shadow-lg w-2/3">
      <CardHeader className="p-6">
        <CardTitle className="text-lg font-semibold text-blue-400">Product Chart (Last 6 Months)</CardTitle>
        <CardDescription className="text-sm text-gray-400">Number of products added per month</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer
          config={{ value: { label: "Products", color: "hsl(var(--chart-1))" } }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={productData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  
    {/* User Chart */}
    <Card className="bg-[#1a1a2e] border border-gray-700 rounded-lg shadow-lg w-2/3">
      <CardHeader className="p-6">
        <CardTitle className="text-lg font-semibold text-blue-400">User Chart (Last 6 Months)</CardTitle>
        <CardDescription className="text-sm text-gray-400">Number of users registered per month</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer
          config={{ value: { label: "Users", color: "hsl(var(--chart-2))" } }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="hsl(var(--chart-2))" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  
    {/* Order Chart */}
    <Card className="bg-[#1a1a2e] border border-gray-700 rounded-lg shadow-lg w-2/3">
      <CardHeader className="p-6">
        <CardTitle className="text-lg font-semibold text-blue-400">Order Chart (Last 12 Months)</CardTitle>
        <CardDescription className="text-sm text-gray-400">Number of orders placed per month</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer
          config={{ value: { label: "Orders", color: "hsl(var(--chart-3))" } }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={orderData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="value" fill="hsl(var(--chart-3))" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  </div>
  
  )
}

