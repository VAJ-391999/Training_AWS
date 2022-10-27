import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddToCart, Cart } from '../shared/types/cart';
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
        map((res) => res)
      );
  };

  getCart = (userId: string) => {
    return this.httpClient
      .post<Response<Cart>>(`${environment.apiBaseUrl}/cart/detail`, { userId })
      .pipe(
        take(1),
        map((res) => res)
      );
  };
}
