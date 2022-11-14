import mongoose from "mongoose";
import { ProductDetailToUpdate } from "../../type/product/product-detail-to-update";
import { Product } from "../model/product";
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

  getProductDetail = (id: mongoose.Types.ObjectId): Promise<Product> => {
    return this.productModel.findOne({ _id: id });
  };

  getBulkProducts = (ids: mongoose.Types.ObjectId[]) => {
    return this.productModel.find({ $in: [...ids] });
  };

  editProduct = (
    id: mongoose.Types.ObjectId,
    productDetailsToUpdate: ProductDetailToUpdate
  ) => {
    return this.productModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          ...productDetailsToUpdate,
        },
      },
      { new: true }
    );
  };

  deleteProduct = (id: mongoose.Types.ObjectId) => {
    return this.productModel.findOneAndDelete({ _id: id });
  };
}
