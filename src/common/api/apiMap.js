import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiMap = createApi({
  reducerPath: "apiMap",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.geoapify.com/v1/geocode`,
  }),
  endpoints: (builder) => ({
    getAddresses: builder.query({
      query: (searchKey) =>
        `/autocomplete?text=${searchKey}&apiKey=${process.env.REACT_APP_GEOPIFY_API_KEY}`,
    }),
    getAddressByPosition: builder.query({
      query: ({ lat, lng }) =>
        `/reverse?lat=${lat}&lon=${lng}&apiKey=${process.env.REACT_APP_GEOPIFY_API_KEY}`,
    }),
  }),
});

export const { useLazyGetAddressesQuery } = apiMap;
