import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../types/login';
import { Response } from '../types/response';
import { User } from '../types/user';

@Injectable()
export class AuthService {
  userValue = new Subject<string | null>();
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  userLogin = (loginDetail: Login) => {
    return this.httpClient
      .post<Response<string>>(`${environment.apiBaseUrl}/login`, loginDetail)
      .pipe(
        take(1),
        map((res) => {
          console.log('Login Response', res);
          // localStorage.setItem('userValue', res.data)
          this.userValue.next(res.data);
          return res;
        })
      );
  };

  userLogout = () => {
    this.userValue.next(null);
    this.router.navigate(['/login']);
  };
}
