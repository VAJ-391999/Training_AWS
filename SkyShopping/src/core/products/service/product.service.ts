import { MongoDb } from "../../common/db";
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
}
