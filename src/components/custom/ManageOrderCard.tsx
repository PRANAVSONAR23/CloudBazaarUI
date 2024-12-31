import { FC } from 'react'
import { format } from 'date-fns'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { server } from '@/redux/store'
import { useSelector } from 'react-redux'
import { UserReducerInitialState } from '@/types/reducer-types'
import { useDeleteOrderMutation, useUpdateOrderMutation } from '@/redux/api/orderApi'
import { useNavigate } from 'react-router-dom'

interface OrderItem {
  name: string
  photo: string
  price: number
  quantity: number
  productId: string
  _id: string
}

interface ShippingInfo {
  address: string
  city: string
  state: string
  country: string
  pincode?: number
}

interface Order {
  shippingInfo: ShippingInfo
  _id: string
  subtotal: number
  tax: number
  shippingCharges: number
  discount: number
  total: number
  status: string
  orderItems: OrderItem[]
  createdAt?: string
  updatedAt?: string
}

interface OrderDetailsProps {
  order?: Order | null
}

const OrderDetailsPage: FC<OrderDetailsProps> = ({ order }) => {

const navigate=useNavigate()

    const { user } = useSelector(
        (state: { userReducer: UserReducerInitialState }) => state.userReducer
      );
    
      const [updateOrder]=useUpdateOrderMutation()
      const [deleteOrder]=useDeleteOrderMutation()

  const handleUpdate = () => {
   const res=updateOrder({orderId:order?._id!,userId:user?._id!})
  res.then((data)=>{
    alert(data.data?.message)
  }).catch((err)=>{
    alert(err)  
  })
  }

  const handleDelete = () => {
   const res=deleteOrder({orderId:order?._id!, userId:user?._id!})
   res.then((data)=>{
    alert(data.data?.message)
    navigate(-1)
  }).catch((err)=>{
    alert(err)  
  })
  }

  if (!order) {
    return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="p-6">
            <p className="text-center text-gray-500">No order details available.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className='w-[70vw] p-2'>
    <div className="container mx-auto p-6 bg-gray-800 rounded-md  ">
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-800 to-black text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold">Order ID: {order._id}</h1>
        <p className="mt-2 text-gray-300">Order details and actions below</p>
      </div>
  
      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Shipping Information */}
          <div className="bg-black text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400">Shipping Information</h2>
            <p className="mt-2 text-gray-300">{order.shippingInfo.address}</p>
            <p className="mt-1 text-gray-300">{order.shippingInfo.city}, {order.shippingInfo.state}</p>
            <p className="mt-1 text-gray-300">{order.shippingInfo.country} - {order.shippingInfo.pincode}</p>
          </div>
  
          {/* Status & Dates */}
          <div className="bg-black text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400">Status & Dates</h2>
            <p className="mt-2">
              <span className="text-gray-300">Status: </span>
              <span className={`font-bold ${order.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                {order.status}
              </span>
            </p>
            <p className="mt-2 text-gray-300">Created: {format(new Date(order.createdAt!), 'PPP')}</p>
            <p className="mt-1 text-gray-300">Updated: {format(new Date(order.updatedAt!), 'PPP')}</p>
          </div>
        </div>
  
        {/* Right Column */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-black text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400">Order Summary</h2>
            <ul className="mt-2 space-y-2">
              <li className="text-gray-300">Subtotal: ₹{order.subtotal}</li>
              <li className="text-gray-300">Tax: ₹{order.tax}</li>
              <li className="text-gray-300">Shipping: ₹{order.shippingCharges}</li>
              <li className="text-gray-300">Discount: ₹{order.discount}</li>
              <li className="font-bold text-white">Total: ₹{order.total}</li>
            </ul>
          </div>
  
          {/* Order Items */}
          <div className="bg-black text-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-400">Order Items</h2>
            <div className="mt-4 space-y-4">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <img
                    src={`${server}/${item.photo}`}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg"
                  />
                  <div>
                    <p className="text-white font-semibold">{item.name}</p>
                    <p className="text-gray-300">Quantity: {item.quantity}</p>
                    <p className="text-gray-300">Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  
      {/* Action Buttons */}
      <div className="bg-black text-white p-6 rounded-lg shadow-md flex justify-end space-x-4">
        <Button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleUpdate}>
          Process Order
        </Button>
        <Button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md" onClick={handleDelete}>
          Delete Order
        </Button>
      </div>
    </div>
  </div>
  </div>
  

  )
}

export default OrderDetailsPage

