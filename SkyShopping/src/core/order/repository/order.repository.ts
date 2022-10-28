import { OrderInfo } from "../../type/order/order";

export class OrderRepository {
  orderModel: any;
  constructor(orderModel: any) {
    this.orderModel = orderModel;
  }

  createOrder = (orderDetails: OrderInfo) => {
    return this.orderModel.create(orderDetails);
  };
}
