import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthActionType, IAuthState } from '../redux/auth.store';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly authStore: NgRedux<IAuthState>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const expectedRole = route.data['expectedRole'];
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    const tokenPayload: any = jwtDecode(token);

    if (tokenPayload.role !== expectedRole) {
      this.authStore.dispatch({
        type: AuthActionType.LOGIN_SUCCESS,
        payload: {
          user: tokenPayload,
        },
      });
      if (tokenPayload.role === 'admin') {
        this.router.navigate(['/admin']);
        return false;
      } else if (tokenPayload.role === 'user') {
        this.router.navigate(['/user']);
        return false;
      }
    }
    return true;
  }
}
