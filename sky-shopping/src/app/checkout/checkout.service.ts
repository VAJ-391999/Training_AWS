import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateOrder, Order } from '../shared/types/order';
import { Response } from '../shared/types/response';

@Injectable()
export class CheckoutService {
  constructor(private readonly httpClient: HttpClient) {}

  placeOrder = (orderDetail: CreateOrder) => {
    return this.httpClient
      .post<Response<Order>>(
        `${environment.apiBaseUrl}/order/create`,
        orderDetail
      )
      .pipe(
        take(1),
        map((res) => res)
      );
  };
}
