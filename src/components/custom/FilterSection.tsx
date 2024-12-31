import { useCategoriesQuery } from "@/redux/api/productAPI";
import React, { useState, useEffect } from "react";

interface FilterProps {
  filters: any;
  onFiltersChange: (filters: any) => void;
}

const FilterSection: React.FC<FilterProps> = ({ filters, onFiltersChange }) => {
  const { data, isLoading, isError } = useCategoriesQuery("");
  const [tempPriceRange, setTempPriceRange] = useState(filters.priceRange[1]);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setTempPriceRange(value);

    // Clear the previous debounce timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new debounce timeout to apply the filter after 500ms
    const newTimeout = setTimeout(() => {
      onFiltersChange({
        ...filters,
        priceRange: [0, value],
      });
    }, 500);

    setDebounceTimeout(newTimeout);
  };

  useEffect(() => {
    // Clean up timeout on component unmount
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  if (isError) {
    return (
      <div className="text-center text-red-500 font-semibold">
        Something went wrong
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-blue-400">Filters</h2>

      {/* Sort By */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-blue-300 mb-2">Sort By</label>
        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-gray-800 rounded px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Price: Low to High</option>
          <option value="dsc">Price: High to Low</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-blue-300 mb-2">Price Range</label>
        <input
          type="range"
          min="0"
          max="1000"
          value={tempPriceRange}
          onChange={handleRangeChange}
          className="w-full accent-blue-500"
        />
        <div className="text-sm text-gray-400 mt-1">Max: ${tempPriceRange}</div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-blue-300 mb-2">Category</label>
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-gray-800 rounded px-3 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          {!isLoading &&
            data?.categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
