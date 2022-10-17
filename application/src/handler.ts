import { APIGatewayEvent, Callback, Context } from "aws-lambda";

export const hello = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Hello");

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World!",
    }),
  });
};
