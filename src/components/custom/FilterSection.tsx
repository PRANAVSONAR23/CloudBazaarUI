import { useCategoriesQuery } from "@/redux/api/productAPI";
import React from "react";

interface FilterProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
}

const FilterSection: React.FC<FilterProps> = ({ filters, onFiltersChange }) => {


const{data,isLoading,isError}=useCategoriesQuery("")
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    onFiltersChange({
      ...filters,
      priceRange: [0, value],
    });
  };

  if(isError){
    return <h1>Something went wrong</h1>
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Sort By */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Sort By</label>
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="asc">Price: Low to High</option>
          <option value="dsc">Price: High to Low</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price Range</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={filters.priceRange[1]}
          onChange={handleRangeChange}
          className="w-full"
        />
        <div className="text-sm text-gray-500">Max: ${filters.priceRange[1]}</div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="all">All</option>
         {
          isLoading===false && data?.categories.map((cat)=>{
            return <option value={cat}>{cat}</option>
          })
         }
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
