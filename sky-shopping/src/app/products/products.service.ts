import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {
  constructor(private readonly httpClient: HttpClient) {}

  getProducts = () => {
    return this.httpClient.get(`${environment.apiBaseUrl}/products`).pipe(
      take(1),
      map((res) => {
        console.log('res', res);
        return res;
      })
    );
  };
}
