import Loader from "@/components/custom/Loader";
import ProductCard from "@/components/custom/ProductCard";
import { useLatestProductsQuery } from "@/redux/api/productAPI";
import { addToCart } from "@/redux/reducer/cartReducer";
import { CartItem } from "@/types/types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast"


const Home = () => {
  const { data, isError, isLoading } = useLatestProductsQuery("");

  const dispatch = useDispatch();

  const { toast } = useToast()

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

  if (isError) {
    return (
      <h1 className="text-center text-red-500 text-2xl font-bold">
        Something went wrong
      </h1>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Header Section */}
      <header className="bg-gray-900 text-white py-6 px-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-wide">
            Discover the Latest Products
          </h1>
          <Link
            to="/search"
            className="bg-blue-500 text-white px-6 py-2 rounded-full text-lg font-medium shadow-md hover:bg-blue-400 transition"
          >
            View More
          </Link>
        </div>
      </header>

      {/* Product Section */}
      <main className="w-full p-8">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center ">
              <Loader className="w-96 h-96"/>
            </div>
          ) : (
            data?.products.map((pro) => (
              <ProductCard
                key={pro._id}
                productId={pro._id}
                name={pro.name}
                price={pro.price}
                photos={pro.photos}
                stock={pro.stock}
                handler={addToCartHandler}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer Section */}
      {/* <footer className="bg-gradient-to-r from-black via-gray-900 to-gray-800 text-gray-300 py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 CoolApp. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default Home;
