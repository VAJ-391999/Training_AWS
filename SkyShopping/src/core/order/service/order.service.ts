import { MongoDb } from "../../common/db";
import { validateObjectId } from "../../common/validateObjectId";
import { OrderInfo } from "../../type/order/order";
import { PaymentMethod } from "../../type/order/payment";

import { OrderRepository } from "../repository/order.repository";
import { CreateOrderRequestDTO } from "../validators/createOrderRequest.dto";
import { StripePayment } from "../../common/stripe";

export class OrderService {
  private readonly orderRepository: OrderRepository;
  constructor(db: MongoDb) {
    this.orderRepository = new OrderRepository(db.orderModel);
  }

  createOrder = async (newOrderDetails: CreateOrderRequestDTO) => {
    try {
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
        fullName: newOrderDetails.fullName,
        stripeToken: newOrderDetails.stripeToken,
      };

      let createNewOrder;
      let paymentComplete: boolean = false;
      if (
        newOrderDetails.paymentMethod === PaymentMethod.CREDIT_CARD &&
        newOrderDetails.stripeToken
      ) {
        const stripe = new StripePayment();
        paymentComplete = await stripe.createCharge(
          newOrderDetails.orderPrice,
          newOrderDetails.stripeToken.id
        );
      }

      if (paymentComplete) {
        createNewOrder = this.orderRepository.createOrder(orderInfo);
      }

      return paymentComplete ? createNewOrder : "";
    } catch (error) {
      throw error;
    }
  };
}
