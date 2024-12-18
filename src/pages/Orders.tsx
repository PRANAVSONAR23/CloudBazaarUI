import React from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation, assuming React Router is used.

interface Order {
  id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const orders: Order[] = [
  { id: '234234234jkbjhsmdgfbhj234', quantity: 23, discount: 5666, amount: 45454, status: 'Processing' },
  { id: '123456789abcdefgh12345', quantity: 12, discount: 1000, amount: 12000, status: 'Completed' },
  { id: '789123456mnbvcxz98765', quantity: 10, discount: 800, amount: 10800, status: 'Pending' },
];

const Orders: React.FC = () => {
  const navigate = useNavigate();

  const handleViewClick = (id: string) => {
    navigate(`/order/${id}`); // Redirect to the product page.
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">MY ORDERS</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Quantity</th>
              <th className="py-3 px-6 text-left">Discount</th>
              <th className="py-3 px-6 text-left">Amount</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">{order.id}</td>
                <td className="py-3 px-6">{order.quantity}</td>
                <td className="py-3 px-6">{order.discount}</td>
                <td className="py-3 px-6">{order.amount}</td>
                <td
                  className={`py-3 px-6 font-medium ${
                    order.status === 'Processing'
                      ? 'text-red-500'
                      : order.status === 'Completed'
                      ? 'text-green-500'
                      : 'text-yellow-500'
                  }`}
                >
                  {order.status}
                </td>
                <td className="py-3 px-6">
                  <button
                    onClick={() => handleViewClick(order.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
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

export default Orders;
