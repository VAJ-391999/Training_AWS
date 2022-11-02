import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { MongoDb } from "../../core/common/db";
import { HttpError } from "../../core/common/httpError";
import { responseHandler } from "../../core/common/responseHandler";
import { validateObjectId } from "../../core/common/validateObjectId";
import { OrderService } from "../../core/order/service/order.service";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Get order detail");

  const id: string = event!.pathParameters!.orderId || "";

  const orderId = validateObjectId(id);
  const db = new MongoDb();

  if (!db.isConnected()) {
    await db.getConnection();
  }

  const orderService = new OrderService(db);
  let response;
  try {
    const orderDetail = await orderService.getOrderDetail(orderId);
    response = responseHandler(false, {
      statusCode: 200,
      message: "Get order details",
      data: orderDetail,
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

  callback(null, response);
};
