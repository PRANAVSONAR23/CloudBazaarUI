import AdminProductCard from "@/components/custom/AdminProductCard";
import Loader from "@/components/custom/Loader";
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

  if (isLoading) return <Loader className="w-96 h-96" />;
  if (error) return <p className="text-center text-red-500">Failed to load products.</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 w-[82vw]">
      {/* Add Product Button */}
      <div className="mb-6 flex justify-end">
        <Button
          onClick={() => navigate("/admin/products/add-product")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Product
        </Button>
      </div>

      {/* Page Title */}
      <div className="mb-8 ">
        <h1 className="text-3xl font-semibold text-blue-400">All Products</h1>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.products?.length ? (
          data.products.map((p) => (
            <AdminProductCard
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
          <p className="text-center text-gray-400">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
