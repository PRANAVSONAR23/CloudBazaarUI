import Loader from "@/components/custom/Loader";
import ProductCard from "@/components/custom/ProductCard";
import { Button } from "@/components/ui/button";
import { useAllProductsQuery } from "@/redux/api/productAPI";
import { UserReducerInitialState } from "@/types/reducer-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { data, error, isLoading } = useAllProductsQuery(user?._id || '');

  const view = (productId: string) => {
    navigate(`/admin/products/${productId}`);
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Failed to load products.</p>;

  return (
    <div>
      <div>
        <Button onClick={() => navigate("/admin/products/add-product")}>
          Add Product
        </Button>
      </div>

      <div>
        <h1>All Products</h1>
        <div>
          {data?.products?.length ? (
            data.products.map((p) => (
              <ProductCard
                key={p._id}
                productId={p._id}
                name={p.name}
                price={p.price}
                photo={p.photo}
                stock={p.stock}
                handler={() => view(p._id)}
              />
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
