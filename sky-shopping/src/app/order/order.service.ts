import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order } from '../shared/types/order';
import { Response } from '../shared/types/response';

@Injectable()
export class OrderService {
  orderList = new BehaviorSubject<Order[]>([]);
  constructor(private readonly httpClient: HttpClient) {}

  getOrderList = (userId: string) => {
    return this.httpClient
      .post<Response<Order[]>>(`${environment.apiBaseUrl}/order/list`, {
        userId,
      })
      .pipe(
        take(1),
        tap((res) => {
          if (res.data) {
            this.orderList.next(res.data);
          }
        }),
        map((res) => res)
      );
  };

  getOrderDetail = (orderId: string) => {
    return this.httpClient
      .get<Response<Order>>(`${environment.apiBaseUrl}/order/${orderId}`)
      .pipe(
        take(1),
        map((res) => res)
      );
  };
}
