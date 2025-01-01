
import { useStatsQuery } from "@/redux/api/dashboardAPI"
import { UserReducerInitialState } from "@/types/reducer-types"
import { useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Loader from "@/components/custom/Loader"

const Dashboard = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  )

  const { data, isLoading, isError } = useStatsQuery(user?._id!)

  if (isLoading) return  <Loader className="w-96 h-96" />
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
    <div className="container mx-auto p-6 bg-gray-900 text-white  w-[70vw]">
      <h1 className="text-4xl font-extrabold text-blue-500 mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardData.map((card, index) => (
          <Card key={index} className="bg-gray-800 border border-blue-600 rounded-lg shadow-lg transition duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg font-semibold text-blue-400">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{card.value}</div>
              <p className={`text-xs ${card.change! > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {card.change! > 0 ? '+' : ''}{card.change}% from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bar Chart */}
      <Card className="mb-8 bg-gray-800 border border-blue-600 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-400">Orders and Revenue (Last 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="month" stroke="#aaa" />
              <YAxis yAxisId="left" stroke="#aaa" />
              <YAxis yAxisId="right" orientation="right" stroke="#aaa" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="order" fill="#8884d8" name="Orders" />
              <Bar yAxisId="right" dataKey="revenue" fill="#82ca9d" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart */}
      <Card className="mb-8 bg-gray-800 border border-blue-600 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-400">Category Distribution</CardTitle>
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
      <Card className="bg-gray-800 border border-blue-600 rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-400">Latest Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-black">
                <TableHead className="text-blue-400 font-semibold text-base">ID</TableHead>
                <TableHead className="text-blue-400 font-semibold text-base">Amount</TableHead>
                <TableHead className="text-blue-400 font-semibold text-base">Discount</TableHead>
                <TableHead className="text-blue-400 font-semibold text-base">Quantity</TableHead>
                <TableHead className="text-blue-400 font-semibold text-base">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats?.latestTransactions?.map((transaction) => (
                <TableRow key={transaction._id} className="text-white ">
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
