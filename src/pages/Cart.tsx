import CartItemCard from "@/components/custom/CartItem"
import { addToCart, calculatePrice, discountApplied, removeCartItem, } from "@/redux/reducer/cartReducer"
import { server } from "@/redux/store"
import { CartReducerInitialState } from "@/types/reducer-types"
import { CartItem } from "@/types/types"
import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

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

     useEffect(() => {
        const { token: cancelToken, cancel } = axios.CancelToken.source();

        const timeOutID = setTimeout(() => {
          axios
            .get(`${server}/api/v1/payment/apply/discount?coupon=${couponCode}`, {
              cancelToken,
            })
            .then((res) => {
              dispatch(discountApplied(res.data.discount));
            //   dispatch(saveCoupon(couponCode));
              setIsValidCode(true);
              dispatch(calculatePrice());
            })
            .catch(() => {
              dispatch(discountApplied(0));
              setIsValidCode(false);
              dispatch(calculatePrice());
            });
        }, 1000);
    
        return () => {
          clearTimeout(timeOutID);
          cancel();
          setIsValidCode(false);
        };
      }, [couponCode]);
   

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
        <p>Subtotal: ₹{subTotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon icon
            </span>
          ))}

        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}

        </div>
        </div>

    </div>
  )
}

export default Cart