import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { MongoDb } from "../../core/common/db";
import { HttpError } from "../../core/common/httpError";
import { responseHandler } from "../../core/common/responseHandler";
import { ProductService } from "../../core/products/service/product.service";
import { CreateProductRequestDTO } from "../../core/products/validators/createProductRequest.dto";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Create Product");

  const db = new MongoDb();

  const createProductReq = JSON.parse(event!.body!) as CreateProductRequestDTO;

  if (!db.isConnected()) {
    await db.getConnection();
  }

  const productService = new ProductService(db);
  let response;
  try {
    const newProduct = await productService.createProduct(createProductReq);
    response = responseHandler(false, {
      statusCode: 200,
      message: "Successfully create new User",
      data: newProduct,
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
