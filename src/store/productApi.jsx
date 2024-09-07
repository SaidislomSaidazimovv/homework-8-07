import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  tagTypes: ["[products]"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: "/productsApi",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "products" })),
              { type: "products" },
            ]
          : [{ type: "products" }],
    }),
    deleteProducts: builder.mutation({
      query: (productId) => ({
        url: `/productsApi/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "products" }],
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: "/productsApi",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "products" }],
    }),

    updateProduct: builder.mutation({
      query: (updatedProduct) => ({
        url: `/productsApi/${updatedProduct.id}`,
        method: "PUT",
        body: updatedProduct,
      }),
      invalidatesTags: [{ type: "products" }],
    }),
    
  }),
});

export const { useGetAllProductsQuery, useDeleteProductsMutation, useAddProductMutation, useUpdateProductMutation } =
  productsApi;
