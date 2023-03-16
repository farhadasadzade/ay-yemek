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
      query: ({ language, userToken }) => ({
        url: "categories",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
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
      query: ({ language, userToken }) => ({
        url: "faqs",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    getReviews: builder.query({
      query: ({ language, userToken }) => ({
        url: "reviews",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    register: builder.mutation({
      query: ({ body, language }) => {
        return {
          url: "/register",
          method: "POST",
          headers: {
            "Content-Language": language,
          },
          body,
        };
      },
    }),
    login: builder.mutation({
      query: ({ body, language }) => {
        return {
          url: "/login",
          method: "POST",
          headers: {
            "Content-Language": language,
          },
          body,
        };
      },
    }),
    verify: builder.mutation({
      query: ({ body, language }) => {
        return {
          url: "/verify",
          method: "POST",
          headers: {
            "Content-Language": language,
          },
          body,
        };
      },
    }),
    resend: builder.mutation({
      query: ({ body, language }) => {
        return {
          url: "/verify",
          method: "POST",
          headers: {
            "Content-Language": language,
          },
          body,
        };
      },
    }),
    logout: builder.mutation({
      query: ({ language, userToken }) => {
        return {
          url: "/logout",
          method: "POST",
          headers: {
            "Content-Language": language,
            Authorization: userToken,
          },
        };
      },
    }),
    getFavoriteMeals: builder.query({
      query: ({ language, userToken }) => ({
        url: "meals/favourite",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    getSliders: builder.query({
      query: ({ language, userToken }) => ({
        url: "sliders",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
  }),
});
