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
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Transaction Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Shipping Information</h3>
              <p>{order.shippingInfo.address}</p>
              <p>{order.shippingInfo.city}, {order.shippingInfo.state}</p>
              <p>{order.shippingInfo.country} - {order.shippingInfo.pincode}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <p>Subtotal: ₹{order.subtotal}</p>
              <p>Tax: ₹{order.tax}</p>
              <p>Shipping Charges: ₹{order.shippingCharges}</p>
              <p>Discount: ₹{order.discount}</p>
              <p className="font-semibold">Total: ₹{order.total}</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Status</h3>
            <p className="text-green-600 font-medium">{order.status}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Order Items</h3>
            {order.orderItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 mb-2">
                <img
                  src={`${server}/${item.photo}`}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Order Dates</h3>
              <p>Created: {format(new Date(order.createdAt!), 'PPP')}</p>
              <p>Updated: {format(new Date(order.updatedAt!), 'PPP')}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Order ID</h3>
              <p>{order._id}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleUpdate}>Process Order</Button>
          <Button variant="destructive" onClick={handleDelete}>Delete Order</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default OrderDetailsPage

