import { Injectable } from '@angular/core';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, take } from 'rxjs';
import { Response } from '../types/response';

@Injectable()
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  createUser = (user: User) => {
    return this.httpClient
      .post<Response<User>>(`${environment.apiBaseUrl}/registration`, user)
      .pipe(
        take(1),
        map((res) => {
          console.log('createUser', res);
          return res;
        })
      );
  };
}
