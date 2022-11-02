import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { MongoDb } from "../../core/common/db";
import { HttpError } from "../../core/common/httpError";
import { responseHandler } from "../../core/common/responseHandler";
import { validateObjectId } from "../../core/common/validateObjectId";
import { OrderService } from "../../core/order/service/order.service";
import { ListOrderRequestDTO } from "../../core/order/validators/listOrderRequest.dto";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("List Order");
  const db = new MongoDb();

  const listOrderReq = JSON.parse(event!.body!) as ListOrderRequestDTO;
  let response;
  try {
    const userId = validateObjectId(listOrderReq.userId);

    if (!db.isConnected()) {
      await db.getConnection();
    }

    const orderService: OrderService = new OrderService(db);

    const listOrder = await orderService.listOrder(userId);

    response = responseHandler(false, {
      statusCode: 200,
      message: "List Order",
      data: listOrder,
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
