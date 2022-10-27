import mongoose from "mongoose";
import { CartItemInfo } from "../../cart/model/cart";

export interface CartInfo {
  user: mongoose.Types.ObjectId;
  items: CartItemInfo[];
  totalPrice: number;
}
