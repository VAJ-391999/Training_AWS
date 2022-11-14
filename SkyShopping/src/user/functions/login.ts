import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { AuthService } from "../../core/auth/auth.service";
import { LoginRequestDTO } from "../../core/auth/validator/loginRequest.dto";
import { MongoDb } from "../../core/common/db";
import { HttpError } from "../../core/common/httpError";
import { responseHandler } from "../../core/common/responseHandler";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Login");

  const loginData: LoginRequestDTO = JSON.parse(
    event!.body!
  ) as LoginRequestDTO;

  const db = new MongoDb();

  if (!db.isConnected()) {
    await db.getConnection();
  }

  const authService = new AuthService(db);
  let response;
  try {
    const token: string = await authService.loginUser(loginData);
    response = responseHandler(false, {
      statusCode: 200,
      message: "Successfully logged in",
      data: token,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      response = responseHandler(true, {
        statusCode: error.statusCode,
        message: error.message,
        data: error.data,
      });
    } else {
      response = responseHandler(true, {
        statusCode: 500,
        message: "InternalServerError",
        data: error,
      });
    }
  }
  console.log("response", response);
  db.closeDbConnection();
  callback(null, response);
};
