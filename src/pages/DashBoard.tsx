'use client'

import { useStatsQuery } from "@/redux/api/dashboardAPI"
import { UserReducerInitialState } from "@/types/reducer-types"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const Dashboard = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  )

  const { data, isLoading, isError } = useStatsQuery(user?._id!)

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>

  const stats = data?.stats

  const cardData = [
    { title: 'Revenue', value: stats?.count.revenue, change: stats?.ChangePercentage.revenue },
    { title: 'Products', value: stats?.count.product, change: stats?.ChangePercentage.product },
    { title: 'Users', value: stats?.count.user, change: stats?.ChangePercentage.user },
    { title: 'Orders', value: stats?.count.order, change: stats?.ChangePercentage.order },
  ]

  const chartData = stats?.chart.order.map((order, index) => ({
    month: `Month ${index + 1}`,
    order,
    revenue: stats.chart.revenue[index],
  }))

  const pieChartData = stats?.categoryCount.map(category => ({
    name: Object.keys(category)[0],
    value: Object.values(category)[0],
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28']

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 w-[60vw]">
        {cardData.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">
                {card.change! > 0 ? '+' : ''}{card.change}% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bar Chart */}
      <Card className="mb-8 w-[60vw]">
        <CardHeader>
          <CardTitle>Orders and Revenue (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="order" fill="#8884d8" name="Orders" />
              <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="mb-8 w-[60vw]">
        <CardHeader>
          <CardTitle>Category Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Latest Transactions Table */}
      <Card className="w-[60vw] ">
        <CardHeader>
          <CardTitle>Latest Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats?.latestTransactions?.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction._id}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>{transaction.discount}</TableCell>
                  <TableCell>{transaction.quantity}</TableCell>
                  <TableCell>{transaction.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard

