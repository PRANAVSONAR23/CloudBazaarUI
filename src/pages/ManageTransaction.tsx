import OrderDetailsPage from "@/components/custom/ManageOrderCard"
import { useOrderDetailsQuery } from "@/redux/api/orderApi"
import { useParams } from "react-router-dom"

const ManageTransaction = () => {


    const {id}=useParams()

    const {data}=useOrderDetailsQuery(id!)


  return (
    <OrderDetailsPage  order={data?.order || null}/>
  )
}

export default ManageTransaction