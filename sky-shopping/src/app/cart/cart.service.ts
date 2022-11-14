import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddToCart, Cart, GetCartResponse } from '../shared/types/cart';
import { Response } from '../shared/types/response';

@Injectable()
export class CartService {
  cart = new BehaviorSubject({});

  constructor(private readonly httpClient: HttpClient) {}

  addToCart = (cartDetail: AddToCart) => {
    console.log('cartDetail', cartDetail);
    return this.httpClient
      .post<Response<Cart>>(`${environment.apiBaseUrl}/cart/add`, cartDetail)
      .pipe(
        take(1),
        map((res) => {
          console.log('cart res', res);
          if (res.data !== null) {
            this.cart.next(res.data);
          }
          return res;
        })
      );
  };

  getCart = (userId: string) => {
    return this.httpClient
      .post<Response<GetCartResponse>>(
        `${environment.apiBaseUrl}/cart/detail`,
        { userId }
      )
      .pipe(
        take(1),
        map((res) => {
          if (res.data !== null) {
            this.cart.next(res.data.cart);
          }
          return res;
        })
      );
  };
}
