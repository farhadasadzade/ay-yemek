import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_API_URL}`,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", "*");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (language) => ({
        url: "categories",
        headers: {
          "Content-Language": language,
        },
      }),
    }),
    getMeals: builder.query({
      query: (language) => ({
        url: "meals",
        headers: {
          "Content-Language": language,
        },
      }),
    }),
    getMealTypes: builder.query({
      query: (language) => ({
        url: "meal-types",
        headers: {
          "Content-Language": language,
        },
      }),
    }),
    getPackages: builder.query({
      query: ({ language, categoryId }) => ({
        url: `packages/category/${categoryId}`,
        headers: {
          "Content-Language": language,
        },
      }),
    }),
    getFaqs: builder.query({
      query: (language) => ({
        url: "faqs",
        headers: {
          "Content-Language": language,
        },
      }),
    }),
    getReviews: builder.query({
      query: (language) => ({
        url: "reviews",
        headers: {
          "Content-Language": language,
        },
      }),
    }),
  }),
});
