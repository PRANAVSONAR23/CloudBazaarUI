import React from 'react';

interface Transaction {
  _id: string;
  orderItems: Array<{
    name: string;
    quantity: number;
  }>;
  subtotal: number;
  discount: number;
  total: number;
  status: string;
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode?: number;
  };
  createdAt?: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

const OrderTable: React.FC<TransactionsTableProps> = ({ transactions }) => {
  return (
    <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 bg-gray-900  text-white ">
      <h1 className="text-3xl font-bold text-blue-500 mb-6">All Orders</h1>
      <div className="overflow-x-auto bg-gray-900 shadow-lg rounded-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-blue-900">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Discount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Shipping Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className="px-6 py-4 text- font-medium text-gray-400">
                  {transaction._id.slice(-6)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-200">
                  <div className="font-medium">{transaction.orderItems[0]?.name}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  ${transaction.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">
                  ${transaction.discount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {transaction.orderItems[0]?.quantity}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    transaction.status === 'Shipped' ? 'bg-green-500 text-white' : 
                    transaction.status === 'Processing' ? 'bg-yellow-500 text-black' : 
                    'bg-red-500 text-white'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(transaction.createdAt!).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {`${transaction.shippingInfo.address}, ${transaction.shippingInfo.city}, ${transaction.shippingInfo.state}, ${transaction.shippingInfo.country} ${transaction.shippingInfo.pincode}`}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium">
                  <button className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 focus:outline-none">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
