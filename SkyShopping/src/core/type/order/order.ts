import mongoose from "mongoose";
import { OrderAddress, OrderItem } from "../../order/model/order.model";
import { PaymentMethod } from "./payment";

export interface OrderInfo {
  user: mongoose.Types.ObjectId;

  orderItems: OrderItem[];

  orderPrice: number;

  address: OrderAddress;

  paymentMethod: PaymentMethod;

  fullName: string;

  stripeToken?: Record<string, any>;
}
