//  import { createSlice } from "@reduxjs/toolkit";

//  const initialState = {
//     products: [],
//  }

//  const cartSlice = createSlice({
//       name:'cart',
//       initialState,
//      reducers : {
//          setProducts(state, action) {             state.products = action.payload

//       }
//      },
//  })

//  export const { setProducts } = cartSlice.actions;
//  export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image: string;
}

interface CartState {
  products: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.products.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
        state.totalQuantity++;
        state.totalPrice += newItem.price;
      } else {
        state.products.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
        state.totalQuantity++;
        state.totalPrice += newItem.price;
      }
    },

    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.products = action.payload;
    },

    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.products.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.products = state.products.filter((item) => item.id !== id);
      }
    },

    increaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.products.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice += existingItem.price;
        state.totalQuantity++;
        state.totalPrice += existingItem.price;
      }
    },
    
    decreaseQuantity: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const existingItem = state.products.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
          state.totalQuantity--;
          state.totalPrice -= existingItem.price;
        } else {
          // If quantity becomes 1 and user clicks "-", remove the item
          state.products = state.products.filter((item) => item.id !== id);
          state.totalQuantity--;
          state.totalPrice -= existingItem.price;
        }
      }
    },
    
    
  },
});

export const {
  addToCart,
  setCartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
