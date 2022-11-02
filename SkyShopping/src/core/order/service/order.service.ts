import { MongoDb } from "../../common/db";
import { validateObjectId } from "../../common/validateObjectId";
import { OrderInfo } from "../../type/order/order";
import { PaymentMethod } from "../../type/order/payment";

import { OrderRepository } from "../repository/order.repository";
import { CreateOrderRequestDTO } from "../validators/createOrderRequest.dto";
import { StripePayment } from "../../common/stripe";
import mongoose from "mongoose";
import { Order } from "../model/order.model";
import { HttpError } from "../../common/httpError";

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
        newOrderDetails.paymentMethod.toLocaleLowerCase() ===
          PaymentMethod.CREDIT_CARD.toLocaleLowerCase() &&
        newOrderDetails.stripeToken
      ) {
        const stripe = new StripePayment();
        paymentComplete = await stripe.createCharge(
          newOrderDetails.orderPrice,
          newOrderDetails.stripeToken.id
        );
      } else if (
        newOrderDetails.paymentMethod.toLocaleLowerCase() ===
        PaymentMethod.CASH_ON_DELIVERY.toLocaleLowerCase()
      ) {
        paymentComplete = true;
      }
      console.log(paymentComplete);
      if (paymentComplete) {
        createNewOrder = this.orderRepository.createOrder(orderInfo);
      }

      return paymentComplete ? createNewOrder : "";
    } catch (error) {
      throw error;
    }
  };

  listOrder = async (userId: mongoose.Types.ObjectId): Promise<Order[]> => {
    try {
      const orderList: Order[] = await this.orderRepository.listOrder(userId);
      return orderList;
    } catch (err) {
      throw err;
    }
  };

  getOrderDetail = async (orderId: mongoose.Types.ObjectId): Promise<Order> => {
    const foundOrder: Order = await this.orderRepository.getOrderDetail(
      orderId
    );

    if (!foundOrder) {
      throw new HttpError({
        statusCode: 404,
        data: null,
        message: "Order not found",
      });
    }
    return foundOrder;
  };
}
