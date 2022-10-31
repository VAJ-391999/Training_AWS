import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateProduct, EditProduct, Product } from '../shared/types/product';
import { Response } from '../shared/types/response';

@Injectable()
export class ProductService {
  constructor(private readonly httpClient: HttpClient) {}

  products = new BehaviorSubject<Product[]>([]);

  getProducts = () => {
    return this.httpClient
      .get<Response<Product[]>>(`${environment.apiBaseUrl}/products`)
      .pipe(
        take(1),
        map((res) => {
          console.log('res', res);
          this.products.next(res.data);
          return res;
        })
      );
  };

  createProduct = (product: CreateProduct) => {
    console.log('Create new product');
    return this.httpClient
      .post<Response<Product>>(`${environment.apiBaseUrl}/product/new`, product)
      .pipe(
        take(1),
        map((res) => {
          return res;
        })
      );
  };

  getProductDetail = (id: string) => {
    return this.httpClient
      .get<Response<Product>>(`${environment.apiBaseUrl}/products/${id}`)
      .pipe(
        take(1),
        map((res) => {
          console.log('res', res);
          return res;
        })
      );
  };

  getBulkProducts = (productIds: string[]) => {
    return this.httpClient
      .post<Response<Product[]>>(
        `${environment.apiBaseUrl}/products/bulk`,
        productIds
      )
      .pipe(
        take(1),
        map((res) => res)
      );
  };

  editProduct = (id: string, editProduct: EditProduct) => {
    return this.httpClient
      .patch<Response<Product>>(
        `${environment.apiBaseUrl}/products/${id}`,
        editProduct
      )
      .pipe(
        take(1),
        map((res) => res)
      );
  };

  deleteProduct = (id: string) => {
    return this.httpClient
      .delete<Response<Product>>(`${environment.apiBaseUrl}/products/${id}`)
      .pipe(
        take(1),
        map((res) => res)
      );
  };
}
