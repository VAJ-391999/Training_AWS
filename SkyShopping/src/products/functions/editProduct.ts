import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import { MongoDb } from "../../core/common/db";
import { HttpError } from "../../core/common/httpError";
import { responseHandler } from "../../core/common/responseHandler";
import { validateObjectId } from "../../core/common/validateObjectId";
import { ProductService } from "../../core/products/service/product.service";
import { EditProductRequestDTO } from "../../core/products/validators/editProductRequest.dto";

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log("Edit Product");

  const id: string = event!.pathParameters!.productId || "";
  const editProductRequest = JSON.parse(event!.body!) as EditProductRequestDTO;

  const productId = validateObjectId(id);
  const db = new MongoDb();

  if (!db.isConnected()) {
    await db.getConnection();
  }

  const productService = new ProductService(db);
  let response;
  try {
    const productDetail = await productService.editProduct(
      productId,
      editProductRequest
    );
    response = responseHandler(false, {
      statusCode: 200,
      message: "Edit product details",
      data: productDetail,
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
