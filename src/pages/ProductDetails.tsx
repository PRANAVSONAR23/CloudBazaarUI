interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  photos: {
    url:string,
    public_id:string
  }[];
}

interface ProductUpdate {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  photos:File[] | {
    url:string,
    public_id:string
  }[];
}

import Loader from "@/components/custom/Loader";
import { useToast } from "@/hooks/use-toast";
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "@/redux/api/productAPI";
import { UserReducerInitialState } from "@/types/reducer-types";
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useProductDetailsQuery(id!);

  const [updateProduct]=useUpdateProductMutation()
  const [deleteProduct]=useDeleteProductMutation()

  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const navigate=useNavigate()

  // Initialize states with empty values
  const [displayProduct, setDisplayProduct] = useState<Product>({
    id: "",
    name: "",
    price: 0,
    category: "",
    stock: 0,
    photos: [],
  });

  const [formData, setFormData] = useState<ProductUpdate>({
    id: "",
    name: "",
    price: 0,
    category: "",
    stock: 0,
    photos: [],
  });

 
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { toast } = useToast()

  // Update states when data is available
  useEffect(() => {
    if (data?.product) {
      const productData: Product = {
        id: data.product._id,
        name: data.product.name,
        price: data.product.price,
        category: data.product.category,
        stock: data.product.stock,
        photos: data.product.photos,
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
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        photos: [...files]
      }));

      // Create preview URLs for all files
      const urls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...urls]);
    }
  };
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitFormData = new FormData();

    submitFormData.append('name', formData.name);
    submitFormData.append('price', formData.price.toString());
    submitFormData.append('category', formData.category);
    submitFormData.append('stock', formData.stock.toString());
    
    // Append all photos
    formData.photos.forEach((photo, index) => {
      if (photo instanceof File) {
        // Append File object directly
        submitFormData.append(`photos`, photo);
      } else if (typeof photo === 'object' && 'url' in photo) {
        // Append the `url` from the object
        submitFormData.append(`photos`, photo.url);
      }
    });
   
    const res=await updateProduct({formData:submitFormData,userId:user?._id!,productId:data?.product._id!})
    console.log(res)    
    if(res.data?.message==='Product updated successfully'){
        toast({
            title: "Success 🎉",
            description: "Product updated successfully",
        })
    }
  };

  const handleDelete = async () => {
   const res=await deleteProduct({userId:user?._id!, productId:data?.product._id!})
   if(res.data?.message==='Product deleted successfully'){
    toast({
        title: "Success 🎉",
        description: "Product deleted successfully",
    })
    navigate(-1)
   }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className='w-screen h-screen'/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8 ">
    <div className="max-w-7xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden border">
      <div className="grid grid-cols-1 md:grid-cols-2  p-1">
        
        {/* Product Display Section */}
        <div className="p-6 bg-gray-900 text-white rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Product Details</h2>
          <div className="space-y-6">
            <img
              src={displayProduct.photos?.[0]?.url}
              alt={displayProduct.name}
              className="w-full max-w-md rounded-lg mb-4"
            />
            <div>
              <span className="font-semibold text-lg">Name:</span> {displayProduct.name}
            </div>
            <div>
              <span className="font-semibold text-lg">Price:</span> ${displayProduct.price}
            </div>
            <div>
              <span className="font-semibold text-lg">Category:</span> {displayProduct.category}
            </div>
            <div>
              <span className="font-semibold text-lg">Stock:</span> {displayProduct.stock} units
            </div>
          </div>
        </div>
  
        {/* Update Form Section */}
        <div className="p-6 bg-gray-900 text-white rounded-lg">
          <h2 className="text-3xl font-bold mb-6">Update Product</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <input
              type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
               
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Photo</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
              
            </div>
  
            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
              >
                Update Product
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 transition duration-200"
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
