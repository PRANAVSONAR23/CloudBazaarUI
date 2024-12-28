import React, { useState } from "react";
import FilterSection from "../components/custom/FilterSection";
import { useSearchProductsQuery } from "@/redux/api/productAPI";
import ProductCard from "@/components/custom/ProductCard";
import Pagination from "@/components/custom/Pagination";
import Loader from "@/components/custom/Loader";

const Search: React.FC = () => {
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

  const view = () => {};

  const { data ,isLoading,isError} = useSearchProductsQuery({
    search: searchQuery,
    price: filters.priceRange[1],
    sort: filters.sortBy,
    page: currentPage,
    ...(filters.category !== "all" ? { category: filters.category } : {}),
  });

 if(isError){
    return <h1>Something went wrong</h1>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto grid grid-cols-4 gap-4">
        {/* Left Sidebar - Filter Section */}
        <div className="col-span-1 bg-white p-4 shadow rounded">
          <FilterSection
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* Main Content - Product List */}
        {
          isLoading?<Loader/>:
        <div className="col-span-3 bg-white p-4 shadow rounded">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search product by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4">
              {data?.products.map((p) => (
                <ProductCard
                  key={p._id}
                  productId={p._id}
                  name={p.name}
                  price={p.price}
                  photo={p.photo}
                  stock={p.stock}
                  handler={view}
                />
              ))}
            </div>
          </div>
          {data && data?.totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              onPageChange={setCurrentPage}
              totalPages={data?.totalPages ? data.totalPages : 1}
            />
          )}
        </div>
}
      </div>
    </div>
  );
};

export default Search;
