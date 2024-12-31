import CartItemCard from "@/components/custom/CartItem";
import {
  addToCart,
  calculatePrice,
  discountApplied,
  removeCartItem,
} from "@/redux/reducer/cartReducer";
import { server } from "@/redux/store";
import { CartReducerInitialState } from "@/types/reducer-types";
import { CartItem } from "@/types/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, subTotal, tax, total, shippingCharges, discount } =
    useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer);

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCode, setIsValidCode] = useState<boolean>(false);

  const dispatch = useDispatch();

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };

  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };

  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  useEffect(() => {
    const { token: cancelToken, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/payment/apply/discount?coupon=${couponCode}`, {
          cancelToken,
        })
        .then((res) => {
          dispatch(discountApplied(res.data.discount));
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
    <div className="w-full flex gap-8 justify-between items-start p-6 bggry-900 min-h-screen">
      {/* Cart Items Section */}
      <div className="w-[70%] bg-gray-800 p-5 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white mb-6">Your Cart</h2>
        {cartItems.length > 0 ? (
          cartItems.map((i, index) => (
            <CartItemCard
              key={index}
              cartItem={i}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            />
          ))
        ) : (
          <p className="text-xl text-gray-300">No items in the cart</p>
        )}
      </div>

      {/* Total Price Section */}
      <div className="w-[30%] bg-gray-900 p-5 rounded-lg shadow-lg text-white">
        <h3 className="text-2xl font-semibold mb-5">Order Summary</h3>
        <p className="text-lg mb-2">Subtotal: ₹{subTotal}</p>
        <p className="text-lg mb-2">Shipping Charges: ₹{shippingCharges}</p>
        <p className="text-lg mb-2">Tax: ₹{tax}</p>
        <p className="text-lg mb-4">
          Discount: <span className="text-red-500">- ₹{discount}</span>
        </p>
        <p className="text-xl font-bold mb-6">
          Total: ₹{total}
        </p>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
          />
          {couponCode &&
            (isValidCode ? (
              <span className="text-green-500">
                ₹{discount} off using <code className="text-white">{couponCode}</code>
              </span>
            ) : (
              <span className="text-red-500">Invalid Coupon</span>
            ))}
        </div>

        {cartItems.length > 0 && (
          <Link
            to="/shipping"
            className="w-full text-center bg-blue-800 py-3 px-3 rounded-lg text-white font-semibold mt-4 hover:bg-purple-700 transition"
          >
            Proceed to Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
