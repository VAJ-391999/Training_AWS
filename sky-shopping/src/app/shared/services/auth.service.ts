import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, map, Subject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../types/login';
import { Response } from '../types/response';

@Injectable()
export class AuthService {
  role = new BehaviorSubject<string>('');
  isAuthenticated = new BehaviorSubject(false);
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
            const tokenPayload: any = jwtDecode(res.data);
            if (tokenPayload !== null) {
              this.isAuthenticated.next(true);
              this.role.next(tokenPayload.role);
            }
          }
          return res;
        })
      );
  };

  isLoggedIn = () => {
    console.log('isLoggedIn', localStorage.getItem('userValue'));
    const token = this.getToken();
    if (!token) {
      this.isAuthenticated.next(false);
      this.role.next('');
      return false;
    } else {
      const tokenPayload: any = jwtDecode(token);
      if (tokenPayload !== null) {
        this.isAuthenticated.next(true);
        this.role.next(tokenPayload.role);
      }
      return true;
    }
  };

  getToken = (): string | null => {
    return localStorage.getItem('userValue');
  };

  userLogout = () => {
    // this.userValue.next(null);
    this.isAuthenticated.next(false);
    this.role.next('');
    localStorage.removeItem('userValue');
    this.router.navigate(['/login']);
  };
}
