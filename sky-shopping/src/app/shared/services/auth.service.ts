import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokePayload } from '../types/auth';
import { Login } from '../types/login';
import { Response } from '../types/response';
import { NgRedux } from '@angular-redux/store';
import { AuthActionType, IAuthState } from '../redux/auth.store';

@Injectable()
export class AuthService {
  user = new BehaviorSubject<TokePayload | null>(null);
  isAuthenticated = new BehaviorSubject(false);
  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router,
    private readonly authStore: NgRedux<IAuthState>
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
              this.user.next(tokenPayload);
              this.authStore.dispatch({
                type: AuthActionType.LOGIN_SUCCESS,
                payload: { user: tokenPayload },
              });
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
      this.user.next(null);
      this.authStore.dispatch({ type: AuthActionType.LOGOUT });
      return false;
    } else {
      const tokenPayload: any = jwtDecode(token);
      if (tokenPayload !== null) {
        this.isAuthenticated.next(true);
        this.user.next(tokenPayload);
        this.authStore.dispatch({
          type: AuthActionType.LOGIN_SUCCESS,
          payload: {
            user: tokenPayload,
          },
        });
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
    this.user.next(null);
    this.authStore.dispatch({ type: AuthActionType.LOGOUT });
    localStorage.removeItem('userValue');
    this.router.navigate(['/login']);
  };
}
