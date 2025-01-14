import { useProductDetailsQuery } from "@/redux/api/productAPI";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { server } from "@/redux/store";
import { CartItem } from "@/types/types";
import { useToast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/reducer/cartReducer";

const SingleProduct = () => {
  const { id } = useParams();
  const { data, isLoading } = useProductDetailsQuery(id!);

  const {toast} =useToast()
  const dispatch = useDispatch();

const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast({
      variant: "destructive",
      title: "Product Out of Stock",
      description: "This product is out of stock. Please check back later.",
    })

    dispatch(addToCart(cartItem));
    return toast({
      
      title: "Success 🎉",
      description: "Product added to cart successfully",
    });
  };




  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      </div>
    );
  }

  const product = data?.product;
  const inStock = product?.stock! > 0;

  const {_id,photos,name,price,stock} =product!

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Image Section */}
            <div className="md:w-1/2">
              <div className="h-96 relative">
                <img
                  src={photos?.[0].url}
                  alt={product?.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {product?.name}
                </h1>
                <p className="text-blue-400 text-sm uppercase tracking-wide">
                  {product?.category}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-white">
                    ₹{product?.price.toLocaleString()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      inStock
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    }`}
                  >
                    {inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {inStock && (
                  <p className="text-gray-400 text-sm">
                    {product?.stock} units available
                  </p>
                )}
              </div>

              {/* Additional Details */}
              <div className="space-y-4">
                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Product Details
                  </h3>
                  
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 space-x-4">
                <button 
                  className={`px-6 py-3 rounded-lg font-semibold text-white 
                    ${inStock 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "bg-gray-600 cursor-not-allowed"
                    }`}
                  disabled={!inStock}
                  onClick={() => addToCartHandler({ productId: _id, photos, name, price, stock, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button className="px-6 py-3 rounded-lg font-semibold text-white border border-blue-600 hover:bg-blue-600/10">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;