import { APIGatewayEvent, Callback, Context } from "aws-lambda";

export const login = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("login");

  callback(null, "login");
};
