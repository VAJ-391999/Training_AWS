import mongoose from "mongoose";
import { CreateProductRequestDTO } from "../validators/createProductRequest.dto";

export class ProductRepository {
  private productModel: any;

  constructor(productModel: any) {
    this.productModel = productModel;
  }

  getProductList = () => {
    return this.productModel.find({});
  };

  createProduct = (product: CreateProductRequestDTO) => {
    return this.productModel.create(product);
  };

  getProductDetail = (id: mongoose.Types.ObjectId) => {
    return this.productModel.findOne({ _id: id });
  };
}
