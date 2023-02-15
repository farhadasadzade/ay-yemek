import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: {
    name: undefined,
    id: undefined,
  },
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectCategory: (state, payload) => {
      state.selectedCategory = payload.payload;
    },
  },
});

export const { selectCategory } = categorySlice.actions;

export default categorySlice.reducer;
