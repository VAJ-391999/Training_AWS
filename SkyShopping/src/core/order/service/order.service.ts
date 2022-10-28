import { MongoDb } from "../../common/db";
import { validateObjectId } from "../../common/validateObjectId";
import { OrderInfo } from "../../type/order/order";

import { OrderRepository } from "../repository/order.repository";
import { CreateOrderRequestDTO } from "../validators/createOrderRequest.dto";

export class OrderService {
  private readonly orderRepository: OrderRepository;
  constructor(db: MongoDb) {
    this.orderRepository = new OrderRepository(db.orderModel);
  }

  createOrder = (newOrderDetails: CreateOrderRequestDTO) => {
    const orderItems = newOrderDetails.orderItems.map((item) => {
      return {
        ...item,
        product: validateObjectId(item.product),
      };
    });

    const orderInfo: OrderInfo = {
      user: validateObjectId(newOrderDetails.user),
      orderItems: orderItems,
      orderPrice: newOrderDetails.orderPrice,
      address: {
        addressLine1: newOrderDetails.addressLine1,
        addressLine2: newOrderDetails.addressLine2,
        city: newOrderDetails.city,
        district: newOrderDetails.district,
        state: newOrderDetails.state,
        country: newOrderDetails.country,
        postalCode: newOrderDetails.postalCode,
      },
      paymentMethod: newOrderDetails.paymentMethod,
    };

    return this.orderRepository.createOrder(orderInfo);
  };
}
