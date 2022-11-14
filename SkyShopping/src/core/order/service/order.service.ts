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
import { ProductService } from "../../products/service/product.service";

export class OrderService {
  private readonly orderRepository: OrderRepository;
  private readonly productService: ProductService;
  constructor(db: MongoDb) {
    this.orderRepository = new OrderRepository(db.orderModel);
    this.productService = new ProductService(db);
  }

  createOrder = async (newOrderDetails: CreateOrderRequestDTO) => {
    try {
      const orderItems = await Promise.all(
        newOrderDetails.orderItems.map(async (item) => {
          return {
            ...item,
            product: await this.productService.getProductDetail(
              validateObjectId(item.product)
            ),
          };
        })
      );

      console.log("orderItems", orderItems);

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
    console.log("Order", foundOrder);
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
