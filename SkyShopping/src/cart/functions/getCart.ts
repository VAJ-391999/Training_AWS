import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { CartService } from "../../core/cart/service/cart.service";
import { GetCartRequestDTO } from "../../core/cart/validators/getCartRequest.dto";
import { MongoDb } from "../../core/common/db";
import { HttpError } from "../../core/common/httpError";
import { responseHandler } from "../../core/common/responseHandler";
import { validateObjectId } from "../../core/common/validateObjectId";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Get Cart detail");

  const db = new MongoDb();

  const addToCartReq = JSON.parse(event!.body!) as GetCartRequestDTO;
  let response;
  try {
    const userId = validateObjectId(addToCartReq.userId);

    if (!db.isConnected()) {
      await db.getConnection();
    }

    const cartService: CartService = new CartService(db);

    const createdCart = await cartService.getCartDetail(userId);

    response = responseHandler(false, {
      statusCode: 200,
      message: "Get cart details",
      data: createdCart,
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
