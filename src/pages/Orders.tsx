import OrderTable from "@/components/custom/OrderTable";
import { useMyOrdersQuery } from "@/redux/api/orderApi";
import { UserReducerInitialState } from "@/types/reducer-types";
import React from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom'; // For navigation, assuming React Router is used.

const Orders: React.FC = () => {
  // const navigate = useNavigate();

  // const handleViewClick = (id: string) => {
  //   navigate(`/order/${id}`); // Redirect to the product page.
  // };

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const {data} =useMyOrdersQuery(user?._id!)

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">MY ORDERS</h1>
      <div className="overflow-x-auto">
      {data?.orders && <OrderTable transactions={data.orders} />}
      </div>
    </div>
  );
};

export default Orders;
