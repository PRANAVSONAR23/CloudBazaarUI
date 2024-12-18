import React, { useState } from "react";
import FilterSection from "../components/custom/FilterSection";
import ProductList from "../components/custom/ProductList";

const Search: React.FC = () => {
  const [filters, setFilters] = useState({
    sortBy: "low-to-high",
    priceRange: [0, 1000],
    category: "all",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto grid grid-cols-4 gap-4">
        {/* Left Sidebar - Filter Section */}
        <div className="col-span-1 bg-white p-4 shadow rounded">
          <FilterSection filters={filters} onFiltersChange={handleFiltersChange} />
        </div>

        {/* Main Content - Product List */}
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
          <ProductList searchQuery={searchQuery} filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default Search;
