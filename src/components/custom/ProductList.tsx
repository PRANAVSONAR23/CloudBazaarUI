import React, { useState } from "react";
import Pagination from "./Pagination";

const ProductList: React.FC<{ searchQuery: string; filters: any }> = ({
  searchQuery,
  filters,
}) => {
  const allProducts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 1000),
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter Products
  const filteredProducts = allProducts
    .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) =>     
      filters.sortBy === "low-to-high" ? a.price - b.price : b.price - a.price
    )
    .filter((product) => product.price <= filters.priceRange[1]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <ul className="grid grid-cols-2 gap-4">
        {paginatedProducts.map((product) => (
          <li
            key={product.id}
            className="border p-4 rounded shadow hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-500">Price: ${product.price}</p>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;
