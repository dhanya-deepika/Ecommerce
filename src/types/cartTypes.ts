import type { Product } from "./productTypes";
export interface CartItem extends Product {
  quantity: number;
}
