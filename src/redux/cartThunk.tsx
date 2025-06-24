// redux/cartThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "../types/cartTypes";

// Fetch all cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const response = await axios.get("/api/cart");
    return response.data as CartItem[];
  }
);

// Add item to cart
export const addToCartAPI = createAsyncThunk(
  "cart/addToCart",
  async (item: CartItem) => {
    const response = await axios.post("/api/cart", item);
    return response.data as CartItem;
  }
);

// Remove item from cart
export const removeFromCartAPI = createAsyncThunk(
  "cart/removeFromCart",
  async (id: string) => {
    await axios.delete(`/api/cart/${id}`);
    return id;
  }
);

// Increase quantity
export const increaseCartQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (id: string) => {
    const response = await axios.patch(`/api/cart/increase/${id}`);
    return response.data as CartItem;
  }
);

// Decrease quantity
export const decreaseCartQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (id: string) => {
    const response = await axios.patch(`/api/cart/decrease/${id}`);
    return response.data as CartItem;
  }
);
