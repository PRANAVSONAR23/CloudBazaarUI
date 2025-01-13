import React, { useState, useEffect } from "react";
import FilterSection from "../components/custom/FilterSection";
import { useSearchProductsQuery } from "@/redux/api/productAPI";
import ProductCard from "@/components/custom/ProductCard";
import Pagination from "@/components/custom/Pagination";
import Loader from "@/components/custom/Loader";
import { useDispatch } from "react-redux";
import { CartItem } from "@/types/types";
import { addToCart } from "@/redux/reducer/cartReducer";
import { useToast } from "@/hooks/use-toast";

const Search: React.FC = () => {
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

  const [filters, setFilters] = useState({
    sortBy: "asc",
    priceRange: [0, 1000],
    category: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const { data, isLoading, isError } = useSearchProductsQuery({
    search: searchQuery,
    price: filters.priceRange[1],
    sort: filters.sortBy,
    page: currentPage,
    ...(filters.category !== "all" ? { category: filters.category } : {}),
  });

  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  // Debounce handler for the search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    // Clear the previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout
    const timeout = setTimeout(() => {
      setSearchQuery(value);
    }, 1000);

    setDebounceTimeout(timeout);
  };

  useEffect(() => {
    // Clean up the timeout on unmount or when query changes
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl text-red-500 font-semibold">Something went wrong</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="container mx-auto grid grid-cols-4 gap-6">
        {/* Left Sidebar - Filter Section */}
        <div className="col-span-1 bg-gray-900 p-5 shadow-lg rounded-lg text-white">
         
          <FilterSection filters={filters} onFiltersChange={handleFiltersChange} />
        </div>

        {/* Main Content - Product List */}
        <div className="col-span-3 bg-gray-900 p-6 shadow-lg rounded-lg text-white">
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search product by name"
              value={searchQuery}
              onChange={handleSearchChange} // Apply debouncing handler
              className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {isLoading ? (
            <Loader className="w-96 h-96" />
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {data?.products.map((p) => (
                  <ProductCard
                    key={p._id}
                    productId={p._id}
                    name={p.name}
                    price={p.price}
                    photos={p.photos}
                    stock={p.stock}
                    handler={addToCartHandler}
                  />
                ))}
              </div>
              {data && data?.totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                  totalPages={data?.totalPages ? data.totalPages : 1}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
