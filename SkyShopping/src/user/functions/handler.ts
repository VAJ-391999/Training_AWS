import { APIGatewayEvent, Callback, Context } from "aws-lambda";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("hello");

  callback(null, "Hello");
};
