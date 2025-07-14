import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Category {
  id: string;
  name: string;
}

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((cat) => cat.id !== action.payload);
    },
  },
});

export const { addCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
