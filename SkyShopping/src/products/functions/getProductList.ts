import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { MongoDb } from "../../core/common/db";
import { HttpError } from "../../core/common/httpError";
import { responseHandler } from "../../core/common/responseHandler";
import { ProductService } from "../../core/products/service/product.service";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Get Product List");

  const db = new MongoDb();

  if (!db.isConnected()) {
    await db.getConnection();
  }

  const productService = new ProductService(db);
  let response;
  try {
    const productList = await productService.getProductList();
    response = responseHandler(false, {
      statusCode: 200,
      message: "Get product List",
      data: productList,
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
