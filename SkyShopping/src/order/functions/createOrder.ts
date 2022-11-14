import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { CartService } from "../../core/cart/service/cart.service";
import { MongoDb } from "../../core/common/db";
import { HttpError } from "../../core/common/httpError";
import { responseHandler } from "../../core/common/responseHandler";
import { validateObjectId } from "../../core/common/validateObjectId";
import { OrderService } from "../../core/order/service/order.service";
import { CreateOrderRequestDTO } from "../../core/order/validators/createOrderRequest.dto";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Create Order", event.body);

  const db = new MongoDb();

  const createOrderReq = JSON.parse(event!.body!) as CreateOrderRequestDTO;

  if (!db.isConnected()) {
    await db.getConnection();
  }

  const orderService = new OrderService(db);
  const cartService = new CartService(db);
  let response;
  try {
    const userId = validateObjectId(createOrderReq.user);
    const newOrder = await orderService.createOrder(createOrderReq);

    if (newOrder) {
      await cartService.removeCart(userId);
    }
    response = responseHandler(false, {
      statusCode: 200,
      message: "Successfully create new order",
      data: newOrder,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      response = responseHandler(true, error);
    } else {
      response = responseHandler(true, {
        statusCode: 500,
        message: "InternalServerError",
        data: error,
      });
    }
  }

  db.closeDbConnection();
  callback(null, response);
};
