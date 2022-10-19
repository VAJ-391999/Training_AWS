import { APIGatewayEvent, Callback, Context } from "aws-lambda";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("GetProducts", event.headers.Authorization);

  callback(null, "GetProducts");
};
