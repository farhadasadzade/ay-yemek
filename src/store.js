import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiAuth } from "common/api/apiAuth";
import { apiMeals } from "common/api/apiMeals";
import categoryReducer from "redux/categories";

export const store = configureStore({
  reducer: {
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiMeals.reducerPath]: apiMeals.reducer,
    category: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiAuth.middleware, apiMeals.middleware]),
});

setupListeners(store.dispatch);
