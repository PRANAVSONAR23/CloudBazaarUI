import Loader from "@/components/custom/Loader";
import ProductCard from "@/components/custom/ProductCard";
import { useLatestProductsQuery } from "@/redux/api/productAPI";
import { addToCart } from "@/redux/reducer/cartReducer";
import { CartItem } from "@/types/types";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isError, isLoading } = useLatestProductsQuery("");

const dispatch =useDispatch()

  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock<1) return alert("Out of Stock")
    
    dispatch(addToCart(cartItem)) 
    return undefined
  };

  if (isError) {
    return <h1>Something went wrong</h1>;
  }
  return (
    <div>
      <div className="w-full flex justify-between gap-10 item-center px-40 py-10 ">
        <h1 className="text-2xl font-semibold">Latest Product</h1>
        <Link to={"/search"}>More</Link>
      </div>

      <div className="w-full p-10 flex justify-between items-center flex-wrap gap-4">
        {isLoading ? (
          <Loader />
        ) : (
          data?.products.map((pro) => {
            return (
              <ProductCard
                key={pro._id}
                productId={pro._id}
                name={pro.name}
                price={pro.price}
                photo={pro.photo}
                stock={pro.stock}
                handler={addToCartHandler}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
