import { Link } from "react-router-dom";

type CartItemProps = {
  cartItem: {
    productId: string;
    photo: string;
    name: string;
    price: number;
    quantity: number;
  };
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { productId, photo, name, price, quantity } = cartItem;

  return (
    <div className="flex items-center gap-6 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition">
      {/* Product Image */}
      <div className="w-24 h-24 bg-gray-200 rounded overflow-hidden">
        <img
          src={photo}
          alt={`${name} photo`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-grow gap-2">
        <Link
          to={`/product/${productId}`}
          className="text-lg font-semibold text-gray-800 hover:text-blue-500 transition"
        >
          {name}
        </Link>
        <h1 className="text-gray-600">₹{price}</h1>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
        >
          -
        </button>
        <p className="w-6 text-center text-gray-800">{quantity}</p>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 hover:bg-gray-400 text-gray-800 transition"
        >
          +
        </button>
      </div>

      {/* Delete Button */}
      <button
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Delete
      </button>
    </div>
  );
};

export default CartItem;
