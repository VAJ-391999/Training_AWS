import mongoose from "mongoose";

export interface CartItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

export enum CartAction {
  INCREASE = "increase",
  DECREASE = "decrease",
  REMOVE = "remove",
}
