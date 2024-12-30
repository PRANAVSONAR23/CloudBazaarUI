import { AllProductResponse, CategoriesResponse, DeleteProductRequest, MessageResponse, NewProductRequest, ProductType, SearchProductRequest, SearchProductResponse, UpdateProductRequest } from "@/types/apiTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product/` }), // Corrected strin
  tagTypes: ["product","allProduct"],
  endpoints: (builder) => ({
    latestProducts: builder.query<AllProductResponse, string>({
      query: () => "latest",
      providesTags: ["product"],
    }),
    allProducts: builder.query<AllProductResponse, string>({
        query: (id) => `admin-products?id=${id}`,
        providesTags: ["product"],
    }),
    categories: builder.query<CategoriesResponse, string>({
        query: () => `categories`,
        providesTags: ["product"],
    }),
    searchProducts: builder.query<SearchProductResponse, SearchProductRequest>({
        query: ({ price, search, sort, category, page }) => {
            let base = `all?search=${search}&page=${page}`;
    
            if (price) base += `&price=${price}`;
            if (sort) base += `&sort=${sort}`;
            if (category) base += `&category=${category}`;
    
            return base;
          },
          providesTags: ["product"],
    }),
    newProduct: builder.mutation<MessageResponse,NewProductRequest>({
        query: ({formData,id}) => ({
          url: `new?id=${id}`,
          method: "POST",
          body: formData,
        }),
        invalidatesTags: ["product"],
      }),
    productDetails: builder.query<ProductType, string>({
        query: (id) =>id,
        providesTags: ["product"],
    }),
    updateProduct: builder.mutation<MessageResponse,UpdateProductRequest>({
      query: ({formData,userId,productId}) => ({
        url: `${productId}?id=${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }), 
    deleteProduct: builder.mutation<MessageResponse,DeleteProductRequest>({
      query: ({userId,productId}) => ({
        url: `${productId}?id=${userId}`,
        method: "DELETE",
       
      }),
      invalidatesTags: ["allProduct"],
    }),  
  }),
});

export const { useLatestProductsQuery ,useAllProductsQuery,useCategoriesQuery,useSearchProductsQuery,useNewProductMutation,useProductDetailsQuery,useUpdateProductMutation,useDeleteProductMutation} = productAPI;
