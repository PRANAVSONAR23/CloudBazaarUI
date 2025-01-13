import { CartItem } from "@/types/types";
import { Link } from "react-router-dom";
import {Plus,Minus} from 'lucide-react'


type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (id: string) => void;
};

const CartItemCard = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { productId, photos, name, price, quantity } = cartItem;

  return (
    <div className="flex items-center gap-6 p-6 bg-gray-900 text-white rounded-lg shadow-xl">
      {/* Product Image */}
     
      <div className="w-24 h-24 bg-gray-800 rounded-lg overflow-hidden">
        <img
          src={photos?.[0].url}
          alt={`${name} photo`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow gap-2">
        <Link
          to={`/product/${productId}`}
          className="text-lg font-semibold text-blue-500 hover:text-blue-300"
        >
          {name}
        </Link>
        <h1 className="text-xl text-gray-400 font-medium">₹{price}</h1>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-4">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => decrementHandler(cartItem)}
        >
          <Minus/>
        </button>
        <p className="w-8 text-center text-lg font-semibold text-gray-300">{quantity}</p>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => incrementHandler(cartItem)}
        >
        <Plus/>
        </button>
      </div>

      {/* Delete Button */}
      <button
        className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        onClick={() => removeHandler(productId)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItemCard;
