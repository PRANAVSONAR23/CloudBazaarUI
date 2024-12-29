import CartItemCard from "@/components/custom/CartItem"
import { addToCart, calculatePrice, removeCartItem } from "@/redux/reducer/cartReducer"
import { CartReducerInitialState } from "@/types/reducer-types"
import { CartItem } from "@/types/types"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const Cart = () => {

    const {cartItems,subTotal,tax,total,shippingCharges,discount}=useSelector((state:{cartReducer:CartReducerInitialState})=>state.cartReducer);

    const [couponCode, setCouponCode] = useState<string>('')
   const [isValidCode, setIsValidCode] = useState<boolean>(false)

   const dispatch=useDispatch()

     const incrementHandler = (cartItem:CartItem) => {
        if(cartItem.quantity>=cartItem.stock)return
        dispatch(addToCart({...cartItem,quantity:cartItem.quantity+1}))
     };

     const decrementHandler = (cartItem:CartItem) => {
        if(cartItem.quantity<=1)return
        dispatch(addToCart({...cartItem,quantity:cartItem.quantity-1}))
     };

     const removeHandler = (productId:string) => {
       dispatch(removeCartItem(productId))
     };

     useEffect(()=>{
      dispatch(calculatePrice())
     },[cartItems])
   

  return (
    <div className="w-full flex gap-4 justify-between items-start p-5">
        <div className="w-[70%] bg-red-300 " >
          <div>
            {   
                cartItems.length > 0 ?(
                    cartItems.map((i,index)=>(
                    <CartItemCard key={index} cartItem={i} incrementHandler={incrementHandler} decrementHandler={decrementHandler}  removeHandler={removeHandler}/>
                ))):(
                    <p>No items in the cart</p>
                )
                
            }
          </div>
        </div>

        {/* total price section */}
        <div className="w-[30%] bg-blue-400">
        <div className="p-3">
            <h3>Subtotal:{subTotal}</h3>
            <h4>Shipping charge:{shippingCharges}</h4>
            <h4>Tax:{tax}</h4>
            <h4>Discount:{discount}</h4>
            <h2>Total:{total}</h2>

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