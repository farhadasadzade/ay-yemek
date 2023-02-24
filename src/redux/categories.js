import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPackage: {
    categoryId: undefined,
    categoryName: undefined,
    packageId: undefined,
    packageName: undefined,
    price: undefined,
    isPaymentSuccess: false,
    days: 0,
  },
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectPackage: (state, payload) => {
      state.selectedPackage = payload.payload;
    },
  },
});

export const { selectPackage } = categorySlice.actions;

export default categorySlice.reducer;
