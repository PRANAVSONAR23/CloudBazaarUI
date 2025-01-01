import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  transactions: Transaction[] ;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions }) => {

const navigate=useNavigate()

  const handleManage=(id :string)=>{
     navigate(`/admin/transactions/${id}`)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h1 className="text-3xl font-semibold text-white mb-6">All Transactions</h1>
  <div className="overflow-x-auto bg-gray-900 shadow-lg rounded-lg">
    <table className="min-w-full divide-y divide-gray-600">
      <thead className="bg-blue-900">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            Order ID
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            Amount
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            Discount
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            Quantity
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            Status
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            Date
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            Shipping Address
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-900 divide-y divide-gray-700 ">
        {transactions.map((transaction) => (
          <tr key={transaction._id} >
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {transaction._id.slice(-6)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap truncate max-w-28">
              <div className="text-sm font-semibold text-white">
                {transaction.orderItems[0]?.name}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-white">${transaction.total.toFixed(2)}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-white">${transaction.discount.toFixed(2)}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {transaction.orderItems[0]?.quantity}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  transaction.status === "Delivered"
                    ? "bg-green-600 text-white"
                    : transaction.status === "Processing"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-600 text-white"
                }`}
              >
                {transaction.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {new Date(transaction.createdAt!).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 truncate max-w-64" title={`${transaction.shippingInfo.address}, ${transaction.shippingInfo.city}, ${transaction.shippingInfo.state}, ${transaction.shippingInfo.country} ${transaction.shippingInfo.pincode}`}>
  {`${transaction.shippingInfo.address}, ${transaction.shippingInfo.city}, ${transaction.shippingInfo.state}, ${transaction.shippingInfo.country} ${transaction.shippingInfo.pincode}`}
</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                className="text-white hover:text-blue-500 bg-blue-600 rounded-md p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition duration-200"
                onClick={() => handleManage(transaction._id)}
              >
                Manage
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

export default TransactionsTable;

