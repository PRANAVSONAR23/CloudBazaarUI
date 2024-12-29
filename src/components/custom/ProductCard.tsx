import { server } from "@/redux/store";
import { CartItem } from "@/types/types";

type ProductsProp = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: (cartItem:CartItem) => string|undefined|void;
  };
  
  const ProductCard = ({
    productId,
    photo,
    name,
    price,
    stock,
    handler,
  }: ProductsProp) => {
    return (
      <div className="w-64 h-auto bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
        {/* Product Image */}
        <div className="w-full h-64 bg-slate-200 rounded-lg overflow-hidden">
          <img
            src={`${server}/${photo}`}
            alt={`Image of ${name}`}
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Product Info */}
        <div className="mt-4">
          <h1 className="text-lg font-semibold text-gray-800 truncate">{name}</h1>
          <p className="text-gray-600 mt-2">
            <span className="text-gray-800 font-bold">Price:</span> ₹{price}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {stock > 0 ? (
              <span className="text-green-600 font-semibold">In Stock</span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </p>
        </div>
  
        {/* Add to Cart Button */}
        <button
          onClick={()=>handler({productId,price,stock,name,photo,quantity:1})}
          disabled={stock === 0}
          className={`mt-4 w-full py-2 rounded-lg text-white ${
            stock > 0
              ? "bg-blue-600 hover:bg-blue-500 transition"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Add to Cart
        </button>
      </div>
    );
  };
  
  export default ProductCard;
  