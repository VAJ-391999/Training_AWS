import mongoose from "mongoose";
import { MongoDb } from "../../common/db";
import { HttpError } from "../../common/httpError";
import { Product } from "../model/product";
import { ProductRepository } from "../repository/product.repository";
import { CreateProductRequestDTO } from "../validators/createProductRequest.dto";

export class ProductService {
  private readonly productRepository: ProductRepository;
  constructor(db: MongoDb) {
    this.productRepository = new ProductRepository(db.productModel);
  }

  createProduct = async (product: CreateProductRequestDTO) => {
    return await this.productRepository.createProduct(product);
  };

  getProductList = async () => {
    return await this.productRepository.getProductList();
  };

  getProductDetail = async (id: mongoose.Types.ObjectId) => {
    const product: Product = await this.productRepository.getProductDetail(id);

    if (!product) {
      throw new HttpError({
        statusCode: 404,
        message: "Product not found",
        data: null,
      });
    }
    return product;
  };
}
