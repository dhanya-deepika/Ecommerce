// // redux/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';
// import productReducer from './productSlice'

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     products: productReducer, // ✅

//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export default store;



// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";


const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

