import { ChangeEvent, FormEvent, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNewProductMutation } from '@/redux/api/productAPI';
import { useSelector } from 'react-redux';
import { UserReducerInitialState } from '@/types/reducer-types';

interface FormData {
  name: string;
  price: string;
  category: string;
  stock: string;
  photo: File | null;
}

const AddProductForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    price: '',
    category: '',
    stock: '',
    photo: null
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer);

  const [newProduct] = useNewProductMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create FormData object
    const productFormData = new FormData();
    productFormData.append('name', formData.name);
    productFormData.append('price', formData.price.toString());
    productFormData.append('category', formData.category);
    productFormData.append('stock', formData.stock.toString());
    if (formData.photo) {
      productFormData.append('photo', formData.photo);
    }

    const res = await newProduct({ id: user?._id!, formData: productFormData });

    console.log(res);
    if (res?.data?.message === 'Product created successfully') {
      alert(res.data.message);
    }

    // Reset form after submission
    setFormData({
      name: '',
      price: '',
      category: '',
      stock: '',
      photo: null
    });
    setPreviewUrl(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen py-6 px-4 w-[80vw]">
      <Card className="w-full max-w-2xl mx-auto bg-gray-900 text-white shadow-lg rounded-xl ">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-blue-500">Add New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-medium text-gray-200">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter product name"
                className="p-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-lg font-medium text-gray-200">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
                
                placeholder="Enter price"
                className="p-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-lg font-medium text-gray-200">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                placeholder="Enter category"
                className="p-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-lg font-medium text-gray-200">Stock</Label>
              <Input
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                placeholder="Enter stock"
                className="p-4 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo" className="text-lg font-medium text-gray-200">Product Photo</Label>
              <Input
                id="photo"
                name="photo"
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 h-12 border-none"
              />
              {previewUrl && (
                <div className="mt-2">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white text-xl rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductForm;
