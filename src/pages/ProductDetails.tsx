interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  photo: string;
}

import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "@/redux/api/productAPI";
import { server } from "@/redux/store";
import { UserReducerInitialState } from "@/types/reducer-types";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useProductDetailsQuery(id!);

  const [updateProduct]=useUpdateProductMutation()
  const [deleteProduct]=useDeleteProductMutation()

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  // Initialize states with empty values
  const [displayProduct, setDisplayProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    category: "",
    stock: 0,
    photo: "",
  });

  const [formData, setFormData] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    category: "",
    stock: 0,
    photo: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Update states when data is available
  useEffect(() => {
    if (data?.product) {
      const productData: Product = {
        id: data.product._id,
        name: data.product.name,
        price: data.product.price,
        category: data.product.category,
        stock: data.product.stock,
        photo: data.product.photo,
      };
      setDisplayProduct(productData);
      setFormData(productData);
    }
  }, [data]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const submitFormData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      submitFormData.append(key, value.toString());
    });

    if (selectedFile) {
      submitFormData.append("photo", selectedFile);
    }
   
    const res=await updateProduct({formData:submitFormData,userId:user?._id!,productId:data?.product._id!})
    console.log(res)    
    if(res.data?.message==='Product updated successfully'){
        alert("Product updated successfully")
    }
  };

  const handleDelete = async () => {
   const res=await deleteProduct({userId:user?._id!, productId:data?.product._id!})
   if(res.data?.message==='Product deleted successfully'){
    alert("Product deleted successfully")
   }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Rest of your JSX remains the same */}
          {/* Product Display Section */}
          <div className="p-6 border-r border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Product Details</h2>
            <div className="space-y-4">
              <img
                src={`${server}/${displayProduct.photo}`}
                alt={displayProduct.name}
                className="w-full max-w-md rounded-lg mb-4"
              />
              <div>
                <span className="font-semibold">Name:</span>{" "}
                {displayProduct.name}
              </div>
              <div>
                <span className="font-semibold">Price:</span> $
                {displayProduct.price}
              </div>
              <div>
                <span className="font-semibold">Category:</span>{" "}
                {displayProduct.category}
              </div>
              <div>
                <span className="font-semibold">Stock:</span>{" "}
                {displayProduct.stock} units
              </div>
            </div>
          </div>

          {/* Update Form Section */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Update Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="books">Books</option>
                  <option value="food">Food</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Update Product
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
