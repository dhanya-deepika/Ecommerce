import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    products: [],
    searchTerm: '',
    filterData: []
  };
  
  const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      setProducts: (state: { products: any[] }, action: { payload: any[] }) => {
        state.products = action.payload;
      },
      setSearchTerm: (state: { searchTerm: string; filterData: any[]; products: any[] }, action: { payload: string }) => {
        state.searchTerm = action.payload;
        state.filterData = state.products.filter(product =>
          product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
        );
      }  ,
        // Add this to reducers inside createSlice
deleteProduct: (state, action: { payload: string }) => {
  state.products = state.products.filter((product: { id: string }) => product.id !== action.payload);  localStorage.setItem("products", JSON.stringify(state.products)); // Also update localStorage
},
    }
  });  export const { setProducts, setSearchTerm, deleteProduct } = productSlice.actions;
  export default productSlice.reducer;
  