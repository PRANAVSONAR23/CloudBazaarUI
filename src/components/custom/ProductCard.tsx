import { CartItem } from "@/types/types";
import { motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { ShoppingCart, Eye } from 'lucide-react';
import { useNavigate } from "react-router-dom";

type ProductsProp = {
  productId: string;
  photos: {
    url:string,
    public_id:string
  }[];
  name: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined | void |ReactElement |any
};

const   ProductCard = ({
  productId,
  photos,
  name,
  price,
  stock,
  handler,
}: ProductsProp) => {
  const [isHovered, setIsHovered] = useState(false);

const navigate=useNavigate()
  const handleNavigate = () => {
    navigate(`/product/${productId}`);
  };

  return (
    <motion.div
      className="w-64 bg-gray-800 dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      
    >
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden" onClick={handleNavigate}>
        <motion.img
          src={photos?.[0]?.url}
          alt={`Image of ${name}`}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick View Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Eye size={18} />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h1 className="text-lg font-bold text-white truncate mb-1">{name}</h1>
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-extrabold text-white">
          ${price.toLocaleString()}
          </p>
          <div>
            {stock > 0 ? (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handler({ productId, price, stock, name, photos:photos, quantity: 1 })}
          disabled={stock === 0}
          className={`w-full py-2 rounded-xl text-white font-semibold text-sm transition-all duration-300 ease-in-out flex items-center justify-center space-x-1 ${
            stock > 0
              ? "bg-blue-900 hover:from-blue-900 hover:to-gray-900"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <ShoppingCart size={16} />
          <span>{stock > 0 ? "Add to Cart" : "Out of Stock"}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

