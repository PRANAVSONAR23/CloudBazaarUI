import Loader from "@/components/custom/Loader";
import ProductCard from "@/components/custom/ProductCard";
import { useLatestProductsQuery } from "@/redux/api/productAPI";
import { Link } from "react-router-dom";

const Home = () => {
  const { data, isError, isLoading } = useLatestProductsQuery("");

  const addToCartHandler = () => {};

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
