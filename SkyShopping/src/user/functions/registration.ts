import { APIGatewayEvent, Callback, Context } from "aws-lambda";

export const registration = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Registration");

  callback(null, "Registration");
};
