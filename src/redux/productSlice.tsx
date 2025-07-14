import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Helper: Load from localStorage
const loadFromLocalStorage = () => {
  try {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load products from localStorage", e);
    return [];
  }
};

// Initial State
const initialState = {
  products: loadFromLocalStorage(), // ← load from localStorage
  searchTerm: '',
  filterData: []
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any[]>) => {
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    addProduct: (state, action: PayloadAction<any>) => {
      state.products.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((product: { id: string }) => product.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filterData = state.products.filter((product: { id: string; name: string }) =>
        product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }
  }
});

export const {
  setProducts,
  addProduct,
  deleteProduct,
  setSearchTerm
} = productSlice.actions;

export default productSlice.reducer;
