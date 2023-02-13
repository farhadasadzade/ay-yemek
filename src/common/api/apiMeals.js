import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_API_URL } from "shared/constants/url";

export const apiMeals = createApi({
  reducerPath: "apiMeals",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_API_URL}` }),
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "category",
    }),
  }),
});

export const { useGetCategoryQuery, useLazyGetCategoryQuery } = apiMeals;
