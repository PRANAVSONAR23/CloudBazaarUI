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
    <div className="p-6 bg-gradient-to-r from-blue-800 via-blue-950 to-gray-900 min-h-screen">
      
      <div className="overflow-x-auto">
      {data?.orders && <OrderTable transactions={data.orders} />}
      </div>
    </div>
  );
};

export default Orders;
