import { usePieQuery } from "@/redux/api/dashboardAPI"
import { UserReducerInitialState } from "@/types/reducer-types"
import { useSelector } from "react-redux"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';



interface DataPoint {
    name: string;
    value: number;
  }
  
  interface ChartData {
    orderFullfillment: {
      processing: number;
      shipping: number;
      delivered: number;
    };
    productCategories: Array<{
      [key: string]: number;
    }>;
    stockAvailability?: {
      inStock: number;
      outOfStock: number;
    };
    revenueDistribution: {
      netMargin: number;
      discount: number;
      productionCost: number;
      burnt: number;
      marketingCost: number;
    };
    adminCustomer: {
      admin: number;
      customer: number;
    };
    usersAgeGroup: {
      teen: number;
      adult: number;
      old: number;
    };
  }


const COLORS: string[] = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];



const PieChartPage = () => {


    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
      )
    
      const { data, isLoading, isError } = usePieQuery(user?._id!)
    
      if (isLoading) return <div>Loading...</div>
      if (isError) return <div>Error fetching data</div>
      console.log("piedata:",data)
      if (!data?.pieChart) return <div>No data available</div>;

      const charts = data?.pieChart


      // Convert data to format required by Recharts
   // Convert data to format required by Recharts
   const formatData = (obj: { [key: string]: number } | null | undefined): DataPoint[] => {
    if (!obj) return [];
    
    try {
      return Object.entries(obj).map(([name, value]) => ({
        name,
        value: Number(value) || 0 // Handle NaN cases
      }));
    } catch (error) {
      console.error('Error formatting data:', error);
      return [];
    }
  };

  // Format product categories data with null check
  const formatProductCategories = (): DataPoint[] => {
    if (!charts?.productCategories) return [];

    try {
      return charts.productCategories.map(category => {
        const key = Object.keys(category)[0];
        return {
          name: key,
          value: Number(category[key]) || 0
        };
      });
    } catch (error) {
      console.error('Error formatting product categories:', error);
      return [];
    }
  };

  const renderPieChart = (data: DataPoint[], title: string): JSX.Element => {
    // Don't render chart if no data
    if (!data.length) {
      return (
        <Card className="w-full md:w-1/2 lg:w-1/3 p-4">
          <CardHeader>
            <CardTitle className="text-center">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center">
              No data available
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="w-full md:w-2/3 lg:w-2/5 p-4">
        <CardHeader>
          <CardTitle className="text-center">{title}</CardTitle>
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
                  {data.map((entry, index) => (
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
    <div className="p-6 w-full">
    <h1 className="text-2xl font-bold mb-6">Dashboard Analytics</h1>
    <div className="flex flex-wrap  gap-10 w-full">
      {renderPieChart(formatData(charts?.orderFullfillment!), 'Order Fulfillment')}
      {renderPieChart(formatProductCategories()!, 'Product Categories')}
      {/* {renderPieChart(formatData(charts?.stockAvailability!), 'Stock Availability')} */}
      {renderPieChart(formatData(charts?.revenueDistribution!), 'Revenue Distribution')}
      {renderPieChart(formatData(charts?.adminCustomer!), 'Admin vs Customer')}
      {renderPieChart(formatData(charts?.usersAgeGroup!), 'Users Age Group')}
    </div>
  </div>
  )
}

export default PieChartPage