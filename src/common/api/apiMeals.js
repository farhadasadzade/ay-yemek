import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiMeals = createApi({
  reducerPath: "apiMeals",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}`,
  }),
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "category",
    }),
    getMeals: builder.mutation({
      query: (body) => {
        return {
          url: "/meals",
          method: "POST",
          body,
        };
      },
    }),
    getMealTypes: builder.query({
      query: () => "getMealTypes",
    }),
    getPackagesByCategory: builder.mutation({
      query: (body) => {
        return {
          url: "/getPackagesByCategory",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useLazyGetCategoryQuery,
  useGetMealsMutation,
  useGetMealTypesQuery,
  useLazyGetMealTypesQuery,
} = apiMeals;
