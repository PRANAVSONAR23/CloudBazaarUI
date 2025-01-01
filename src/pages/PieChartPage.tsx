import { usePieQuery } from "@/redux/api/dashboardAPI";
import { UserReducerInitialState } from "@/types/reducer-types";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Loader from "@/components/custom/Loader";

interface DataPoint {
    name: string;
    value: number;
}

const COLORS: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const PieChartPage = () => {
    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );

    const { data, isLoading, isError } = usePieQuery(user?._id!);

    if (isLoading) return  <Loader className="w-96 h-96" />
    if (isError) return <div className="text-center text-lg text-red-500">Error fetching data</div>;
    if (!data?.pieChart) return <div className="text-center text-lg text-gray-400">No data available</div>;

    const charts = data?.pieChart;

    const formatData = (obj: { [key: string]: number } | null | undefined): DataPoint[] => {
        if (!obj) return [];
        return Object.entries(obj).map(([name, value]) => ({
            name,
            value: Number(value) || 0,
        }));
    };

    const formatProductCategories = (): DataPoint[] => {
        if (!charts?.productCategories) return [];
        return charts.productCategories.map(category => {
            const key = Object.keys(category)[0];
            return {
                name: key,
                value: Number(category[key]) || 0,
            };
        });
    };

    const renderPieChart = (data: DataPoint[], title: string): JSX.Element => {
        if (!data.length) {
            return (
                <Card className="bg-gradient-to-b from-black to-blue-900 text-white shadow-md w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-lg font-semibold">{title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-center justify-center text-gray-400">
                            No data available
                        </div>
                    </CardContent>
                </Card>
            );
        }

        return (
            <Card className="bg-gray-900 text-white shadow-lg w-full md:w-2/3 lg:w-2/5 p-4 rounded-lg">
                <CardHeader>
                    <CardTitle className="text-center text-lg font-semibold">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }: { name: string; percent: number }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {data.map((_, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="p-6 w-full bg-gray-900 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Analytics</h1>
            <div className="flex flex-wrap justify-center gap-10 w-full">
                {renderPieChart(formatData(charts?.orderFullfillment), 'Order Fulfillment')}
                {renderPieChart(formatProductCategories(), 'Product Categories')}
                {renderPieChart(formatData(charts?.stockAvailability), 'Stock Availability')}
                {renderPieChart(formatData(charts?.revenueDistribution), 'Revenue Distribution')}
                {renderPieChart(formatData(charts?.adminCustomer), 'Admin vs Customer')}
                {renderPieChart(formatData(charts?.usersAgeGroup), 'Users Age Group')}
            </div>
        </div>
    );
};

export default PieChartPage;
