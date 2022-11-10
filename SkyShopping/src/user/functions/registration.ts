import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { CartService } from "../../core/cart/service/cart.service";
import { MongoDb } from "../../core/common/db";
import { HttpError } from "../../core/common/httpError";
import { responseHandler } from "../../core/common/responseHandler";
import { UserService } from "../../core/user/service/user.service";
import { CreateUserRequestDTO } from "../../core/user/validator/createUserRequest.dto";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Registration");

  const user = JSON.parse(event!.body!) as CreateUserRequestDTO;
  console.log("User Registration", user);

  const db = new MongoDb();

  if (!db.isConnected()) {
    await db.getConnection();
  }

  const userService = new UserService(db);
  const cartService = new CartService(db);
  let response;

  try {
    const newUser = await userService.createUser(user);
    console.log("newUser", newUser);
    if (newUser) {
      await cartService.addBlankCart(newUser._id);
    }
    response = responseHandler(false, {
      statusCode: 200,
      message: "Successfully create new User",
      data: newUser,
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
