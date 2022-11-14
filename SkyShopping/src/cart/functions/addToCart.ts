import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { CartService } from "../../core/cart/service/cart.service";
import { AddToCartRequestDTO } from "../../core/cart/validators/addToCartRequest.dto";
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

  console.log("Add to cart");

  const db = new MongoDb();

  const addToCartReq = JSON.parse(event!.body!) as AddToCartRequestDTO;
  let response;
  try {
    const userId = validateObjectId(addToCartReq.userId);
    const productId = validateObjectId(addToCartReq.productId);

    if (!db.isConnected()) {
      await db.getConnection();
    }

    console.log(userId, productId);
    const cartService: CartService = new CartService(db);

    const createdCart = await cartService.addToCart(
      userId,
      productId,
      addToCartReq.action
    );
    console.log(createdCart);
    response = responseHandler(false, {
      statusCode: 200,
      message: "Cart Created",
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

  db.closeDbConnection();
  callback(null, response);
};
