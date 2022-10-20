import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Subject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../types/login';
import { Response } from '../types/response';

@Injectable()
export class AuthService {
  // userValue = new Subject<string | null>();
  // isAuthenticated = new Subject<boolean>();
  role = new BehaviorSubject<string>('');
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
          if (res.data !== null) {
            localStorage.setItem('userValue', res.data);
            // this.isAuthenticated.next(true);
            // this.userValue.next(res.data);
          }
          return res;
        })
      );
  };

  isLoggedIn = () => {
    console.log('isLoggedIn', localStorage.getItem('userValue'));
    return this.getToken() !== null ? true : false;
  };

  getToken = (): string | null => {
    return localStorage.getItem('userValue');
  };

  userLogout = () => {
    // this.userValue.next(null);
    // this.isAuthenticated.next(false);
    localStorage.removeItem('userValue');
    this.router.navigate(['/login']);
  };
}
