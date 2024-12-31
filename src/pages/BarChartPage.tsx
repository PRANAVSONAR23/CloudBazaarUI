

import { useState, useEffect } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useSelector } from 'react-redux'
import { UserReducerInitialState } from '@/types/reducer-types'
import { useBarQuery } from '@/redux/api/dashboardAPI'

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
    
      if (isLoading) return <div>Loading...</div>
      if (isError) return <div>Error fetching data</div>
      
      if (!data?.barChart) return <div>No data available</div>;

      const barchart = data?.barChart
  

  const productData = prepareChartData(barchart.product, 6)
  const userData = prepareChartData(barchart.user, 6)
  const orderData = prepareChartData(barchart.order, 12)

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Bar Charts</h1>

      <Card>
        <CardHeader>
          <CardTitle>Product Chart (Last 6 Months)</CardTitle>
          <CardDescription>Number of products added per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ value: { label: "Products", color: "hsl(var(--chart-1))" } }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>User Chart (Last 6 Months)</CardTitle>
          <CardDescription>Number of users registered per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ value: { label: "Users", color: "hsl(var(--chart-2))" } }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Chart (Last 12 Months)</CardTitle>
          <CardDescription>Number of orders placed per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{ value: { label: "Orders", color: "hsl(var(--chart-3))" } }} className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={orderData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

