import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "shared/constants/url";

export const apiMeals = createApi({
  reducerPath: "apiMeals",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_API_URL}` }),
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
  }),
});

export const {
  useGetCategoryQuery,
  useLazyGetCategoryQuery,
  useGetMealsMutation,
  useGetMealTypesQuery,
  useLazyGetMealTypesQuery,
} = apiMeals;
