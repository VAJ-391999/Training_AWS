import mongoose from "mongoose";
import { OrderAddress } from "../../order/model/order.model";
import { Product } from "../../products/model/product";
import { PaymentMethod } from "./payment";

export interface OrderItemWithDetail {
  product: Product;
  quantity: number;
}

export interface OrderInfo {
  user: mongoose.Types.ObjectId;

  orderItems: OrderItemWithDetail[];

  orderPrice: number;

  address: OrderAddress;

  paymentMethod: PaymentMethod;

  fullName: string;

  stripeToken?: Record<string, any>;
}
