import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/admin/products/add-product")}>Add Product</Button>
    </div>
  );
};

export default Products;
