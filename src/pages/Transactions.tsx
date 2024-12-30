import React from 'react';
import TransactionsTable from '../components/custom/TransactionTable';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '@/types/reducer-types';
import { useAllOrdersQuery } from '@/redux/api/orderApi';


const AllTransactionsPage: React.FC = () => {

    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
    );


    const {data}=useAllOrdersQuery(user?._id!)

  return (
    <div className=" bg-gray-100">
      {data?.orders && <TransactionsTable transactions={data.orders} />}
    </div>
  );
};

export default AllTransactionsPage;
