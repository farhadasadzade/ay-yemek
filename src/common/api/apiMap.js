import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiMap = createApi({
  reducerPath: "apiMap",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.geoapify.com/v1/geocode`,
  }),
  endpoints: (builder) => ({
    register: builder.query({
      query: (searchKey) =>
        `/autocomplete?text=${searchKey}&apiKey=${process.env.REACT_APP_GEOPIFY_API_KEY}`,
    }),
  }),
});

export const { useLazyRegisterQuery } = apiMap;
