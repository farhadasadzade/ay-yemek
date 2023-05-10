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
    getMealTypes: builder.query({
      query: ({ categoryId, language, userToken }) => ({
        url: `meal-types/category/${categoryId}`,
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    getPackages: builder.query({
      query: ({ language, categoryId, userToken }) => ({
        url: `packages/category/${categoryId}`,
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    getPackageById: builder.query({
      query: ({ language, packageId, userToken }) => ({
        url: `package/${packageId}`,
        headers: {
          "Content-Language": language,
          Authorization: userToken,
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
    orderPackage: builder.mutation({
      query: ({ language, userToken, body }) => {
        return {
          url: "/package-order",
          method: "POST",
          headers: {
            "Content-Language": language,
            Authorization: userToken,
          },
          body,
        };
      },
    }),
    getUserData: builder.query({
      query: ({ language, userToken }) => ({
        url: "user",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    dailyOrder: builder.mutation({
      query: ({ language, userToken, body }) => {
        return {
          url: "/daily-order",
          method: "POST",
          headers: {
            "Content-Language": language,
            Authorization: userToken,
          },
          body,
        };
      },
    }),
    changePassoword: builder.mutation({
      query: ({ language, userToken, body }) => {
        return {
          url: "/change-password",
          method: "POST",
          headers: {
            "Content-Language": language,
            Authorization: userToken,
          },
          body,
        };
      },
    }),
    contact: builder.mutation({
      query: ({ language, userToken, body }) => {
        return {
          url: "/contact",
          method: "POST",
          headers: {
            "Content-Language": language,
            Authorization: userToken,
          },
          body,
        };
      },
    }),
    getSettings: builder.query({
      query: ({ language, userToken }) => ({
        url: "settings",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    getTermsAndConditions: builder.query({
      query: ({ language, userToken }) => ({
        url: "terms-conditions",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    getDeliveryTimes: builder.query({
      query: ({ language, userToken }) => ({
        url: "delivery-times",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    getOrderTime: builder.query({
      query: ({ language, userToken }) => ({
        url: "order-time",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    getUserPayments: builder.query({
      query: ({ language, userToken }) => ({
        url: "/user/payments",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    getAreas: builder.query({
      query: ({ language, userToken }) => ({
        url: "/service-areas",
        headers: {
          "Content-Language": language,
          Authorization: userToken,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ language, body }) => {
        return {
          url: "/reset-password",
          method: "POST",
          headers: {
            "Content-Language": language,
          },
          body,
        };
      },
    }),
    resendOtp: builder.mutation({
      query: ({ language, body }) => {
        return {
          url: "/resend",
          method: "POST",
          headers: {
            "Content-Language": language,
          },
          body,
        };
      },
    }),
  }),
});
