import mongoose from "mongoose";
import { MongoDb } from "../../common/db";
import { HttpError } from "../../common/httpError";
import { Product } from "../model/product";
import { ProductRepository } from "../repository/product.repository";
import { CreateProductRequestDTO } from "../validators/createProductRequest.dto";
import { EditProductRequestDTO } from "../validators/editProductRequest.dto";

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

  getProductDetail = async (id: mongoose.Types.ObjectId): Promise<Product> => {
    let product: Product = await this.productRepository.getProductDetail(id);
    if (!product) {
      throw new HttpError({
        statusCode: 404,
        message: "Product not found",
        data: null,
      });
    }

    return product;
  };

  editProduct = async (
    id: mongoose.Types.ObjectId,
    productDetailsToUpdate: EditProductRequestDTO
  ) => {
    try {
      let product: Product = await this.productRepository.editProduct(
        id,
        productDetailsToUpdate
      );
      if (!product) {
        throw new HttpError({
          statusCode: 404,
          message: "Product not found",
          data: null,
        });
      }
    } catch (error) {
      throw error;
    }
  };

  deleteProduct = async (id: mongoose.Types.ObjectId): Promise<Product> => {
    try {
      let product: Product = await this.productRepository.deleteProduct(id);
      if (!product) {
        throw new HttpError({
          statusCode: 404,
          message: "Product not found",
          data: null,
        });
      }
      return product;
    } catch (error) {
      throw error;
    }
  };
}
