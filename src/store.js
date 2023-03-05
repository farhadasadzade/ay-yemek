import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiAuth } from "common/api/apiAuth";
import { apiMeals } from "common/api/apiMeals";
import { apiMap } from "common/api/apiMap";
import { api } from "common/api/api";
import categoryReducer from "redux/categories";

export const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiMeals.reducerPath]: apiMeals.reducer,
    [apiMap.reducerPath]: apiMap.reducer,
    [api.reducerPath]: api.reducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      apiAuth.middleware,
      apiMeals.middleware,
      apiMap.middleware,
      api.middleware,
    ]),
});

setupListeners(store.dispatch);
