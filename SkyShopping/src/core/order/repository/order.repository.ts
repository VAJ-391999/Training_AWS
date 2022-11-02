import mongoose from "mongoose";
import { Product } from "../../products/model/product";
import { OrderInfo } from "../../type/order/order";

export class OrderRepository {
  orderModel: any;
  constructor(orderModel: any) {
    this.orderModel = orderModel;
  }

  createOrder = (orderDetails: OrderInfo) => {
    return this.orderModel.create(orderDetails);
  };

  listOrder = (userId: mongoose.Types.ObjectId) => {
    return this.orderModel.find({ user: userId });
  };

  getOrderDetail = (orderId: mongoose.Types.ObjectId) => {
    return this.orderModel
      .findOne({ _id: orderId })
      .lean()
      .populate({
        path: "orderItems.product",
        model: Product,
      })
      .exec();
  };
}
