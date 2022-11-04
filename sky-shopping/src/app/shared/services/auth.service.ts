import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../types/login';
import { Response } from '../types/response';
import { NgRedux } from '@angular-redux/store';
import { AuthActionType, IAuthState } from '../redux/auth.store';

@Injectable()
export class AuthService {
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
    const token = this.getToken();
    if (!token) {
      this.authStore.dispatch({ type: AuthActionType.LOGOUT });
      return false;
    } else {
      const tokenPayload: any = jwtDecode(token);
      if (tokenPayload !== null) {
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
    this.router.navigate(['/login']);
    localStorage.removeItem('userValue');
    this.authStore.dispatch({ type: AuthActionType.LOGOUT });
  };
}
