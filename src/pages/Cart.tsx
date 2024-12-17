import CartItem from "@/components/custom/CartItem"
import { useState } from "react"

const Cart = () => {
    const [couponCode, setCouponCode] = useState<string>('')
   const [isValidCode, setIsValidCode] = useState<boolean>(false)

   const CartItems = [
    {
        productId: "asdasd",
        photo: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        name: "MacBook",
        price: 6000,
        quantity: 1,
        stock: 10
    }
   ]

  return (
    <div className="w-full flex gap-4 justify-between items-start p-5">
        <div className="w-[70%] bg-red-300 " >
          <div>
            {   
                CartItems.length > 0 ?(
                    CartItems.map((i,index)=>(
                    <CartItem key={index} cartItem={i}/>
                ))):(
                    <p>No items in the cart</p>
                )
                
            }
          </div>
        </div>

        {/* total price section */}
        <div className="w-[30%] bg-blue-400">
        <div className="p-3">
            <h3>Subtotal:</h3>
            <h4>Shipping charge:</h4>
            <h4>Tax:</h4>
            <h4>Discount: -400</h4>
            <h2>Total:</h2>

            <input type="text" placeholder="Enter coupon code" value={couponCode} onChange={(e)=>setCouponCode(e.target.value)} />
            <button onClick={()=>setIsValidCode(true)}>Apply</button>
            {
                couponCode && (isValidCode ? <span>Redeem coupon code</span> : <span>Invalid coupon code</span>)
            }

        </div>
        </div>

    </div>
  )
}

export default Cart